import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from "body-parser";
import MongoStore from 'connect-mongo';
import authRoutes from "./routes/authRoutes";
import documentRoutes from "./routes/documentRoutes";
import aiRoutes from "./routes/aiRoutes";
import chatRoutes from "./routes/chatRoutes";
import articleRoutes from "./routes/articleRoutes";
import passport from "passport";
import "./middlewares/googleAuthenticationMiddleware";
import "./middlewares/microsoftAuthenticationMiddleware";
import session from "express-session";
import errorHandler from "./utils/errorHandler";
import cookieParser from "cookie-parser";
import path from "path";


dotenv.config();
const mongoURI = (process.env.NODE_ENV === "production") ? process.env.MONGODB_URI_UAT! : process.env.MONGO_URI!;

const app = express();

// const corsOptions = {
//   origin: 'http://localhost:5173',  // Your React app's URL
//   credentials: true,  // Allow cookies to be sent with requests
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
// };
// // Middleware
app.use(cors());


app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    resave: false,
    secret: "test-scret-key-placeholder",
    cookie: {
      secure: true,
    },
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: mongoURI,
      collectionName: 'sessions',
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/testing",
  (req, res) => {
    res.send("Testing - Welcome to the API");
  }
);

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/articles", articleRoutes);

// Serve frontend on any non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.use(errorHandler);


// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
