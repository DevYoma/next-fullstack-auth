import mongoose from 'mongoose';

// this connect() has to appear anywhere you want to talk to the db 
// needs to be called on every api call => it is an edge function 🤔
export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running ' + err);
            process.exit();
        })
    } catch (error) {
        console.log('Something went wrong');
        console.log(error);
    }
}