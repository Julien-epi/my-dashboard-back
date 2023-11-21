// db.ts
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://127.0.0.1:27017/my-dashboard';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
};

export default connectDB;