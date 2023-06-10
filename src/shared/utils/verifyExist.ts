import User from '../../models/UserModel';

export default async function verifyExist(prop: any) {
    const exist = await User.findOne(prop);
    return exist;
}