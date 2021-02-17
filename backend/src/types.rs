use rocket::request::{FromFormValue};
use serde::{Serialize, Deserialize};
// use rocket::http::RawStr;

#[derive(FromFormValue, Debug)]
pub enum Interval {
    Hour,
    Day,
    Week,
    Month,
    Year
}

impl Interval {
    pub fn to_query(&self) -> String {
        match self {
            Interval::Day => String::from("daily"),
            _ => format!("{:?}", self).to_lowercase() + "ly"
        }

    }
}

#[derive(Serialize, Deserialize)]
pub struct CoinQuote {
    id: i32,
    name: String,
    symbol: String,
    slug: String,
    num_market_pairs: i32,
    max_supply: Option<i32>,
    circulating_supply: i32,
    total_supply: i32,
    platform: Option<Platform>,
    cmc_rank: i32,
    quote: Quote,
}

#[derive(Serialize, Deserialize)]
pub struct Platform {
    id: i32,
    name: String,
    symbol: String,
    slug: String,
    token_address: String
}

#[derive(Serialize, Deserialize)]
pub struct Quote {
    price: f64,
    volume_24h: f64,
    percent_change_1h: f64,
    percent_change_24h: f64,
    percent_change_7d: f64,
    market_cap: f64
}
