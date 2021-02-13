use rocket::request::{FromFormValue};
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