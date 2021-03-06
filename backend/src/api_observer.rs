use crate::{types::*, db::*}; 
use crate::coin_api::CoinClient;
use std::thread;
use mongodb::{Collection, results::InsertManyResult, error::Error, bson::document};
use serde_json;

struct APIObserver {
    conn: Box<Collection>,
    client: Box<CoinClient>
}

// commenting out for now

// impl APIObserver {
//     pub fn new(coll: &Collection) -> Self {
//         Self{conn: Box::new(coll.clone()), client: Box::new(CoinClient::new())}
//     }

//     pub async fn update(&self) -> Option<InsertManyResult> {
//         let resp = self.client.get("/coins", None).await?;
//         let coin_quotes = serde_json::from_str(&resp).ok()?;
//         save_coinquotes(&self.conn, &coin_quotes).await.ok()
//     }
// }

// // TODO either upgrade plan, or run a background thread for API data
// // and build own api using discrete time data

// pub fn run_api_observer(coll: &Collection) {
//     let coll2 = coll.clone();
//     thread::spawn(move || {
//         let obs = APIObserver::new(&coll2);
//     });

//     ()
// }