"use strict";
exports.__esModule = true;
exports.Regex = void 0;
var Regex = /** @class */ (function () {
    function Regex() {
        this.passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        this.nameRegex = /^[a-zA-Z][a-zA-Z0-9!@#$%^&*]{2,16}$/;
    }
    Regex.prototype.validPassword = function (regex) {
        return this.passwordRegex.test(regex);
    };
    Regex.prototype.validName = function (regex) {
        return this.nameRegex.test(regex);
    };
    return Regex;
}());
exports.Regex = Regex;
