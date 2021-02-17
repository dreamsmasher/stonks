var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import * as React from 'react';
import * as RC from 'recharts';
var genColor = function () {
    return '#' + (~~(Math.random() * 16777215)).toString(16);
};
export var CoinMetric = function (_a) {
    var coin = _a.coin, fields = _a.fields;
    var entries = __spreadArrays(Object.entries(coin));
    if (fields) {
        var s_1 = new Set(fields);
        entries = entries.filter(function (_a) {
            var k = _a[0], v = _a[1];
            return s_1.has(k);
        });
    }
    return (React.createElement(React.Fragment, null, entries.map(function (_a, i) {
        var k = _a[0], v = _a[1];
        return (React.createElement(RC.Line, { key: i, type: "monotone", dataKey: k, stroke: genColor() }));
    })));
};
var flattenQuote = function (obj) {
    var quote = obj.quote, keys = __rest(obj, ["quote"]);
    return __assign(__assign({}, keys), Object.values(quote)[0]);
};
export var CoinGraph = function (_a) {
    var coins = _a.coins, view = _a.view;
    var quotes = coins.map(function (c) {
        var _a;
        return flattenQuote(c) |  > (_a = { symbol: #.symbol }, _a[view] = #[view], _a);
    });
    return (React.createElement(RC.BarChart, { width: 3000, height: 1000, data: quotes },
        React.createElement(RC.XAxis, { dataKey: "symbol" }),
        React.createElement(RC.YAxis, null),
        React.createElement(RC.Tooltip, null),
        React.createElement(RC.Legend, null),
        React.createElement(RC.Bar, { dataKey: view, fill: genColor() })));
};
