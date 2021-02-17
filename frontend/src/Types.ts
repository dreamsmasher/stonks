
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
{ price
, maxSupply
, totalSupply
, circulatingSupply
, marketCap
, percentChange24h
, percentChange7d
, percentChange1h
};

export enum DisplayUnits
{ price = 'USD'
, maxSupply = ''
, totalSupply = ''
, circulatingSupply = ''
, marketCap = ''
, percentChange24h = '%'
, percentChange7d = '%'
, percentChange1h = '%'
};

export const DisplaysKeys: string[] = [...Object.keys(Displays)].filter(k => k.length > 1);

export interface BTCTimeData {
  time_period_start: Date,
  time_period_end: Date,
  time_open: Date,
  time_close: Date,
  price_open: number,
  price_high: number,
  price_low: number,
  price_close: number,
  volume_traded: number,
  trades_count: number
}

export enum BTCDisplays 
{ time_period_start
, time_period_end
, time_open
, time_close
, price_open
, price_high
, price_low
, price_close
, volume_traded
, trades_count
} 

export const BTCDisplaysKeys: string[] = [...Object.keys(BTCDisplays)].filter(k => k.length > 1);