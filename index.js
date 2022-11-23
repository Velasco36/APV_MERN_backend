import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import veterinarioRouter from './routers/veteriarioRouter.js';
import pacienteRoutes from './routers/pacienteRouter.js';

const app = express();
app.use(express.json());
dotenv.config();
connectDB();

const dominiosPermitidos = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function(origin, callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){
            // El origen del Request Esta permtido
            callback(null, true)
        }
    }
}

app.use(cors(corsOptions));


app.use('/api/veterinario',  veterinarioRouter)
app.use('/api/pacientes',  pacienteRoutes);


const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
    console.log(`Servidor  funcionando correctamente en el puerto ${PORT}`)
})