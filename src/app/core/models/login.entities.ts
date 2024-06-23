export class LogIn {
    private _username?: string | undefined;
    private _password?: string | undefined;

    constructor(
        username?: string,
        password?: string
    ) {
        this._username = username;
        this._password = password;
    }
    
    public get username(): string | undefined {
        return this._username;
    }
    public get password(): string | undefined {
        return this._password;
    }
}