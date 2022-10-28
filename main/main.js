"use strict";
exports.__esModule = true;
var price_1 = require("../model/price");
var service_1 = require("../model/service");
var computer_1 = require("../model/computer");
var computerManagement_1 = require("../service/computerManagement");
var dailyIncome_1 = require("../model/dailyIncome");
var userAccount_1 = require("../model/userAccount");
var userAccountManagement_1 = require("../service/userAccountManagement");
var regex_1 = require("../regex");
var mainMenu = "-----------Main Menu----------\n" +
    "1.For admin.\n" +
    "2.For user.\n" +
    "0.Exit\n" +
    "------------------------------";
var adminMenu = "----------Admin Menu----------\n" +
    "1.Show computer's status.\n" +
    "2.Add a computer.\n" +
    "3.Turn ON a computer.\n" +
    "4.Turn OFF a computer.\n" +
    "5.Delete a computer.\n" +
    "6.Add additional services.\n" +
    "7.Change hourly rate.\n" +
    "8.Show Today's income.\n" +
    "9.Show History income.\n" +
    "0.Exit.\n" +
    "------------------------------";
var userMenu = "-----------Main Menu----------\n" +
    "1.Check Account\n" +
    "2.Top up money\n" +
    "3.Turn on a computer\n" +
    "4.Order service\n" +
    "0.Turn off a computer\n" +
    "------------------------------";
var input = require("readline-sync");
var currentDate = new Date();
var fs = require('fs');
var computers = new computerManagement_1.ComputerManagement();
var price = new price_1.Price();
var userAccounts = new userAccountManagement_1.UserAccountManagement();
var regex = new regex_1.Regex();
var dailyIncome = new dailyIncome_1.DailyIncome();
dailyIncome.date = "".concat(currentDate.getDate(), "-").concat(currentDate.getMonth() + 1, "-").concat(currentDate.getFullYear());
var loginAdmin = function () {
    console.log("Please enter username and password to login.");
    var adminName = input.question("Username: ");
    var adminPassword = input.question("Password: ");
    while (adminName != "admin" || adminPassword != "123456") {
        console.log("Wrong username or password. Please login again.");
        adminName = input.question("Username: ");
        adminPassword = input.question("Password: ");
    }
    console.log("Login successfully!");
};
var showComputer = function () {
    var showMenu = "----------Show Menu-----------\n" +
        "1.Show all computers.\n" +
        "2.Show all ON computers.\n" +
        "3.Show all OFF computers.\n" +
        "4.Show computer by name.\n" +
        "0.Exit \n" +
        "-----------------------------";
    var showOption;
    do {
        console.log(showMenu);
        showOption = +input.question("Option: ");
        switch (showOption) {
            case 1:
                computers.showAll();
                break;
            case 2:
                computers.showOnline();
                break;
            case 3:
                computers.showOffline();
                break;
            case 4:
                var computerName = input.question("Enter the name of computer: ");
                while (computers.findByName(computerName) == -1) {
                    console.log("Wrong input, please do it again.");
                    computerName = input.question("Enter the name of computer: ");
                }
                computers.showByName(computerName);
                break;
            case 0:
                break;
            default:
                console.log("Wrong input. Please do it again.");
                break;
        }
    } while (showOption != 0);
};
var addComputer = function () {
    var checkValidName = function (name) {
        for (var _i = 0, _a = computers.list; _i < _a.length; _i++) {
            var computer = _a[_i];
            if (name == computer.name) {
                return false;
            }
        }
        return true;
    };
    var computerName = input.question("Enter computer name: ");
    while (!checkValidName(computerName)) {
        console.log("The name already exist. Please enter another name.");
        computerName = input.question("Enter computer name: ");
    }
    var addComputer = new computer_1.Computer(computerName, "OFF");
    computers.add(addComputer);
    console.log("Adding ".concat(computerName, " successfully!"));
};
var turnOnComputer = function () {
    var checkInOffList = function (name) {
        for (var _i = 0, _a = computers.list; _i < _a.length; _i++) {
            var computer = _a[_i];
            if (computer.status == "OFF") {
                if (computer.name == name) {
                    return true;
                }
            }
        }
        return false;
    };
    console.log("List of computers currently are OFF: ");
    if (!computers.showOffline()) {
        console.log("Chose the computer do you want to turn ON: ");
        var computerName = input.question("Computer's name: ");
        while (!checkInOffList(computerName)) {
            console.log("Wrong input, please enter a again.");
            computerName = input.question("Computer's name: ");
        }
        var index = computers.findByName(computerName);
        computers.list[index].status = "ON";
        computers.list[index].time.startTime = Date.now();
    }
};
var turnOffComputer = function () {
    var checkInOnList = function (name) {
        for (var _i = 0, _a = computers.list; _i < _a.length; _i++) {
            var computer = _a[_i];
            if (computer.status == "ON") {
                if (computer.name == name) {
                    return true;
                }
            }
        }
        return false;
    };
    console.log("List of computers currently are ON: ");
    if (computers.showOnline() != -1) {
        var computerName = input.question("Computer's name: ");
        while (!checkInOnList(computerName)) {
            console.log("Wrong input, please enter a again.");
            computerName = input.question("Computer's name: ");
        }
        var index = computers.findByName(computerName);
        computers.list[index].status = "OFF";
        computers.list[index].time.endTime = Date.now();
        var usedTime = Math.round((computers.list[index].time.endTime - computers.list[index].time.startTime) / 1000);
        var totalPrice = 0;
        var timePrice = usedTime * price.hourlyRate;
        var servicePrice = 0;
        console.log("Computer is used for ".concat(usedTime, " seconds. Price: $").concat(timePrice));
        for (var _i = 0, _a = computers.list[index].service; _i < _a.length; _i++) {
            var element = _a[_i];
            if (element.name == "Water") {
                console.log("Customer bought ".concat(element.quantity, " of ").concat(element.name, ". Price: $").concat(element.quantity * price.water));
                servicePrice += element.quantity * price.water;
            }
            if (element.name == "Coke") {
                console.log("Customer bought ".concat(element.quantity, " of ").concat(element.name, ". Price: $").concat(element.quantity * price.coke));
                servicePrice += element.quantity * price.coke;
            }
            if (element.name == "Bread") {
                console.log("Customer bought ".concat(element.quantity, " of ").concat(element.name, ". Price: $").concat(element.quantity * price.bread));
                servicePrice += element.quantity * price.bread;
            }
            if (element.name == "Cigarette") {
                console.log("Customer bought ".concat(element.quantity, " of ").concat(element.name, ". Price: $").concat(element.quantity * price.cigarette));
                servicePrice += element.quantity * price.cigarette;
            }
        }
        totalPrice = timePrice + servicePrice;
        console.log("Total price customer has to pay is: $".concat(totalPrice));
        dailyIncome.income += totalPrice;
    }
};
var deleteComputer = function () {
    console.log("List computer at the moment: ");
    computers.showAll();
    console.log("Which one do you want to delete?");
    var option = input.question("Computer's name: ");
    while (computers.findByName(option) == -1) {
        console.log("Wrong input, please do it again.");
        option = input.question("Computer's name: ");
    }
    computers["delete"](option);
};
var addService = function () {
    var checkInOnList = function (name) {
        for (var _i = 0, _a = computers.list; _i < _a.length; _i++) {
            var computer = _a[_i];
            if (computer.status == "ON") {
                if (computer.name == name) {
                    return true;
                }
            }
        }
        return false;
    };
    console.log("List of computers currently are ON: ");
    if (computers.showOnline() != -1) {
        var computerName = input.question("Computer's name to add service: ");
        while (!checkInOnList(computerName)) {
            console.log("Wrong input, please enter a again.");
            computerName = input.question("Computer's name: ");
        }
        var index = computers.findByName(computerName);
        var menu = "---------Food & Drink----------\n" +
            "1.Water_____________________$2\n" +
            "2.Coke______________________$3\n" +
            "3.Bread_____________________$5\n" +
            "4.Cigarette_________________$10\n" +
            "0.Exit";
        var list = ["Water", "Coke", "Bread", "Cigarette"];
        console.log("-----------------------------");
        console.log(menu);
        console.log("-----------------------------");
        var option = +input.question("Option: ");
        while (!([0, 1, 2, 3, 4].includes(option))) {
            console.log("Wrong input, please do it again.");
            console.log("-----------------------------");
            console.log(menu);
            console.log("-----------------------------");
            option = +input.question("Option: ");
        }
        var quantity = void 0;
        if (option != 0) {
            quantity = +input.question("How many of ".concat(list[option - 1], " would customer like: "));
        }
        console.log("Customer on ".concat(computers.list[index].name, " bought ").concat(quantity, " of ").concat(list[option - 1]));
        var service = new service_1.Service(list[option - 1], quantity);
        computers.list[index].service.push(service);
    }
};
var changeRate = function () {
    console.log("The current hourly rate is: ".concat(price.hourlyRate));
    var newRate = +input.question("Enter new rate: ");
    price.hourlyRate = newRate;
    console.log("Hourly price is updated!");
};
var showTodayIncome = function () {
    console.log("Today income at the moment is: ");
    console.log("".concat(dailyIncome.date, " - $").concat(dailyIncome.income));
};
var showHistoryIncome = function () {
    var data = fs.readFileSync('/Users/macos/WebstormProjects/Advance-Javascript/CaseStudy/income.txt', { encoding: 'utf8', flag: 'r' });
    console.log("----------Show History----------\n" +
        "1.Show All History\n" +
        "2.Show by date \n" +
        "Any another key to exit.\n" +
        "-----------------------------");
    var option = +input.question("Option: ");
    if (option == 1) {
        console.log("-----------------------------");
        console.log("All history income: ");
        console.log(data);
        console.log("-----------------------------");
    }
    if (option == 2) {
        var listData_1 = data.split("\n");
        var checkValidDate = function (date) {
            for (var _i = 0, listData_2 = listData_1; _i < listData_2.length; _i++) {
                var element = listData_2[_i];
                if (element.slice(0, 10) == date) {
                    return true;
                }
            }
            return false;
        };
        var findIndexByDate = function (date) {
            for (var i = 0; i < listData_1.length; i++) {
                if (listData_1[i].slice(0, 10) == date) {
                    return i;
                }
            }
        };
        var firstDay = listData_1[0].split(" ")[0];
        var lastDay = listData_1.at(-1).split(" ")[0];
        console.log("History income start from: ".concat(firstDay, " to ").concat(lastDay, "."));
        var dateOfChecking = input.question("Enter the day would you like to check with format like dd-mm-yyyy: ");
        while (!checkValidDate(dateOfChecking)) {
            console.log("Wrong input, please do it again.");
            dateOfChecking = input.question("Enter the day would you like to check with format like dd-mm-yyyy: ");
        }
        var index = findIndexByDate(dateOfChecking);
        console.log("-----------------------------");
        console.log("Income: ".concat(listData_1[index]));
        console.log("-----------------------------");
    }
};
var mainAdmin = function () {
    loginAdmin();
    var option;
    do {
        console.log(adminMenu);
        option = +input.question("Option: ");
        switch (option) {
            case 1:
                showComputer();
                break;
            case 2:
                addComputer();
                break;
            case 3:
                turnOnComputer();
                break;
            case 4:
                turnOffComputer();
                break;
            case 5:
                deleteComputer();
                break;
            case 6:
                addService();
                break;
            case 7:
                changeRate();
                break;
            case 8:
                showTodayIncome();
                break;
            case 9:
                showHistoryIncome();
                break;
            case 0:
                break;
            default:
                console.log("Wrong input. Please do it again.");
                break;
        }
    } while (option != 0);
};
var mainUser = function () {
    var checkExistName = function (name) {
        for (var _i = 0, _a = userAccounts.list; _i < _a.length; _i++) {
            var element = _a[_i];
            if (element.name == name) {
                return true;
            }
        }
        return false;
    };
    var checkValidAccount = function (name, password) {
        for (var _i = 0, _a = userAccounts.list; _i < _a.length; _i++) {
            var element = _a[_i];
            if (element.name == name && element.password == password) {
                return true;
            }
        }
        return false;
    };
    var register = function () {
        console.log("Username has to have more then 3 characters and start with a letter.");
        var username = input.question("username: ");
        while ((!regex.validName(username)) || checkExistName(username)) {
            if (!regex.validName(username)) {
                console.log("Username has to have more then 3 characters and start with a letter.");
                username = input.question("username: ");
            }
            else if (checkExistName(username)) {
                console.log("This username is used.");
                username = input.question("username: ");
            }
        }
        console.log("Password has to have more then 5 characters.");
        var password = input.question("password: ");
        while (!regex.validPassword(password)) {
            console.log("Password has to have more then 5 characters.");
            password = input.question("password: ");
        }
        console.log("Register successfully!!!");
        var account = new userAccount_1.UserAccount(username, password);
        userAccounts.add(account);
    };
    var login = function () {
        console.log("Please enter username and password: ");
        var username = input.question("Username: ");
        while (!regex.validName(username)) {
            console.log("Username has to have more then 3 characters and start with a letter.");
            username = input.question("username: ");
        }
        var password = input.question("Password: ");
        while (!regex.validPassword(password)) {
            console.log("Password has to have more then 5 characters.");
            password = input.question("password: ");
        }
        if (!checkValidAccount(username, password)) {
            console.log("Wrong username or password.");
        }
        else {
            var user = function () {
                var checkAccount = function () {
                    userAccounts.checkAccount(username);
                };
                var topUp = function () {
                    var regex = /^\d+$/;
                    console.log("Enter amount you want to top up");
                    var amount = input.question("Amount: ");
                    if (!regex.test(amount)) {
                        console.log("Wrong input, please do it again.");
                        amount = +input.question("Amount: ");
                    }
                    userAccounts.topUp(username, Number(amount));
                };
                var option;
                do {
                    console.log(userMenu);
                    option = +input.question("Option: ");
                    switch (option) {
                        case 1:
                            checkAccount();
                            break;
                        case 2:
                            topUp();
                            break;
                        case 3:
                            turnOnComputer();
                            break;
                        case 4:
                            break;
                        case 0:
                            break;
                        default:
                            console.log("Wrong input, please do it again.");
                            break;
                    }
                } while (option != 0);
            };
            user();
        }
    };
    var option;
    do {
        console.log("-------Login or Register-------\n" +
            "1.Login\n" +
            "2.Register\n" +
            "0.Exit\n" +
            "------------------------------");
        option = +input.question("Option: ");
        switch (option) {
            case 1:
                login();
                break;
            case 2:
                register();
                break;
            case 0:
                break;
            default:
                console.log("Wrong input. Please do it again.");
        }
    } while (option != 0);
};
var main = function () {
    var option;
    do {
        console.log(mainMenu);
        option = +input.question("Option: ");
        switch (option) {
            case 1:
                mainAdmin();
                break;
            case 2:
                mainUser();
                break;
            case 0:
                break;
            default:
                console.log("Wrong input. Please do it again.");
        }
    } while (option != 0);
};
main();
