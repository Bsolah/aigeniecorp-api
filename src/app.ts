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
import folderRoutes from "./routes/folderRoutes";
import externalIntegrationRoutes from "./routes/externalIntegrationRoutes";
import passport from "passport";
import "./middlewares/googleAuthenticationMiddleware";
import "./middlewares/microsoftAuthenticationMiddleware";
import session from "express-session";
import errorHandler from "./utils/errorHandler";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();
// (process.env.NODE_ENV === "production") ? process.env.MONGODB_URI_UAT! :
const mongoURI = process.env.MONGODB_URI_UAT!;

const app = express();

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(
  session({
    resave: false,
    secret: "test-scret-key-placeholder",
    cookie: {
      secure: true,
    },
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: mongoURI,
      // collectionName: 'sessions',
      ttl: 14 * 24 * 60 * 60,
    }),
  })
);

const corsOptions = {
  origin: ["https://aigeniecorp-app.vercel.app", "localhost:5173"], // Your React apps URL
  credentials: true, // Allow cookies to be sent with requests
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
};
// Middleware
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/testing", (req, res) => {
  res.send("Testing - Welcome to the API");
});

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/external-integrations", externalIntegrationRoutes);

// Serve frontend on any non-API routes
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });


app.use(errorHandler);

console.log('App environment:', process.env.NODE_ENV); // Should be 'production'
console.log('App environment:', process.env.PORT); 


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
