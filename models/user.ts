export type User = {
    id: number;
    firstName: string;
    lastName: string;
    maidenName:string;
    age:number;
    gender: 'male'|'female';
    image: string;
    email: string;
    phone: string;
}