import express from "express";
import cors from "cors";
import rootRoute from "../routes/root";
import path from "path";
import corsOptions from "../config/cors"; 
const PORT = process.env.PORT || 5500;
const app = express();

// Allow requests
app.use(corsOptions);

// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets
app.use(express.static(path.join(__dirname, "../../frontend/dist"), { index: false }));

// Routes
app.use("/", rootRoute);



app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
});