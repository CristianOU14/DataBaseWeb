import express from "express";
import router from "./routes/bancoestebanquito.routes.js";
const app = express();

app.set('port',3001);

//Routes
app.use(router)

export default app;