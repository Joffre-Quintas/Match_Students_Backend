export default interface IUser {
    _id?:string,
    completeName: string,
    registrationNumber: string,
    birthday: Date,
    phone: number,
    period: number,
    turn: number,
    course: number,
    knowledge: string,
    isAvaliable: boolean,
    interest: string,
    email: string,
    password: string,
    confirmPassword?: string,
    tutor?: string,
    student?: string
    updatedAt?: Date
}