import * as React from 'react';
import {CoinQuote} from '../Types';
import {view} from '../prelude';

interface Node {
    leaf: string,
    kids: Map<Node>
}

const mkNode = (): Node => ({leaf: '', kids: new Map()});
export class Trie {
    head: Node = mkNode();

    constructor(words) {
        words.forEach(::this.insert);
    }

    insert(word) {
        let cur = this.head;
        for (let c of word.toLowerCase()) {
            if (!cur.kids.has(c)) {
                cur.kids.set(c, mkNode());
            }
            cur = cur.kids.get(c);
        }
        cur.leaf = word;
    }

    findAll(substr) {
        let cur = this.head;
        for (let c of substr.toLowerCase()) {
            if (!cur.kids.has(c)) {
                return [];
            }
            cur = cur.kids.get(c);
        }
        let q = [cur];
        let res = [];
        let qptr = 0;
        while (qptr < q.length) {
            cur = q[qptr++];
            cur.leaf.length && res.push(cur.leaf);
            cur.kids.forEach((v) => q.push(v));
        }
        return res;
    }
}

interface CoinSearchProps {
    values: string[],
    onFind: (results: string[]) => any
}

export const CoinSearch = ({values, onFind}: CoinSearchProps) => {
    let trie = new Trie(values);
    let [val, setVal] = React.useState('');

    let onChange = (ev) => {
        setVal(ev.target.value);
        ev.target.value |> trie.findAll(#) |> onFind;
    };
    return (
        <input type="text" value={val} onChange={onChange} placeholder="Search for cryptos"/>
    )
}