var mkNode = function () { return ({ leaf: '', kids: new Map() }); };
var Trie = (function () {
    function Trie(words) {
        this.head = mkNode();
        words.forEach(this.insert);
    }
    Trie.prototype.insert = function (word) {
        var cur = this.head;
        for (var _i = 0, word_1 = word; _i < word_1.length; _i++) {
            var c = word_1[_i];
            if (!cur.kids.has(c)) {
                cur.kids.set(c, mkNode());
            }
            cur = cur.kids.get(c);
        }
        cur.leaf = word;
    };
    Trie.prototype.findAll = function (substr) {
        var cur = this.head;
        for (var _i = 0, substr_1 = substr; _i < substr_1.length; _i++) {
            var c = substr_1[_i];
            console.log(cur);
            if (!cur.kids.has(c)) {
                return [];
            }
            cur = cur.kids.get(c);
        }
        var q = [cur];
        var res = [];
        var qptr = 0;
        while (qptr < q.length) {
            cur = q[qptr++];
            cur.leaf.length && res.push(cur.leaf);
            cur.kids.forEach(function (_a) {
                var _ = _a[0], v = _a[1];
                return q.push(v);
            });
        }
        return res;
    };
    return Trie;
}());
export { Trie };
var w = ['btc', 'abc', 'btb', 'btch'];
var t = new Trie(w);
console.log(t.findAll('b'));
export var CoinSearch = function (_a) {
    var values = _a.values;
    var trie = new Trie(values);
    console.log(trie);
    var w = trie.findAll('B');
    console.log(w);
    return null;
};
