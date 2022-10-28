"use strict";
exports.__esModule = true;
exports.Time = void 0;
var Time = /** @class */ (function () {
    function Time(startTime, endTime) {
        this._startTime = startTime;
        this._endTime = endTime;
    }
    Object.defineProperty(Time.prototype, "startTime", {
        get: function () {
            return this._startTime;
        },
        set: function (value) {
            this._startTime = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Time.prototype, "endTime", {
        get: function () {
            return this._endTime;
        },
        set: function (value) {
            this._endTime = value;
        },
        enumerable: false,
        configurable: true
    });
    return Time;
}());
exports.Time = Time;
