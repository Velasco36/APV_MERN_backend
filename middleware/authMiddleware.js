import jwt from 'jsonwebtoken';
import Veterinario from '../modeles/Veterinaria.js';

const cheackAuth= async (req, res, next) => {
    let token;
    //console.log('Desde el Middleware')
    //console.log(req.headers.authorization)
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try{

        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.veterinario = await Veterinario.findById(decoded.id).select(
            "-password -token -confirmado"
        );
        return next();
        
    }catch(error){
        const errortoken = new Error('Token no valido');
        res.status(403).json({ msg: errortoken.message});
    }
}
     
    if(!token){
        const error = new Error('Token no valido o inexistente');
        res.status(403).json({ msg: error.message});
    }
    next(); 
    
   
  
};

 export default cheackAuth