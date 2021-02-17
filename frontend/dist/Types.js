var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
export var Displays;
(function (Displays) {
    Displays[Displays["maxSupply"] = 0] = "maxSupply";
    Displays[Displays["totalSupply"] = 1] = "totalSupply";
    Displays[Displays["circulatingSupply"] = 2] = "circulatingSupply";
    Displays[Displays["price"] = 3] = "price";
    Displays[Displays["marketCap"] = 4] = "marketCap";
    Displays[Displays["percentChange24h"] = 5] = "percentChange24h";
    Displays[Displays["percentChange7d"] = 6] = "percentChange7d";
    Displays[Displays["percentChange1h"] = 7] = "percentChange1h";
})(Displays || (Displays = {}));
;
export var DisplayKeys = __spreadArrays(Object.keys(Displays)).filter(function (k) { return k.length > 1; });
