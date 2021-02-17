use mongodb::{Client, results, error::Error, Collection, options::ClientOptions, bson::{doc, to_document, Bson, from_bson, to_bson, document::Document}};
use crate::types::{CoinQuote, Quote, Platform};
use serde::{Serialize, Deserialize};
// use bson_rs::Bson;

pub async fn mongo_init() -> Result<Client, Error> {
    let mut client_options = ClientOptions::parse("mongodb://localhost:27017").await.unwrap();
    client_options.app_name = Some("stonks".to_string());
    Client::with_options(client_options)
}

pub fn coll_connect(client: &Client) -> Collection {
    client.database("db").collection("stonks")
}

pub async fn save_coinquote(coll: &Collection, coinquote: &CoinQuote) -> Result<results::InsertOneResult, Error> {
    let b = to_document(coinquote)?;
    coll.insert_one(b, None).await
}

pub async fn save_coinquotes(coll: &Collection, quotes: &Vec<CoinQuote>) -> Result<results::InsertManyResult, Error> {
    let docs = quotes.iter().filter_map(|q| to_document(q).ok());
    coll.insert_many(docs, None).await
}