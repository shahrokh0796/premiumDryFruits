import cors from "cors";

const allowedOrigins = [
    "http://localhost:3000",
    "localhost:3000"
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) ) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS Said"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true,
}

export default cors(corsOptions);