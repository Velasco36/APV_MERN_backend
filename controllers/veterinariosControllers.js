import Veterinario from "../modeles/Veterinaria.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarid.js";
import { response } from "express";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";


const registrar = async (req, res) => {

  //const {nombre, cooreo, password} = req.body;


  const {email, nombre} = req.body

  //Prevenir usuario duplicados
  const existeUsuario = await Veterinario.findOne({email})

  if(existeUsuario){
    const error = new Error("Usuario ya Registrado")
    return res.status(400).json({msg: error.message})
    console.log(existeUsuario);
  }
  try {

    //Guardar Veterinario
    const veterinario = new Veterinario(req.body);
    const veterinarioGuardado = await veterinario.save();

    // Enviar el correo
    emailRegistro({
      email,
      nombre,
      token: veterinarioGuardado.token
    });

    res.json (veterinarioGuardado);

  }catch(error){
    console.log(error);
  }
  
}

const perfil = (req, res) => {
  const {veterinario} = req;
  
  res.json(veterinario);
};




const confirmar = async (req, res) => {
      console.log(req.params.token)

      const { token} = req.params;

      const usuarioconfirmar = await Veterinario.findOne({token})

      if (!usuarioconfirmar) {
        const error = new Error (' Token no valido')
        return res.status(404).json({msg: error.message})
    }


    try {
      usuarioconfirmar.token = null;
      usuarioconfirmar.confirmado = true;
      await usuarioconfirmar.save()

      res.json ({msg : 'usuario confirmado correctamente'})
    }catch(error) {
      console.log(error); 

    }


      console.log(usuarioconfirmar)
      res.json ({msg : 'confirmando cuenta ...'})

};

const autenticar = async (req,res) => {

  console.log(req.body)

  const {email, password} = req.body

  // comprobar si el usuario existe

  const usuario = await Veterinario.findOne({email})

  if (!usuario) {
    const error = new Error (' El usuario no existe')
    return res.status(404).json({msg: error.message})
}
  if(!usuario.confirmado){
    const error = new Error ('  tu cuenta no ha sido confrmada');
    return res.status(403).json({msg: error.message});
  }

  //Authenticar al usuario

    if(await usuario.comprobarPassword(password)){
      //autenticar
      
      res.json({
        _id : usuario._id,
        nombre:usuario.nombre,
        email: usuario.email,
        token: generarJWT(usuario.id),
      })
      console.log('Password correcto')
    }else {
      const error = new Error ('El password  es incorrect');
      return res.status(403).json({msg: error.message});
    }
};

const olvidePassword = async (req, res) =>{
  const {email} = req.body;

  const existeVeterinario = await Veterinario.findOne({email: email})
  if(!existeVeterinario){
    const error = new Error("El Usuario no existe");
    return res.status(404).json({msg: error.message})
  }
  try {
    existeVeterinario.token = generarId();
    await existeVeterinario.save();

    //Enviar Email con instrucciones
    emailOlvidePassword({
      email,
      nombre: existeVeterinario.nombre,
      token: existeVeterinario.token,
    })
    res.json({msg: "Hemos enviado un email con las instrucciones"})
  }catch(error){
    console.log(error);

  }

};

const comprobarToken = async (req, res)=> {
  const {token} = req.params
  console.log(token);

  const tokenValido = await Veterinario.findOne({token})

  if(tokenValido){

    // Token es valido el usuario existe
    res.json({msg: "Token Valido y el usuario existe"})
  }else{
    const error = new Error('Token no valido')
    return res.status(400).json({msg : error.message})
  }
};

const nuevoPassword = async (req, res) => {

  const {token} = req.params;
  const {password}= req.body;

  const veterinario = await Veterinario.findOne({token})
  if(!veterinario){
    const error = new Error("Hubo un error");
    return res.status(400).json({msg: error.message});
  }

  try{
    veterinario.token = null;
    veterinario.password = password;
    await veterinario.save();
    res.json({msg: 'Password modifidicado correctamente'})


  }catch(error){
    console.log(error);
  }

};

const actualizarPerfil = async (req, res) => {
    const veterinario = await Veterinario.findById(req.params.id);
    if(!veterinario){
      const error = new Error("Hubo un error");
      return res.status(400).json({ msg: error.message});
    }

    const {email}= req.body;
    if(veterinario.email !== req.body.email){
      const existeEmail = await Veterinario.findById({email});
      if(existeEmail){
        const error = new Error("Hubo un error");
        return res.status(400).json({ msg: error.message});        
      }
    }
   

    try {
      veterinario.nombre = req.body.nombre;
      veterinario.email = req.body.email;
      veterinario.web = req.body.web;
      veterinario.telefono = req.body.telefono;

      const veterinarioActualizado = await veterinario.save();
      res.json(veterinarioActualizado);


    }catch(error){
      console.log(error)
    }

}

const actualizarPassword = async (req, res) => {

  const {id} = req.veterinario;
  const {pwd_actual, pwd_nuevo}= req.body;

  //comprobar que el veterinario exista
  const veterinario = await Veterinario.findById(id);
  if(!veterinario){
    const error = new Error("Hubo un error");
    return res.status(400).json({msg: error.message});
  }

    //comprobar su password

    if(await veterinario.comprobarPassword(pwd_actual)){
      console.log("correcto")
      veterinario.password= pwd_nuevo;
      await veterinario.save();
      res.json({msg: "Password Almacenado correctamente"});

    }else{
      console.log('incorrecto')
      const error = new Error("El password Actual es Incorrect");
      return res.status(404).json({msg: error.message})
    }
  
  
  
  //console.log(req.veterinario);
  //console.log(req.body);
}

export {
    registrar,
    perfil,
    confirmar, 
    autenticar,
    olvidePassword,
    comprobarToken, 
    nuevoPassword,
    actualizarPerfil,
    actualizarPassword
  }


