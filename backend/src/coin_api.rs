
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

const TEST_COINAPI_KEY: &str = "";
const TEST_COINAPI_URL: &str = "http://rest-sandbox.coinapi.io";
const PROD_COINAPI_URL: &str = "http://rest-sandbox.coinapi.io";

// TODO move this into a config file or something 
pub fn cmc_api_init() -> CoinClient {

    let (key, url) = if cfg!(debug_assertions) {
            (TEST_API_KEY.to_string(), TEST_URL) 
        } else {
            (env::var("CMC_KEY").unwrap(), PROD_URL)
        };
    let url = String::from(url) + "/v1/cryptocurrency";
    CoinClient::new("X-CMC_PRO_API_KEY", &key, &url)
    // headers.insert("X-CMC_PRO_API_KEY", key.parse().unwrap());
}

pub fn coinapi_init() -> CoinClient {
    let key = env::var("COINAPI_KEY").unwrap(); // need this
    let url = if cfg!(debug_assertions) {
            TEST_COINAPI_URL
        } else {
            PROD_COINAPI_URL
        };
    CoinClient::new("X-CoinAPI-Key", &key, url)
}

impl CoinClient {
    pub fn new(header: &'static str, key: &str, url: &str) -> CoinClient {
        let mut headers = reqwest::header::HeaderMap::new();

        headers.insert(header, key.parse().unwrap());

        let client = reqwest::Client::builder()
                     .default_headers(headers)
                     .build()
                     .unwrap(); // fail otherwise
                     
        CoinClient {
            client,
            url: String::from(url) 
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
        println!("{}", url);
        self.client.get(url).send().await.ok()?.text().await.ok()
    }

    pub async fn get_quotes(&self, args: Option<Vec<(&str, &str)>>) -> Option<String> {
        self.get("/quotes/latest", args).await
    }
}
