import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
// Importing routes
import initRouter from "./routes/initRoutes.js";
import connectDatabase from "./config/databaseConfig.js";

async function startServer(){
    const app = express(); 
    const PORT = process.env.PORT || 3000;

    // Connecting to the database
    await connectDatabase(process.env.MONGO_URI);

    // Adding standard middlewares 
    app.use(express.json());
    app.use(helmet());
    app.use(cors());
    app.use(morgan('tiny'));

    // Adding routes middlewares
    app.use("/api", initRouter);

    app.listen(PORT, (request, response) => {
        console.info(`Running the server in the port ${PORT}`);
        console.log("\n ====================== Logging the request ======================");
    });
}

startServer();