import "dotenv/config";

import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import generateInterviewReport from "./src/services/ai.service.js";

import {
  resume,
  selfDescription,
  jobDescription,
} from "./src/services/temp.js";

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

generateInterviewReport(resume, selfDescription, jobDescription);
