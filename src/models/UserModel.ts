import mongoose from 'mongoose';

const userModel = new mongoose.Schema({
    completeName: {type: String, required: true},
    registrationNumber: {type: String , required: true, unique: true},
    birthday: {type: Date, required: true},
    phone: {type: Number, required:true, unique: true},
    period: {type: Number, required: true},
    turn: {type: String, required: true },
    course:{type: String, required: true},
    knowledge: {type: String},
    isAvaliable: {type:Boolean, required: true},
    interest: String,
    email: {type: String, required: true, unique: true},
    password: {type: String , required: true},
    tutor: [String],
    student: [String],
    createdAt: {type: Date, default: Date.now},
    updatedAt: Date 
});

const User = mongoose.model('user',userModel);
export default User;