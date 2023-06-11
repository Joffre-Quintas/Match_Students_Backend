import User from '../../models/UserModel';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function verifyExist(prop: any) {
    const exist = await User.findOne(prop);
    return exist;
}