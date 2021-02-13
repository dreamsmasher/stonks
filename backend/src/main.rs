#![feature(proc_macro_hygiene, decl_macro, async_closure, try_blocks, try_trait)]


#[macro_use] extern crate rocket;
mod types;
mod coin_api;
extern crate reqwest;

use coin_api::{CoinClient};
use rocket::{State};
use rocket::http::Status;
use reqwest::{StatusCode, Error};
use types::Interval;

#[get("/")]
fn index() -> &'static str {
    println!("Request received at /");
    "hello, world"
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
    let ntv_ = interval.map(|i| i.to_query());
    let ntv = ntv_.as_ref();
    let res: Option<String> = 
        match symbol {
            None => coin_client.get("/listings/latest").await,
            Some(cur) => {
                let argv = ["symbol", "interval", "convert", "count"]
                           .iter()
                           .zip([Some(&cur), ntv, convert.as_ref(), count.as_ref()].iter())
                           .filter(|(_, v)| v.is_some())
                           .map(|(k, v)| (*k, v.unwrap().as_str()))
                           .collect::<Vec<(&str, &str)>>();
                coin_client.get_quotes(argv).await
            }
        };
    res.ok_or(Status::BadRequest)
}

#[rocket::main]
async fn main() {
    let coin_client = CoinClient::new();
    rocket::ignite()
           .manage(coin_client)
           .mount("/", routes![index])
           .mount("/", routes![coin_handler])
           .launch()
           .await;
}
