module Page where

import Halogen
import Data.Maybe
import Data.Date
import Data.Map

type Currency = String
data CoinQuote = Quote
    { name :: String
    , symbol :: String
    , slug :: String
    , num_market_pairs :: Int
    , tags :: Array String
    , maxSupply :: Int
    , circulatingSupply :: Number
    , platform :: Maybe String
    , cmcRank :: Int
    , lastUpdated :: Date
    , quote :: Map Currency PriceData 
    }

data PriceData = PriceData
    { price :: Number
    , volume24H :: Number
    , percentChange1H :: Number
    , percentChange24H :: Number
    , percentChange7d :: Number
    , marketCap :: Number
    , lastUpdated :: Date
    }
