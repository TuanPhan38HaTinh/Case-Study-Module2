import {UserAccount} from "../model/userAccount";

export class UserAccountManagement {

    list: UserAccount[] = [];

    add(data: UserAccount) {
        this.list.push(data);
    }

    findByUsername(name: string) {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].name == name) {
                return i;
            }
        }
        return -1;
    }

    checkAccount(name: string) {
        let index = this.findByUsername(name);
        console.log(`You have $${this.list[index].amount} in your account.`)
    }

    topUp(name: string, amount: number) {
        let index = this.findByUsername(name);
        this.list[index].amount += amount;
    }

}