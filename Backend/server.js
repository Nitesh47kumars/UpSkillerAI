import "dotenv/config";

import app from "./src/app.js";
import connectDB from "./src/config/database.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is Running on PORT: ${process.env.PORT}`);
    });

    app.on("error", (err) => {
      console.log(`MongoDB Server Error! Connection Failed: ${err}`);
    });
  })
  .catch((err) => {
    console.log(`Database Connection Failed! Message:`, err);
    process.exit(1);
  });