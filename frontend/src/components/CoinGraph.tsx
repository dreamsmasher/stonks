import * as React from 'react';
import {CoinQuote} from '../Types';
import * as RC from 'recharts';

type MetricProps = {
    coin: CoinQuote,
    fields?: Array<string>
}

const genColor = (): string => {
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
            <RC.Line type="monotone" dataKey={k} stroke={genColor()} />
        ))
        }
        </>
    )

}

type CoinGraphProps = {
    coins: CoinQuote[],
    fields?: string[]
};

export const CoinGraph = ({coins, fields}: CoinGraphProps) => {
    return null;
}