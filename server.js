import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import travelRoutes from './routes/travel.routes.js';
import { config } from './config/env.js';
const app = express();

app.use(express.json());
app.use(cors());

app.use('/travels', travelRoutes);

app.get('/', (req, res) => {
    res.json({message: 'Backend running'})
})

const startServer = async () => {
    try {
        await connectDB();

        app.listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

startServer();