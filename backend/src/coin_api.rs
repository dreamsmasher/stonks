
use std::env;
extern crate reqwest;
use reqwest::{Response, Error, Url, RequestBuilder};
use rocket::http::{Status};
use crate::db::{save_coinquote, save_coinquotes};

pub struct CoinClient {
    client: reqwest::Client,
    url: String,
}

const TEST_API_KEY: &str = "b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c";
const TEST_URL: &str = "http://sandbox-api.coinmarketcap.com";
const PROD_URL: &str = "http://pro-api.coinmarketcap.com";

impl CoinClient {
    pub fn new() -> CoinClient {
        let mut headers = reqwest::header::HeaderMap::new();
        let (key, url) = if cfg!(debug_assertions) {
                println!("debuggin");
                (TEST_API_KEY.to_string(), TEST_URL) 
            } else {
                (env::var("CMC_KEY").unwrap(), PROD_URL)
            };

        headers.insert("X-CMC_PRO_API_KEY", key.parse().unwrap());

        let client = reqwest::Client::builder()
                     .default_headers(headers)
                     .build()
                     .unwrap(); // fail otherwise
                     
        CoinClient {
            client,
            url: String::from(url) + "/v1/cryptocurrency"
        }
    }
    fn parse_url(&self, endpoint: &str, args: Option<Vec<(&str, &str)>>) -> Option<Url> {
        let joined_url = self.url.clone() + endpoint;
        match args {
            None => Url::parse(&joined_url).ok(),
            Some(args) => Url::parse_with_params(&joined_url, args.iter()).ok()
        }
    }

    pub async fn get(&self, endpoint: &str, args: Option<Vec<(&str, &str)>>) -> Option<String> {
        let url = self.parse_url(endpoint, args)?;
        self.client.get(url).send().await.ok()?.text().await.ok()
    }

    pub async fn get_quotes(&self, args: Option<Vec<(&str, &str)>>) -> Option<String> {
        self.get("/quotes/latest", args).await
    }
}
