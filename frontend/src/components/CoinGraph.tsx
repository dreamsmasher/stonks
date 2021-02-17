import * as React from 'react';
import {CoinQuote, Displays, DisplayUnits} from '../Types';
import * as RC from 'recharts';

type MetricProps = {
    coin: CoinQuote,
    fields?: Array<string>
}

export const genColor = (): string => {
    return '#' + (~~(Math.random() * 16777215)).toString(16);
}

export const CoinMetric = ({coin, fields}: MetricProps) => {
    let entries = [...Object.entries(coin)];
    if (fields) {
        let s = new Set(fields);
        entries = entries.filter(([k, v]) => s.has(k));
    } 

    return (
        <> 
        {entries.map(([k, v], i) => (
            <RC.Line key={i} type="monotone" dataKey={k} stroke={genColor()} />
        ))
        }
        </>
    );

}
type CoinGraphProps = {
    coins: CoinQuote[],
    view: Displays
};

const flattenQuote = (obj: CoinQuote): object => {
    let {quote, ...keys} = obj;
    return {...keys, ...Object.values(quote)[0]}; // will only ever return a single fiat conversion

}
export const CoinGraph = ({coins, view}: CoinGraphProps) => {
    // @ts-ignore
    let quotes = coins.map((c) => flattenQuote(c) |> {symbol: #.symbol, [view]: #[view]});
    return (
        <RC.BarChart 
            width={3000}
            height={1000}
            data={quotes}>
                <RC.CartesianGrid strokeDasharray="3 3"/>
                <RC.XAxis dataKey="symbol" />
                <RC.YAxis />
                <RC.Tooltip />
                <RC.Legend />
                <RC.Bar unit={DisplayUnits[view]} dataKey={view} >
                    {quotes.map((_, i) => (
                        <RC.Cell key={`cell-${i}`} fill={genColor()}/>
                    ))}
                </RC.Bar>
            </RC.BarChart>
    )
}