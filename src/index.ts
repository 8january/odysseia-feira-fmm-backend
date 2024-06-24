import express from "express";
import connectDB from "./config/db.config";
import UserModel from "./schemas/user";
import cors from 'cors'

const app = express();
app.use(cors({
  origin: 'https://5173-idx-odyssseia-feira-fmm-1719166910478.cluster-4xpux6pqdzhrktbhjf2cumyqtg.cloudworkstations.dev',
  credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  console.log("url:/")
  res.send("api running!");
})

app.post('/user', async (req, res) => {
  console.log('url:/user')
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }

})

app.get('/rank', async (req, res) => {
  console.log('/rank')
  try {
    const users = await UserModel.find().sort({ time: 1, correctAnswers: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error getting users" });
  }
})


const startDB = async () => {
  try {
    await connectDB("mongodb+srv://leonardobrandaoamarante:FeiraFMM@feira-fmm.x9idtqa.mongodb.net/?retryWrites=true&w=majority&appName=feira-fmm");
    console.log('Mongodb is connected!!!')
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    })
  } catch (error) {
    console.log(error);
  }
}

startDB();