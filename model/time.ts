export class Time{
    private _startTime: number;
    private _endTime: number;

    constructor(startTime: number, endTime: number) {
        this._startTime = startTime;
        this._endTime = endTime;
    }


    get startTime(): number {
        return this._startTime;
    }

    set startTime(value: number) {
        this._startTime = value;
    }

    get endTime(): number {
        return this._endTime;
    }

    set endTime(value: number) {
        this._endTime = value;
    }
}