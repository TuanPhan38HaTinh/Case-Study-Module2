export class Regex {

    private passwordRegex: RegExp = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    private nameRegex: RegExp = /^[a-zA-Z][a-zA-Z0-9!@#$%^&*]{2,16}$/

    public validPassword(regex: string): boolean {
        return this.passwordRegex.test(regex);
    }
    public validName(regex: string): boolean {
        return this.nameRegex.test(regex);
    }

}