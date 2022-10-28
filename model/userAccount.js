"use strict";
exports.__esModule = true;
exports.UserAccount = void 0;
var UserAccount = /** @class */ (function () {
    function UserAccount(name, password) {
        this.amount = 0;
        this._name = name;
        this._password = password;
    }
    Object.defineProperty(UserAccount.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserAccount.prototype, "password", {
        get: function () {
            return this._password;
        },
        set: function (value) {
            this._password = value;
        },
        enumerable: false,
        configurable: true
    });
    return UserAccount;
}());
exports.UserAccount = UserAccount;
