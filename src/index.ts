import express from "express";
import profilesRouter from "./routes";
import connectToDatabase from "./mongodb";

const app = express();
app.use(express.json());

app.use("/profiles", profilesRouter);

connectToDatabase().then(() => {
  app.listen(3000, () => {
    console.log("The application is listening on port 3000!");
  });
});
