import express from "express";
import connectDB from "./config/db_config.js";
import UserModel from "./schemas/user.js";
import cors from 'cors'
import 'dotenv/config'

const app = express();
app.use(cors({
  origin: ['https://5173-idx-odysseia-feirafmm-1719276587146.cluster-m7tpz3bmgjgoqrktlvd4ykrc2m.cloudworkstations.dev',
    "https://odysseia-feirafmm.vercel.app"],
  credentials: true, // Permite cookies e credenciais
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Permite esses métodos
  allowedHeaders: ["Content-Type", "Authorization"], // Permite esses cabeçalhos
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  console.log("GET /");
  res.send("api running!");
})

app.post('/user', async (req, res) => {
  console.log('POST /user');
  try {
    console.log(req.body)
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }

})

app.get('/rank', async (req, res) => {
  console.log('GET /rank');
  try {
    const users = await UserModel.find().sort({ time: 1, correctAnswers: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error getting users" });
  }
})


const startDB = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    console.log('Mongodb is connected!!!')
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    })
  } catch (error) {
    console.log(error);
  }
}

startDB();
