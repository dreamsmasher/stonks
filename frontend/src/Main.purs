module Main where

import ApiBindings
import Type.Proxy
import Components.Types
import Data.Enum
import Data.Maybe
import Halogen
import Halogen.Aff
import Prelude

import Effect (Effect)
import Effect.Console (log)
import Halogen.HTML as T
import Halogen.HTML.Elements.Keyed (div_)
import Halogen.HTML.Events as HE
import Halogen.VDom.Driver (runUI)

data Act = Inc | Dec

app = mkComponent
  { initialState
  , render
  , eval: mkEval defaultEval {handleAction = handleAction}
  }
  where initialState _ = 0
        render st = T.div_
          [ T.button [ HE.onClick \_ -> Just Dec] [ T.text "-" ] 
          , T.text (show st)
          , T.button [ HE.onClick (const (Just Inc))] [ T.text "+" ]
          , T.slot "arbitrary string" 0 henloElem
          ]
        handleAction = case _ of
          Inc -> modify_ (\st -> st + 1)
          Dec -> modify_ (\st -> st - 1)

-- henloElem :: forall q i o m. Component q i o m 
henloElem = mkComponent {initialState, render, eval: mkEval defaultEval }
  where render st = T.div [HE.onClick \_ -> Just unit] [  T.text (show st) ]
        initialState = const ""
        eval = mkEval defaultEval {handleAction = handleAction}
        handleAction _ = modify_ (\st -> st <> "henlo ")
        

main :: Effect Unit
main = runHalogenAff do
  body <- awaitBody
  runUI app unit body
  