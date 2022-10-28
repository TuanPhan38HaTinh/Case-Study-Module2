export class UserAccount {
    private _name: string;
    private _password: string;
    amount: number = 0;

    constructor(name: string, password: string) {
        this._name = name;
        this._password = password;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }
}