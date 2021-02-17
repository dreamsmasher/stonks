import * as CT from './Types';
import * as axios from 'axios';

const serverURL = window.location.origin;

export function fetchData(): Promise<CT.CoinQuote[]> {
    return axios.get(serverURL + '/coins').then(d => d.data.map(fromSnakeCase));

}

export function convSnakeCase(s: string): string {
    return s.replace(/_./g, (match) => match.slice(1).toUpperCase())
}

export function fromSnakeCase(obj: object): CT.CoinQuote {
    return Object.fromEntries([...Object.entries(obj)].map(([k, v]) => (
        [convSnakeCase(k), v instanceof Object ? fromSnakeCase(v) : v]
    ))) as CT.CoinQuote;
}