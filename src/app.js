import express from "express";
import router from "./routes/bancoestebanquito.routes.js";
import cors from 'cors'
const app = express();

app.set('port',3001);
app.use(cors())
app.use(express.json())
//Routes
app.use(router)

export default app;