import {Management} from "./management";
import {Computer} from "../model/computer";

export class ComputerManagement implements Management<Computer>{
    list = [];
    constructor() {
        let computer1 = new Computer("Computer1", "OFF");
        let computer2 = new Computer("Computer2", "OFF");
        let computer3 = new Computer("Computer3", "OFF");
        let computer4 = new Computer("Computer4", "OFF");
        let computer5 = new Computer("Computer5", "OFF");
        let computer6 = new Computer("Computer6", "OFF");
        let computer7 = new Computer("Computer7", "OFF");
        let computer8 = new Computer("Computer8", "OFF");
        let computer9 = new Computer("Computer9", "OFF");
        let computer10 = new Computer("Computer10", "OFF");
        let computer11 = new Computer("Computer11", "OFF");
        let computer12 = new Computer("Computer12", "OFF");
        this.list.push(computer1,computer2,computer3,computer4,computer5,computer6,computer7,computer8,computer9,computer10,computer11,computer12);
    }

    add(data: Computer) {
        this.list.push(data);
    }

    delete(name: string) {
        let index = this.findByName(name);
        this.list.splice(index, 1);
    }

    edit(name: string, data: Computer) {
    }

    findByName(name: string) {
        for (let i = 0; i < this.list.length; i++) {
            if(this.list[i].name == name) {
                return i;
            }
        }
        return -1;
    }

    showAll() {
        let count = 0;
        console.log("-----------------------------");
        for (const element of this.list) {
            console.log(`${count + 1}.${element.name} is ${element.status}`);
            count++;
        }
        console.log("-----------------------------");
    }

    showOnline() {
        console.log("-----------------------------");
        let count = 0;
        for (const element of this.list) {
            if(element.status == "ON") {
                console.log(`${count + 1}.${element.name} is ${element.status}`);
                count ++;
            }
        }
        if(count == 0) {
            console.log("There is no computer is ON.")
            return -1;
        }
        console.log("-----------------------------");
    }

    showOffline() {
        console.log("-----------------------------");
        let count = 0;
        for (const element of this.list) {
            if(element.status == "OFF") {
                console.log(`${count + 1}.${element.name} is ${element.status}`);
                count ++;
            }
        }
        if(count == 0) {
            console.log("There is no computer OFF");
            return -1;
        }
        console.log("-----------------------------");
    }

    showByName(name: string) {
        console.log("-----------------------------");
        let index = this.findByName(name);
        if(index == -1) {
            console.log(`There is no computer with the name of ${name}`);
        }else {
            console.log(`${this.list[index].name} is ${this.list[index].status}`);
            this.list[index].time.endTime = Date.now();
            if (this.list[index].status == "ON") {
                let usedTime = Math.round((this.list[index].time.endTime - this.list[index].time.startTime)/1000);
                console.log(`total time using is: ${usedTime} seconds.`);
            }
            if (this.list[index].service.length != 0) {
                console.log("Additional items:")
            }
            for (const element of this.list[index].service) {
                console.log(`  -${element.quantity} of ${element.name}`);
            }
        }
        console.log("-----------------------------");
    }

}