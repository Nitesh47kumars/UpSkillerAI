import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
    console.log("Connecting Database...");
  } catch (err) {
    console.log("Connection Failed! Message:", err);
    process.exit(1);
  }
};

export default connectDB;
