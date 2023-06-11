import bcrypt from 'bcrypt';

export default async function cryptPassword(obj: object, password: string) {
    const passwordHashed = await bcrypt.hash(password,10);
    const newObj = {
        ...obj,
        password: passwordHashed
    }
    return newObj
}