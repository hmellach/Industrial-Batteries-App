import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", router);

const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
