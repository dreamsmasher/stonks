var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import * as axios from 'axios';
var serverURL = window.location.origin;
export function fetchData() {
    return axios.get(serverURL + '/coins').then(function (d) { return d.data.map(fromSnakeCase); });
}
export function convSnakeCase(s) {
    return s.replace(/_./g, function (match) { return match.slice(1).toUpperCase(); });
}
export function fromSnakeCase(obj) {
    return Object.fromEntries(__spreadArrays(Object.entries(obj)).map(function (_a) {
        var k = _a[0], v = _a[1];
        return ([convSnakeCase(k), v instanceof Object ? fromSnakeCase(v) : v]);
    }));
}
