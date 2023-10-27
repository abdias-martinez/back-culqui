import * as mongoose from 'mongoose';

let conn = null;

const connectDatabase = async ()=> {
    if (conn = null) {
        console.log('creating database...');
        conn = await mongoose.connect(process.env.DB || '',  {
            serverSelectionTimeoutMS: 5000,
        });
        return conn;
    }

    console.log('Connection already');
}

export default  connectDatabase;