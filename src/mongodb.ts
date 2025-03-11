import mongoose from "mongoose";
import "dotenv/config";

export default async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_CONN_STRING!);
  } catch (e) {
    console.log(e);
  }
}
