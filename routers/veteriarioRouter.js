import express from 'express';
const router = express.Router();
import { 
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    nuevoPassword,
    comprobarToken,
    actualizarPerfil,
    actualizarPassword

 }from '../controllers/veterinariosControllers.js';
import cheackAuth from '../middleware/authMiddleware.js';



router.post('/', registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);
router.post("/olvide-password", olvidePassword);
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword)

//Area privada
router.get('/perfil', cheackAuth ,perfil)
router.put('/perfil/:id', cheackAuth, actualizarPerfil)
router.put('/actualizar-password', cheackAuth, actualizarPassword)

export default router;

