import mongoose from 'mongoose';
import 'dotenv/config';

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

export default async function startDB() {
    try {
        await mongoose.connect(`mongodb+srv://${user}:${password}@joffre.ckgez7n.mongodb.net/`);
        console.log('Banco conectado!');       
    } catch (err) {
        console.error(err);
    }
}

