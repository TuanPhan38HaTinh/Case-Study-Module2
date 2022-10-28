"use strict";
exports.__esModule = true;
exports.UserAccountManagement = void 0;
var UserAccountManagement = /** @class */ (function () {
    function UserAccountManagement() {
        this.list = [];
    }
    UserAccountManagement.prototype.add = function (data) {
        this.list.push(data);
    };
    UserAccountManagement.prototype.findByUsername = function (name) {
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].name == name) {
                return i;
            }
        }
        return -1;
    };
    UserAccountManagement.prototype.checkAccount = function (name) {
        var index = this.findByUsername(name);
        console.log("You have $".concat(this.list[index].amount, " in your account."));
    };
    UserAccountManagement.prototype.topUp = function (name, amount) {
        var index = this.findByUsername(name);
        this.list[index].amount += amount;
    };
    return UserAccountManagement;
}());
exports.UserAccountManagement = UserAccountManagement;
