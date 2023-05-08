import mongoose from "mongoose";

/* Connect to MongoDB and Mongoose Setup */
export const connectDB = (url) => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected..."))
    .catch((error) => console.log(error));
};