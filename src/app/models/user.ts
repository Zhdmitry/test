export class User {
    constructor(
        public id: number,
        public login: string,

        public password: string,
        public email: string,
    ) {}

    public reset(){
        this.login="";
        this.password="";
        this.email="";
    }
}