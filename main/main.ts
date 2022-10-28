import {Price} from "../model/price";
import {Time} from "../model/time";
import {Service} from "../model/service";
import {Computer} from "../model/computer";
import {Management} from "../service/management";
import {ComputerManagement} from "../service/computerManagement";
import {DailyIncome} from "../model/dailyIncome";
import {UserAccount} from "../model/userAccount";
import {UserAccountManagement} from "../service/userAccountManagement";
import {Regex} from "../regex";

const mainMenu = "-----------Main Menu----------\n" +
    "1.For admin.\n" +
    "2.For user.\n" +
    "0.Exit\n" +
    "------------------------------"

const adminMenu = "----------Admin Menu----------\n" +
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

const userMenu = "-----------Main Menu----------\n" +
    "1.Check Account\n" +
    "2.Top up money\n" +
    "3.Turn on a computer\n" +
    "4.Order service\n" +
    "0.Turn off a computer\n" +
    "------------------------------"

let input = require("readline-sync");
let currentDate = new Date();
const fs = require('fs');

let computers = new ComputerManagement();
let price = new Price();
let userAccounts = new UserAccountManagement();
let regex = new Regex();
let dailyIncome = new DailyIncome();
dailyIncome.date = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

const loginAdmin = () => {
    console.log("Please enter username and password to login.");
    let adminName = input.question("Username: ");
    let adminPassword = input.question("Password: ");
    while (adminName != "admin" || adminPassword != "123456") {
        console.log("Wrong username or password. Please login again.")
        adminName = input.question("Username: ");
        adminPassword = input.question("Password: ");
    }
    console.log("Login successfully!")
}

const showComputer = () => {
    const showMenu = "----------Show Menu-----------\n" +
        "1.Show all computers.\n" +
        "2.Show all ON computers.\n" +
        "3.Show all OFF computers.\n" +
        "4.Show computer by name.\n" +
        "0.Exit \n" +
        "-----------------------------";
    let showOption;
    do{
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
                let computerName = input.question("Enter the name of computer: ");
                while (computers.findByName(computerName) == -1) {
                    console.log("Wrong input, please do it again.");
                    computerName = input.question("Enter the name of computer: ");
                }
                computers.showByName(computerName);
                break;
            case 0:
                break;
            default:
                console.log("Wrong input. Please do it again.")
                break;
        }
    }while (showOption != 0);
}

const addComputer = () => {
    const checkValidName = (name) => {
        for (const computer of computers.list) {
            if(name == computer.name) {
                return false;
            }
        }
        return true;
    }
    let computerName = input.question("Enter computer name: ");
    while (!checkValidName(computerName)) {
        console.log("The name already exist. Please enter another name.");
        computerName = input.question("Enter computer name: ");
    }

    let addComputer = new Computer(computerName, "OFF");
    computers.add(addComputer);
    console.log(`Adding ${computerName} successfully!`)

}

const turnOnComputer = () => {
    const checkInOffList = (name) =>{
        for (const computer of computers.list) {
            if(computer.status == "OFF"){
                if(computer.name == name) {
                    return true;
                }
            }
        }
        return false;
    }
    console.log("List of computers currently are OFF: ");
    if (!computers.showOffline()) {
        console.log("Chose the computer do you want to turn ON: ");
        let computerName = input.question("Computer's name: ");
        while (!checkInOffList(computerName)) {
            console.log("Wrong input, please enter a again.");
            computerName = input.question("Computer's name: ");
        }
        let index = computers.findByName(computerName);
        computers.list[index].status = "ON";
        computers.list[index].time.startTime = Date.now();
    }
}

const turnOffComputer = () => {
    const checkInOnList = (name) =>{
        for (const computer of computers.list) {
            if(computer.status == "ON"){
                if(computer.name == name) {
                    return true;
                }
            }
        }
        return false;
    }
    console.log("List of computers currently are ON: ");
    if(computers.showOnline() != -1) {
        let computerName = input.question("Computer's name: ");
        while (!checkInOnList(computerName)) {
            console.log("Wrong input, please enter a again.");
            computerName = input.question("Computer's name: ");
        }
        let index = computers.findByName(computerName);
        computers.list[index].status = "OFF";
        computers.list[index].time.endTime = Date.now();
        let usedTime = Math.round((computers.list[index].time.endTime - computers.list[index].time.startTime)/1000);

        let totalPrice = 0;
        let timePrice = usedTime * price.hourlyRate;
        let servicePrice = 0;
        console.log(`Computer is used for ${usedTime} seconds. Price: $${timePrice}`)
        for (const element of computers.list[index].service) {
            if (element.name == "Water") {
                console.log(`Customer bought ${element.quantity} of ${element.name}. Price: $${element.quantity * price.water}`);
                servicePrice += element.quantity * price.water;
            }
            if (element.name == "Coke") {
                console.log(`Customer bought ${element.quantity} of ${element.name}. Price: $${element.quantity * price.coke}`);
                servicePrice += element.quantity * price.coke;
            }
            if (element.name == "Bread") {
                console.log(`Customer bought ${element.quantity} of ${element.name}. Price: $${element.quantity * price.bread}`);
                servicePrice += element.quantity * price.bread;
            }
            if (element.name == "Cigarette") {
                console.log(`Customer bought ${element.quantity} of ${element.name}. Price: $${element.quantity * price.cigarette}`);
                servicePrice += element.quantity * price.cigarette;
            }
        }
        totalPrice = timePrice + servicePrice;
        console.log(`Total price customer has to pay is: $${totalPrice}`);
        dailyIncome.income += totalPrice;
    }
}

const deleteComputer = () => {
    console.log("List computer at the moment: ");
    computers.showAll();
    console.log("Which one do you want to delete?");
    let option = input.question("Computer's name: ");
    while (computers.findByName(option) == -1) {
        console.log("Wrong input, please do it again.");
        option = input.question("Computer's name: ");
    }
    computers.delete(option);
}

const addService = () => {
    const checkInOnList = (name) =>{
        for (const computer of computers.list) {
            if(computer.status == "ON"){
                if(computer.name == name) {
                    return true;
                }
            }
        }
        return false;
    }
    console.log("List of computers currently are ON: ");
    if (computers.showOnline() != -1) {
        let computerName = input.question("Computer's name to add service: ");
        while (!checkInOnList(computerName)) {
            console.log("Wrong input, please enter a again.");
            computerName = input.question("Computer's name: ");
        }
        let index = computers.findByName(computerName);

        const menu = "---------Food & Drink----------\n" +
            "1.Water_____________________$2\n" +
            "2.Coke______________________$3\n" +
            "3.Bread_____________________$5\n" +
            "4.Cigarette_________________$10\n" +
            "0.Exit";
        let list = ["Water", "Coke", "Bread", "Cigarette"];
        console.log("-----------------------------");
        console.log(menu);
        console.log("-----------------------------");
        let option = +input.question("Option: ");
        while (!([0, 1, 2, 3, 4].includes(option))) {
            console.log("Wrong input, please do it again.")
            console.log("-----------------------------");
            console.log(menu);
            console.log("-----------------------------");
            option = +input.question("Option: ");
        }
        let quantity;
        if (option != 0) {
            quantity = +input.question(`How many of ${list[option - 1]} would customer like: `)
        }
        console.log(`Customer on ${computers.list[index].name} bought ${quantity} of ${list[option - 1]}`);
        let service = new Service(list[option-1], quantity);
        computers.list[index].service.push(service);
    }
}

const changeRate = () => {
    console.log(`The current hourly rate is: ${price.hourlyRate}`);
    let newRate = +input.question("Enter new rate: ");
    price.hourlyRate = newRate;
    console.log("Hourly price is updated!");
}

const showTodayIncome = () => {
    console.log("Today income at the moment is: ");
    console.log(`${dailyIncome.date} - $${dailyIncome.income}`);
}

const showHistoryIncome = () => {
    let data = fs.readFileSync('/Users/macos/WebstormProjects/Advance-Javascript/CaseStudy/income.txt',
        {encoding:'utf8', flag:'r'});
    console.log("----------Show History----------\n" +
        "1.Show All History\n" +
        "2.Show by date \n" +
        "Any another key to exit.\n" +
        "-----------------------------")
    let option = +input.question("Option: ");
    if (option == 1) {
        console.log("-----------------------------");
        console.log("All history income: ");
        console.log(data);
        console.log("-----------------------------");
    }
    if (option == 2) {
        let listData = data.split("\n");

        const checkValidDate = (date) => {
            for (const element of listData) {
                if(element.slice(0, 10) == date) {
                    return true;
                }
            }
            return false;
        }

        const findIndexByDate = (date) => {
            for (let i = 0; i < listData.length; i++) {
                if(listData[i].slice(0, 10) == date) {
                    return i;
                }
            }
        }

        let firstDay = listData[0].split(" ")[0];
        let lastDay = listData.at(-1).split(" ")[0];
        console.log(`History income start from: ${firstDay} to ${lastDay}.`);
        let dateOfChecking = input.question("Enter the day would you like to check with format like dd-mm-yyyy: ");
        while (!checkValidDate(dateOfChecking)) {
            console.log("Wrong input, please do it again.");
            dateOfChecking = input.question("Enter the day would you like to check with format like dd-mm-yyyy: ");
        }

        let index = findIndexByDate(dateOfChecking);
        console.log("-----------------------------");
        console.log(`Income: ${listData[index]}`);
        console.log("-----------------------------");
    }
}

const mainAdmin = () => {
    loginAdmin();
    let option;
    do{
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
                console.log("Wrong input. Please do it again.")
                break;
        }
    }while (option != 0)

}

const mainUser = () => {

    const checkExistName = (name) => {
        for (const element of userAccounts.list) {
            if (element.name == name) {
                return true;
            }
        }
        return false;
    }

    const checkValidAccount = (name, password) => {
        for (const element of userAccounts.list) {
            if (element.name == name && element.password == password) {
                return true;
            }
        }
        return false;
    }

    const register = () => {
        console.log("Username has to have more then 3 characters and start with a letter.");
        let username = input.question("username: ");
        while ((!regex.validName(username)) || checkExistName(username)) {
            if(!regex.validName(username)) {
                console.log("Username has to have more then 3 characters and start with a letter.");
                username = input.question("username: ");
            } else if (checkExistName(username)){
                console.log("This username is used.");
                username = input.question("username: ");
            }

        }
        console.log("Password has to have more then 5 characters.");
        let password = input.question("password: ");
        while (!regex.validPassword(password)) {
            console.log("Password has to have more then 5 characters.");
            password = input.question("password: ");
        }
        console.log("Register successfully!!!");
        let account = new UserAccount(username, password);
        userAccounts.add(account);
    }

    const login = () => {

        console.log("Please enter username and password: ");
        let username = input.question("Username: ");
        while (!regex.validName(username)) {
            console.log("Username has to have more then 3 characters and start with a letter.");
            username = input.question("username: ");
        }
        let password = input.question("Password: ");
        while (!regex.validPassword(password)) {
            console.log("Password has to have more then 5 characters.");
            password = input.question("password: ");
        }

        if (!checkValidAccount(username, password)) {
            console.log("Wrong username or password.")
        } else {
            const user = () => {

                const checkAccount = () => {
                    userAccounts.checkAccount(username);
                }

                const topUp = () => {
                    let regex = /^\d+$/
                    console.log("Enter amount you want to top up");
                    let amount = input.question("Amount: ");
                    if (!regex.test(amount)) {
                        console.log("Wrong input, please do it again.");
                        amount = +input.question("Amount: ");
                    }
                    userAccounts.topUp(username, Number(amount));
                }

                let option;
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
                            console.log("Wrong input, please do it again.")
                            break;
                    }
                } while (option != 0)
            }
            user();
        }
    }

    let option;
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
                console.log("Wrong input. Please do it again.")
        }
    }while (option != 0)
}

const main = () => {
    let option;
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
                console.log("Wrong input. Please do it again.")
        }
    } while (option != 0);

}

main();