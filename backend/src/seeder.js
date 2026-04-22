import mongoose from "mongoose";

import env from "./config/env.js";
import { connectDB } from "./config/db.js";
import sampleMovies from "./data/sampleMovies.js";
import sampleUsers from "./data/sampleUser.js";
import Movie from "./models/Movie.js";
import User from "./models/user.js";

const importData = async () => {
  await Movie.deleteMany();
  await Movie.insertMany(sampleMovies);
  console.log("Sample movie data imported");

  await User.deleteMany();
  await User.insertMany(sampleUsers);
  console.log("Sample user data imported");
};

const destroyData = async () => {
  await Movie.deleteMany();

  await User.deleteMany();
  console.log("Movie and user data cleared");
};

const runSeeder = async () => {
  try {
    await connectDB(env.mongoUri);

    if (process.argv[2] === "-i") {
      await importData();
    } else if (process.argv[2] === "-d") {
      await destroyData();
    } else {
      console.log("Use -i to import sample data or -d to destroy data");
    }
  } catch (error) {
    console.error("Seeder failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

runSeeder();
