import * as mongoose from 'mongoose';

export default async () => {
    try {
        const db = await mongoose.connect(process.env.DB_CNN_STRING || 'mongodb+srv://admin_user:ItlnqEdEdbiS7PQb@cluster0.pineioe.mongodb.net/culqui', {});
        console.log(`Mongo DB online to database ${db.connection.name}`)
    } catch (err) {
        console.log(err)
        throw new Error('Error en la conección de la db ')
    }
}