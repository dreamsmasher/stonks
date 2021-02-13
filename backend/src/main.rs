#![feature(proc_macro_hygiene, decl_macro, async_closure, try_blocks)]


#[macro_use] extern crate rocket;
mod types;
mod coin_api;
extern crate reqwest;

use coin_api::{CoinClient};
use rocket::{State};
use rocket::http::Status;
use reqwest::{StatusCode, Error};

#[get("/")]
fn index() -> &'static str {
    println!("Request received at /");
    "hello, world"
}

#[catch(400)]
fn internal_error() -> &'static str {
    "The API is broken, sorry :("
}

#[get("/coins")]
async fn coin_handler(coin_client: State<'_, CoinClient>) -> Result<String, Status> {
    let res: Result<String, Error> = try {
        coin_client.get().await?.text().await?
    };
    res.map_err(|_| Status::BadRequest)
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
