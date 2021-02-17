var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import * as API from '../coinApi';
import { DisplayKeys } from '../Types';
import { CoinGraph } from './CoinGraph';
import { DropDown } from './Dropdown';
import Form from 'react-bootstrap/Form';
var unCamel = function (s) { return s.replace(/[a-z][A-Z0-9]/g, function (m) { return m.charAt(0) + ' ' + m.charAt(1).toLowerCase(); }); };
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            coins: [],
            show: new Set(),
            display: 'price'
        };
        return _this;
    }
    App.prototype.componentDidMount = function () {
        this.fetch();
        setInterval(this.fetch, 1000 * 60 * 10);
    };
    App.prototype.fetch = function () {
        var _this = this;
        API.fetchData()
            .then(function (coins) { return _this.setState(function (st) {
            return ({ coins: coins,
                show: st.show.size ? st.show : new Set(coins.map(function (c) { return c.symbol; }))
            });
        }); });
    };
    App.prototype.onViewChange = function (show) {
        this.setState({ show: new Set(show) });
    };
    App.prototype.onDispChange = function (ev) {
        console.log(ev.target.value);
        this.setState({ display: ev.target.value });
    };
    App.prototype.render = function () {
        var _a = this.state, coins = _a.coins, show = _a.show, display = _a.display;
        var showCoins = coins.filter(function (c) { return show.has(c.symbol); });
        console.log(showCoins);
        return (React.createElement("div", { className: "stonks-container" },
            React.createElement("h1", null, "S T O N K S"),
            React.createElement(Form.Control, { onChange:  }),
            ":this.onDispChange} as=\"select\" name=\"graphview\" id=\"graph-select\">",
            DisplayKeys.map(function (k, i) { return (React.createElement("option", { key: i, value: k }, unCamel(k))); }))
            ,
                React.createElement(DropDown, { key: coins.length, fields: coins.map(function (c) { return c.symbol; }), onSubmit: , this: true, onViewChange: true }));
    };
    return App;
}(React.Component));
export default App;
/>
    < CoinGraph;
coins = { showCoins: showCoins };
view = { display: display } /  >
;
div >
;
