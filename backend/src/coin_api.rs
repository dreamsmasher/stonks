use std::env;
extern crate reqwest;
use reqwest::{Response, Error};


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
            url: (url.to_string() +  "/v1/cryptocurrency/listings/latest")
        }
    }

    pub async fn get(&self) -> Result<Response, Error> {
      self.client.get(self.url.as_str()).send().await
    }

}