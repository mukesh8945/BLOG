import express from "express";
import cors from "cors";
import { dbConnect } from "./db/connectDb.js";
// import router from "./routes/router.js";
import bodyParser from "body-parser"
// import blogRouter from "./routes/blogRouter.js";
import router from "./routes/userRoute.js";
import blogRouter from "./routes/blogRoute.js";


const app = express();
app.use(cors())
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.urlencoded());
// app.use(express.json());

dbConnect();
app.use("/", router)
app.use('/', blogRouter)

app.get("/", (req, res) => {
    res.send("Welcome from server side");
})



app.listen(PORT, () => console.log(`server is running on http://localhost:8000`));