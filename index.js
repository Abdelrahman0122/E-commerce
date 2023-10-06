import express from 'express';
import { dbConnection } from './DB/Connection.js';
import { bootstrap } from './src/bootstrap.js'; 
import dotenv from "dotenv"
import morgan from 'morgan';
import cors from 'cors'

dotenv.config()


const app = express();
const port = 3000
app.use(cors())

app.use(express.json());
app.use(morgan('dev'));
bootstrap(app); 
dbConnection()
app.listen(process.env.PORT || port, () => { console.log(`Example app listening at http://localhost:${port}`)
}) 