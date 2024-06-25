export class LogIn {
    private username?: string | undefined;
    private password?: string | undefined;

    constructor(
        username?: string,
        password?: string
    ) {
        this.username = username;
        this.password = password;
    }
    
    public get getUsername(): string | undefined {
        return this.username;
    }
    public get getPassword(): string | undefined {
        return this.password;
    }
}