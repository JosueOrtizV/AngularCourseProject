import mongoose from 'mongoose';
import dotenv from 'dotenv';
import serverless from 'serverless-http';
import app from './app.js';

dotenv.config();

let isConnected;

const connectToDatabase = async () => {
    if (isConnected) {
        console.log('Usando conexión existente a la base de datos.');
        return;
    }
    
    console.log('Creando nueva conexión a la base de datos...');
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    isConnected = mongoose.connection.readyState;
};

const handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    await connectToDatabase();
    return serverless(app)(event, context);
};

export { handler };
