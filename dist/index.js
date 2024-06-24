"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_config_1 = __importDefault(require("./config/db.config"));
const user_1 = __importDefault(require("./schemas/user"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'https://5173-idx-odyssseia-feira-fmm-1719166910478.cluster-4xpux6pqdzhrktbhjf2cumyqtg.cloudworkstations.dev',
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const port = process.env.PORT || 5000;
app.get('/', (req, res) => {
    console.log("url:/");
    res.send("api running!");
});
app.post('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('url:/user');
    try {
        const newUser = new user_1.default(req.body);
        yield newUser.save();
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating user" });
    }
}));
app.get('/rank', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('/rank');
    try {
        const users = yield user_1.default.find().sort({ time: 1, correctAnswers: -1 });
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Error getting users" });
    }
}));
const startDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_config_1.default)("mongodb+srv://leonardobrandaoamarante:FeiraFMM@feira-fmm.x9idtqa.mongodb.net/?retryWrites=true&w=majority&appName=feira-fmm");
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