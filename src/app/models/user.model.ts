export class User{
    constructor(_id = "", name = "", lastname = "", card = "", email = "", password = ""){
        this._id = _id;
        this.name = name;
        this.lastname = lastname;
        this.card = card;
        this.email = email;
        this.password = password;
    }
    _id : string;
    name : string;
    lastname : string;
    card : string;
    email : string;
    password : string;
}