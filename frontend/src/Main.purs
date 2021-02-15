module Main where

import Prelude
import Components.Types
import ApiBindings

import Effect (Effect)
import Effect.Console (log)

import Halogen.HTML as HH

main :: Effect Unit
main = do
  log "henlo"
  
class Appl f where
  ap :: forall a b. f (a -> b) -> a -> f b
  pur :: forall a. a -> f a
