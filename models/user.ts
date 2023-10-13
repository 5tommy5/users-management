export default class User {
    public id: number;
    public firstName: string;
    public lastName: string;
    public maidenName:string;
    public age:number;
    public gender: Gender;
    public image: string;

}

export enum Gender{
    male = "male", 
    female = "female"
}