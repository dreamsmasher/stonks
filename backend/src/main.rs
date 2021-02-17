#![feature(proc_macro_hygiene, decl_macro, async_closure, try_blocks, try_trait)]


#[macro_use] extern crate rocket;

mod types;
mod coin_api;
mod db;
mod api_observer;
extern crate reqwest;
extern crate serde_json;

use coin_api::{CoinClient};
use rocket::{State};
use rocket::http::Status;
use rocket_contrib::serve::StaticFiles;
use reqwest::{StatusCode, Error};
use serde_json::{from_str, Value};
use types::Interval;

#[get("/")]
fn index() -> &'static str {
    println!("Request received at /");
    ""
}

#[catch(400)]
fn internal_error() -> &'static str {
    "You broke something :("
}

#[get("/coins?<symbol>&<interval>&<convert>&<count>")]
async fn coin_handler 
    ( symbol     : Option<String>
    , interval   : Option<Interval>
    , convert    : Option<String>
    , count      : Option<String>
    , coin_client: State<'_, CoinClient>
    ) -> Result<String, Status> {
    let ntv = interval.map(|i| i.to_query());
    let endpt = if symbol.is_some() {"/quotes/latest"} else {"/listings/latest"};
    let params = vec![symbol, ntv, convert, count];
    let argv = ["symbol", "interval", "convert", "count"]
      .iter()
      .zip(params.iter().map(|s| s.as_ref()))
      .filter(|(_, v)| v.is_some())
      .map(|(k, v)| (*k, v.unwrap().as_str()))
      .collect::<Vec<(&str, &str)>>();
        
    let e400 = Status::BadRequest;
    let resp = coin_client.get(endpt, Some(argv)).await.ok_or(e400)?;
    let v: Value = serde_json::from_str(&resp).or(Err(e400))?; 
    v.get("data").map(|ss| ss.to_string()).ok_or(e400)
}

#[rocket::main]
async fn main() {
    let coin_client = CoinClient::new();
    rocket::ignite()
      .manage(coin_client)
      .register(catchers![internal_error])
      .mount("/", StaticFiles::from("../static"))
      .mount("/", routes![index])
      .mount("/", routes![coin_handler])
      .launch()
      .await;
}
