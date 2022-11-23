import express from 'express';
const router = express.Router();

import {
    agregarPacientes,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente


} from './../controllers/pacienteController.js';
import cheackAuth from './../middleware/authMiddleware.js';


router.route("/")
.post(cheackAuth ,agregarPacientes)
.get(cheackAuth ,obtenerPacientes);

router
.route('/:id')
.get(cheackAuth, obtenerPaciente)
.put(cheackAuth, actualizarPaciente)
.delete( cheackAuth, eliminarPaciente)



export default router;