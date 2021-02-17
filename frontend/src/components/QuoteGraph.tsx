import * as RC from 'recharts';
import * as React from 'react';
import {BTCTimeData, BTCDisplays} from '../Types';
import {genColor} from './CoinGraph';

interface QuoteGraphProps {
    data: BTCTimeData[],
    view: BTCDisplays
}


export const QuoteGraph = ({data, view}: QuoteGraphProps) => {
    // @ts-ignore
    // let quotes = coins.map((c) => flattenQuote(c) |> {symbol: #.symbol, [view]: #[view]});
    return (
        <RC.LineChart 
            width={3000}
            height={1000}
            data={data}>
                <RC.CartesianGrid strokeDasharray="3 3"/>
                <RC.XAxis dataKey="time_period_start" />
                <RC.YAxis />
                <RC.Tooltip />
                <RC.Legend />
                <RC.Line unit={BTCDisplays[view]} dataKey={view} >
                    {data.map((_, i) => (
                        <RC.Cell key={`cell-${i}`} fill={genColor()}/>
                    ))}
                </RC.Line>
            </RC.LineChart>
    )
} 