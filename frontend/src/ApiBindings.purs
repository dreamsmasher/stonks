module ApiBindings where

import Affjax
import Affjax.ResponseFormat
import Components.Types
import Data.Argonaut
import Data.Either
import Data.Functor
import Data.HTTP.Method
import Effect
import Effect.Aff
import Effect.Class
import Effect.Console
import Prelude
import Foreign.Object

import Data.Show (show)
import Unsafe.Coerce (unsafeCoerce)
import Web.HTML.Location (origin)

dbUrl :: URL
dbUrl = "http://localhost:8000/coins"
-- TODO fixme for deployment

fromResp :: Response Json -> Either JsonDecodeError (Object Json)
fromResp resp = decodeJson (resp.body)

fetchData :: Aff (Either JsonDecodeError (Array CoinQuote))
fetchData = request (defaultRequest 
  { url = dbUrl
  , method = Left GET
  , responseFormat = json
  }) <#> (either (const $ Left MissingValue) (fromResp >=> (_ .: "data")))

-- test :: Effect Unit
-- test = do
--     _ <- runAff (show >>> log) fetchData
--     pure unit