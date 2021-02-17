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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import * as React from 'react';
import { Form, Dropdown, DropdownButton, Button } from 'react-bootstrap';
import { CoinSearch } from './CoinSearch';
var DropDown = (function (_super) {
    __extends(DropDown, _super);
    function DropDown(props) {
        var _this = _super.call(this, props) || this;
        _this.state =
            Object.fromEntries(props.fields.map(function (f) { return [f, true]; }));
        return _this;
    }
    DropDown.prototype.onChange = function (ev) {
        var _a;
        this.setState((_a = {}, _a[ev.target.name] = ev.target.checked, _a));
    };
    DropDown.prototype.onSubmit = function (ev) {
        var _this = this;
        ev.preventDefault();
        var selected = __spreadArrays(Object.keys(this.state)).filter(function (k) { return _this.state[k]; });
        this.props.onSubmit(selected);
    };
    DropDown.prototype.render = function () {
        var keys = __spreadArrays(Object.keys(this.state));
        return (React.createElement(Dropdown, null,
            React.createElement(DropdownButton, { id: "currency-dropdown-toggle", title: "Select coins" },
                React.createElement(Form, { onSubmit:  }),
                ":this.onSubmit}>",
                React.createElement(CoinSearch, { values: this.props.fields }),
                keys.map(function (k, i) { return (React.createElement(Form.Check, { inline: true, onChange:  })); }),
                "::this.onChange} checked=",
                this.state[k],
                "name=",
                k,
                "label=",
                k,
                "type=\"checkbox\" key=",
                k,
                "id=",
                k,
                "/>)) }",
                React.createElement(Button, { type: "submit" }, "Submit"))));
        Dropdown >
        ;
    };
    return DropDown;
}(React.Component));
export { DropDown };
