use crate::{types::*, db::*}; 
use crate::coin_api::CoinClient;
use std::thread;
use mongodb::{Collection, results::InsertManyResult, error::Error, bson::document};
use std::rc::Rc;
use serde_json;

struct APIObserver {
    conn: Box<Collection>,
    client: Box<CoinClient>
}

impl APIObserver {
    pub fn new(coll: &Collection) -> Self {
        Self{conn: Box::new(coll.clone()), client: Box::new(CoinClient::new())}
    }

    pub async fn update(&self) -> Option<InsertManyResult> {
        let resp = self.client.get("/coins", None).await?;
        let coin_quotes = serde_json::from_str(&resp).ok()?;
        save_coinquotes(&self.conn, &coin_quotes).await.ok()
    }
}

pub fn run_api_observer(coll: &Collection) {
    let coll2 = coll.clone();
    thread::spawn(move || {
        let obs = APIObserver::new(&coll2);
    });

    ()
}