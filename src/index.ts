import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import connectDB from './db';


dotenv.config();

const app = express();


app.use(express.json());


connectDB();


app.use('/api', router);

const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.json({
        message: 'Server image working',
        status: 'OK'
    });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);  
});
