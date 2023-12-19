import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // mongodb connection string
        const con = await mongoose.connect(process.env.MONGO_URI, {
            // options to deal with deprecation warnings
            useNewUrlParser: true,
            useUnifiedTopology: true, 
        });

        console.log(`MongoDB connected: ${con.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // exit with failure
        process.exit(1);
    }
};