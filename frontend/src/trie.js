
const mkNode = () => ({leaf: '', kids: new Map()});

class Trie {
    constructor(words) {
        this.head = mkNode();
        words.forEach(this.insert.bind(this));
    }

    insert(word) {
        let cur = this.head;
        for (let c of word.toLowerCase()) {
            if (!cur.kids.has(c)) {
                cur.kids.set(c., mkNode());
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
            console.log(cur);
            cur = q[qptr++];
            cur.leaf.length && res.push(cur.leaf);
            for (let [_, v] of cur.kids) {
                q.push(v);
            }
            // cur.kids.forEach(([_, v]) => q.push(v));
        }
        return res;
    }
}

let w = ['btc', 'abc', 'bass', 'bob', 'btb', 'btch'];

let t = new Trie(w);

console.log(t.findAll('b'));
console.log(t.findAll('bt'));
