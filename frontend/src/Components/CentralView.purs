module Components.CentralView where
  
import Control.Alternative
import Control.Applicative
import Control.Apply
import Control.Lazy
import Data.Char
import Data.List
import Data.Maybe
import Data.Traversable
import Prelude

import Data.Array as A
import Data.Map (Map)
import Data.Map as M
import Data.String (fromCodePointArray)
import Data.String.CodePoints (codePointFromChar)
import Data.String.CodeUnits (toCharArray)
import Data.Tuple (Tuple(..))
import Halogen.HTML (a)
import Unsafe.Coerce (unsafeCoerce)
import Web.HTML.Event.EventTypes (offline)

-- import Web.HTML.Event.EventTypes (offline)

-- type placeholder
undefined :: forall a. a
undefined = unsafeCoerce unit

newtype Parse s a = Parse (s -> Maybe (Tuple a s))

runParse :: forall s a. Parse s a -> (s -> Maybe (Tuple a s))
runParse (Parse p) = p

instance funcParse :: Functor (Parse s) where
    map f p = Parse $ \s -> (\(Tuple a s') -> Tuple (f a) s') <$> runParse p s

instance applyParse :: Apply (Parse s) where
  apply = ap

instance appParse :: Applicative (Parse s) where
  pure x = Parse $ Just <<< Tuple x

instance bindParse :: Bind (Parse s) where
  bind p f = Parse $ \s -> case runParse p s of
    Nothing -> Nothing
    Just (Tuple a s') -> 
        runParse (f a) s'

instance monadParse :: Monad (Parse s) 

instance showParse :: Show (Parse s a) where
  show _ = "Parser a"

instance altParse :: Alt (Parse s) where
    alt p q = Parse $ lift2 (<|>) (runParse p) (runParse q) --let res = runParse p s in case res of

instance plusParse :: Plus (Parse s) where
    empty = Parse (const Nothing)

instance alternParse :: Alternative (Parse s) 

instance lazyParse :: Lazy (Parse s a) where
    defer f = f unit

type Str = List Char

char :: Char -> Parse Str Char
char c = Parse $ uncons >=> \{head, tail} -> if head == c then Just (Tuple c tail) else Nothing

string :: Str -> Parse Str Str
string = traverse char

test :: Parse Str Str
test = string (fromFoldable $ toCharArray "henlo")

anyChar :: Parse Str Char
anyChar = Parse $ uncons >>> map (\{head, tail} -> Tuple head tail)

skip :: forall m a b. Bind m => m a -> m b -> m b
skip a b = a >>= \_ -> b
infixl 1 skip as >>

put :: Char -> Parse Str Unit 
put c = Parse $ \s -> pure (Tuple unit (c : s))

parseWhile :: (Char -> Boolean) -> Parse Str Str
parseWhile p = do
    c <- anyChar
    if (p c) then do
        rest <- parseWhile p
        pure (c : rest)
    else put c >> pure Nil -- step back 1

between :: Char -> Char -> Parse Str Str
between l r = char l >> parseWhile (\c -> c /= r) <* anyChar

parseJSONStr :: Parse Str PrimVal
parseJSONStr = (JStr <<< fromCodePointArray <<< toUnfoldable <<< map codePointFromChar) <$> (between '"' '"')

data PrimVal = JStr String | Arr (Array PrimVal) | Obj (Map String PrimVal) | Num  Number | Null

instance showPrimVal :: Show PrimVal where
    show p = case p of
        JStr s -> show s
        Null -> "null"
        Num n -> show n
        Arr p -> "[" <> intercalate "," (map show p) <> "]"
        Obj o -> show o

-- spaces :: Parse Str unit 
-- spaces = let loop = fix $ \f -> (char ' ' >> f unit) <|> pure unit
--     in loop
    
-- parseArr :: Parse Str PrimVal
-- parseArr = between '[' ']' $ do
    -- let loop p = do



fromString :: String -> Str
fromString = fromFoldable <<< toCharArray