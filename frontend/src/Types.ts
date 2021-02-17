
export type Currency = string

export interface CoinQuote 
  { name : string
  , symbol : string
  , slug : string
  , numMktPairs : number
  , tags : Array<string>
  , maxSupply : number | null
  , circulatingSupply : number
  , platform : Platform | null
  , cmcRank : number
  , lastUpdated : Date
  , quote : PriceData
  }

export interface PriceData
{ price : number
, volume24H : number
, percentChange1H : number
, percentChange24H : number
, percentChange7d : number
, marketCap : number
, lastUpdated : Date
}

export interface Platform
{ id : number
, name : string
, symbol : string
, slug : string
, tokenAddress : string
}

export enum Displays 
{ maxSupply
, totalSupply
, circulatingSupply
, price
, marketCap
, percentChange24h
, percentChange7d
, percentChange1h
};

export const DisplayKeys: string[] = [...Object.keys(Displays)].filter(k => k.length > 1);
