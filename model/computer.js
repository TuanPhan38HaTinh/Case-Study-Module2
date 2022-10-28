"use strict";
exports.__esModule = true;
exports.Computer = void 0;
var time_1 = require("./time");
var Computer = /** @class */ (function () {
    function Computer(name, status) {
        this.time = new time_1.Time(0, 0);
        this.service = [];
        this._name = name;
        this._status = status;
    }
    Object.defineProperty(Computer.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Computer.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (value) {
            this._status = value;
        },
        enumerable: false,
        configurable: true
    });
    return Computer;
}());
exports.Computer = Computer;
