{-
Welcome to a Spago project!
You can edit this file as you like.
-}
{ name = "my-project"
, dependencies =
  [ "argonaut"
  , "console"
  , "datetime"
  , "effect"
  , "halogen"
  , "parsing"
  , "prelude"
  , "psci-support"
  , "simple-ajax"
  , "strings"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
