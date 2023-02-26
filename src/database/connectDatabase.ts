import mongoose from "mongoose";
import createDebug from "debug";

const debug = createDebug("database");

export const connectDatabase = async (url: string) => {
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(url);

    debug("Connected to database");
  } catch (error) {
    debug(error);
  }
};

export default connectDatabase;
