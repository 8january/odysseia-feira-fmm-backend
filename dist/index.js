var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import connectDB from "./config/db_config.js";
import UserModel from "./schemas/user.js";
import cors from 'cors';
const app = express();
app.use(cors({
    origin: 'https://5173-idx-odysseia-feirafmm-1719276587146.cluster-m7tpz3bmgjgoqrktlvd4ykrc2m.cloudworkstations.dev',
    credentials: true, // Permite cookies e credenciais
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Permite esses métodos
    allowedHeaders: ["Content-Type", "Authorization"], // Permite esses cabeçalhos
}));
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 5000;
app.get('/', (req, res) => {
    console.log("GET /");
    res.send("api running!");
});
app.post('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('POST /user');
    try {
        console.log(req.body);
        const newUser = new UserModel(req.body);
        yield newUser.save();
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating user" });
    }
}));
app.get('/rank', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('POST /rank');
    try {
        const users = yield UserModel.find().sort({ time: 1, correctAnswers: -1 });
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Error getting users" });
    }
}));
const startDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectDB("mongodb+srv://leonardobrandaoamarante:FeiraFMM@feira-fmm.x9idtqa.mongodb.net/?retryWrites=true&w=majority&appName=feira-fmm");
        console.log('Mongodb is connected!!!');
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
startDB();
//# sourceMappingURL=index.js.map