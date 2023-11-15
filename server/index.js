import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from "morgan";

import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import monitoringRoutes from './routes/monitoring.js';
import managementRoutes from './routes/management.js';

//Data Imports
import User from "./models/User.js";
import Service from "./models/Services.js";
import ServiceStat from "./models/ServiceStat.js";
import { dataUser,dataService, dataServiceStat  } from "./data/index.js";

/**CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

/** ROUTES */
app.use("/general", generalRoutes); 
app.use("/client", clientRoutes);/**Has Services, Workers, Geography */
app.use("/monitoring", monitoringRoutes);/**(INSTD OF SALES)Has Shift Scheduling, Emergency Response, Incident Reporting */
app.use("/management", managementRoutes);/**Admin, Performance */

/**MONGOOSE SETUP */
const PORT=process.env.PORT || 9001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser : true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    //Service.insertMany(dataService);
    //Only add data once
    //User.insertMany(dataUser);
})
.catch((error) => console.log(`${error} did not connect`));

