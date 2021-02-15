module Components.Types  where

import Data.Argonaut (class DecodeJson, decodeJson, getField, (.:), (.:?))
import Data.DateTime (DateTime)
import Foreign.Object
import Data.DateTime.ISO (unwrapISO)
import Data.Generic.Rep (class Generic)
import Data.Generic.Rep.Show (genericShow)
import Data.Maybe (Maybe)
import Data.Traversable (traverse)
import Prelude (class Show, bind, pure, ($), (<#>))

import Partial.Unsafe (unsafePartial)

type Currency = String
data CoinQuote = Quote
  { name :: String
  , symbol :: String
  , slug :: String
  , numMktPairs :: Int
  , tags :: Array String
  , maxSupply :: Maybe Number
  , circulatingSupply :: Number
  , platform :: Maybe Platform
  , cmcRank :: Int
  , lastUpdated :: DateTime
  , quote :: Object PriceData 
  }

data PriceData = PriceData
  { price :: Number
  , volume24H :: Number
  , percentChange1H :: Number
  , percentChange24H :: Number
  , percentChange7d :: Number
  , marketCap :: Number
  , lastUpdated :: DateTime
  }

data Platform = Platform 
  { id :: Int
  , name :: String
  , symbol :: String
  , slug :: String
  , tokenAddress :: String
  }

derive instance genericPriceData :: Generic PriceData _
derive instance genericCoinQuote :: Generic CoinQuote _
derive instance genericPlatform  :: Generic Platform _

instance showPriceData :: Show PriceData where
    show = genericShow

instance showCoinQuote :: Show CoinQuote where
    show = genericShow

instance showPlatform :: Show Platform where
    show = genericShow

instance decodeJSONPriceData :: DecodeJson PriceData where
    decodeJson json = unsafePartial $ do
        obj <- decodeJson json
        price <- obj .: "price"
        volume24H <- obj .: "volume_24h"
        percentChange1H <- obj .: "percent_change_1h"
        percentChange24H <- obj .: "percent_change_24h"
        percentChange7d <- obj .: "percent_change_7d"
        marketCap <- obj .: "market_cap"
        lastUpdated <- obj .: "last_updated" <#> unwrapISO
        pure $ PriceData 
          { price
          , volume24H
          , percentChange1H
          , percentChange24H
          , percentChange7d
          , marketCap
          , lastUpdated
          }

instance decodeJSONCoinQuote :: DecodeJson CoinQuote where
    -- pattern match is correct
    decodeJson json = unsafePartial $ do
        obj <- decodeJson json
        [name, symbol, slug] <- traverse (getField obj) ["name", "symbol", "slug"]
        numMktPairs <- obj .: "num_market_pairs"
        tags <- obj .: "tags"
        maxSupply <- obj .: "max_supply"
        circulatingSupply <- obj .: "circulating_supply"
        platform <- obj .:? "platform"
        cmcRank <- obj .: "cmc_rank"
        lastUpdated <- obj .: "last_updated" <#> unwrapISO
        quote <- obj .: "quote" 
        pure $ Quote 
            { name
            , symbol
            , slug
            , numMktPairs
            , tags
            , maxSupply
            , circulatingSupply
            , platform
            , cmcRank
            , lastUpdated
            , quote
            }

instance decodeJSONPlatform :: DecodeJson Platform where
    decodeJson json = unsafePartial $ do
        obj <- decodeJson json
        id <- obj .: "id"
        [name, symbol, slug, tokenAddress] <- traverse (obj .: _) ["name", "symbol", "slug", "token_address"]
        pure $ Platform
            { id
            , name
            , symbol
            , slug
            , tokenAddress

            }