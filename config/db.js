import mongoose from "mongoose";

 const connect = async () => {
  try {
    const connectDB = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB is connected Sucessfully ${connectDB.connection.host}`.bgGreen.white
    );
  } catch (error) {
    console.log(`Error in MongoDB Connection ${error}`.bgRed.white);
  }
};

export default connect;