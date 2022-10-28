"use strict";
exports.__esModule = true;
exports.ComputerManagement = void 0;
var computer_1 = require("../model/computer");
var ComputerManagement = /** @class */ (function () {
    function ComputerManagement() {
        this.list = [];
        var computer1 = new computer_1.Computer("Computer1", "OFF");
        var computer2 = new computer_1.Computer("Computer2", "OFF");
        var computer3 = new computer_1.Computer("Computer3", "OFF");
        var computer4 = new computer_1.Computer("Computer4", "OFF");
        var computer5 = new computer_1.Computer("Computer5", "OFF");
        var computer6 = new computer_1.Computer("Computer6", "OFF");
        var computer7 = new computer_1.Computer("Computer7", "OFF");
        var computer8 = new computer_1.Computer("Computer8", "OFF");
        var computer9 = new computer_1.Computer("Computer9", "OFF");
        var computer10 = new computer_1.Computer("Computer10", "OFF");
        var computer11 = new computer_1.Computer("Computer11", "OFF");
        var computer12 = new computer_1.Computer("Computer12", "OFF");
        this.list.push(computer1, computer2, computer3, computer4, computer5, computer6, computer7, computer8, computer9, computer10, computer11, computer12);
    }
    ComputerManagement.prototype.add = function (data) {
        this.list.push(data);
    };
    ComputerManagement.prototype["delete"] = function (name) {
        var index = this.findByName(name);
        this.list.splice(index, 1);
    };
    ComputerManagement.prototype.edit = function (name, data) {
    };
    ComputerManagement.prototype.findByName = function (name) {
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].name == name) {
                return i;
            }
        }
        return -1;
    };
    ComputerManagement.prototype.showAll = function () {
        var count = 0;
        console.log("-----------------------------");
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var element = _a[_i];
            console.log("".concat(count + 1, ".").concat(element.name, " is ").concat(element.status));
            count++;
        }
        console.log("-----------------------------");
    };
    ComputerManagement.prototype.showOnline = function () {
        console.log("-----------------------------");
        var count = 0;
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var element = _a[_i];
            if (element.status == "ON") {
                console.log("".concat(count + 1, ".").concat(element.name, " is ").concat(element.status));
                count++;
            }
        }
        if (count == 0) {
            console.log("There is no computer is ON.");
            return -1;
        }
        console.log("-----------------------------");
    };
    ComputerManagement.prototype.showOffline = function () {
        console.log("-----------------------------");
        var count = 0;
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var element = _a[_i];
            if (element.status == "OFF") {
                console.log("".concat(count + 1, ".").concat(element.name, " is ").concat(element.status));
                count++;
            }
        }
        if (count == 0) {
            console.log("There is no computer OFF");
            return -1;
        }
        console.log("-----------------------------");
    };
    ComputerManagement.prototype.showByName = function (name) {
        console.log("-----------------------------");
        var index = this.findByName(name);
        if (index == -1) {
            console.log("There is no computer with the name of ".concat(name));
        }
        else {
            console.log("".concat(this.list[index].name, " is ").concat(this.list[index].status));
            this.list[index].time.endTime = Date.now();
            if (this.list[index].status == "ON") {
                var usedTime = Math.round((this.list[index].time.endTime - this.list[index].time.startTime) / 1000);
                console.log("total time using is: ".concat(usedTime, " seconds."));
            }
            if (this.list[index].service.length != 0) {
                console.log("Additional items:");
            }
            for (var _i = 0, _a = this.list[index].service; _i < _a.length; _i++) {
                var element = _a[_i];
                console.log("  -".concat(element.quantity, " of ").concat(element.name));
            }
        }
        console.log("-----------------------------");
    };
    return ComputerManagement;
}());
exports.ComputerManagement = ComputerManagement;
