import mongoose from "mongoose";
mongoose.set("strictQuery", true);


const connectToMongo = async () => {
 try {
    await mongoose.connect(process.env.MONGO_URI as string);
      console.log(" Successfully connected with database ");
    }catch(error)  {
      console.error("Invalid credentials ", error);
    }
};
export default connectToMongo;