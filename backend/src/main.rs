#![feature(proc_macro_hygiene, decl_macro, async_closure, try_blocks, try_trait)]


#[macro_use] extern crate rocket;

mod types;
mod coin_api;
mod db;
mod api_observer;
extern crate reqwest;
extern crate serde_json;

use coin_api::{cmc_api_init, coinapi_init, CoinClient};
use rocket::{State};
use rocket::http::Status;
use rocket_contrib::serve::StaticFiles;
// use reqwest::{StatusCode, Error};
use serde_json::{from_str, Value};
use types::{CoinAPIUnits, Interval};

#[get("/")]
fn index() -> &'static str {
    println!("Request received at /");
    ""
}

#[catch(400)]
fn internal_error() -> &'static str {
    "You broke something :("
}

#[get("/historical?<symbol>&<length>&<unit>&<time_start>")]
async fn quotes_handler
    ( symbol     : String // TODO figure out a way to get historical data for more than BTC
    , length     : i32
    , unit       : CoinAPIUnits
    , c_api      : State<'_, Box<CoinClient>> 
    , time_start : String
    ) -> Result<String, Status> {
        let pid: String = format!("{}{}", length, unit);

        let argv: Vec<(&str, &str)> = 
            vec![ ("period_id", &pid)
                , ("time_start", &time_start)
                ];

        let url = "/v1/ohlcv/BTC/USD/history"; // format!("{}/BTC/history", "/v1/ohlcv", symbol);
        println!("{}", url);

        c_api.get(&url, Some(argv)).await.ok_or(Status::BadRequest)
    }

#[get("/coins?<symbol>&<interval>&<convert>&<count>")]
async fn coin_handler 
    ( symbol     : Option<String>
    , interval   : Option<Interval>
    , convert    : Option<String>
    , count      : Option<String>
    , cmc: State<'_, CoinClient>
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
    let resp = cmc.get(endpt, Some(argv)).await.ok_or(e400)?;
    let v: Value = serde_json::from_str(&resp).or(Err(e400))?; 
    v.get("data").map(|ss| ss.to_string()).ok_or(e400)
}

#[rocket::main]
async fn main() {
    let cmc = cmc_api_init();
    let c_api = coinapi_init();
    rocket::ignite()
      .manage(cmc)
      .manage(Box::new(c_api)) // TODO tmp hack, since we can only manage one instance per type
      .register(catchers![internal_error])
      .mount("/", StaticFiles::from("../static"))
      .mount("/", routes![index])
      .mount("/", routes![coin_handler])
      .mount("/", routes![quotes_handler])
      .launch()
      .await;
}
