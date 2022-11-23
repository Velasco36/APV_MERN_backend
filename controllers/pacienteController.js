import Paciente from "../modeles/Paciente.js";


const agregarPacientes = async (req,res) =>{
    //console.log(req.body);

    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;
    //console.log(paciente)

    try {
        const pacienteAlmacenado = await paciente.save();
        res.json(pacienteAlmacenado);
    }catch(error){
        console.log(error)
    }
};

const obtenerPacientes = async (req,res) =>{
    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario);

    res.json(pacientes)
};


const obtenerPaciente = async (req, res) => {

    const {id} = req.params;
    const paciente = await Paciente.findById(id.trim());
    if(!paciente){
        res.status(404).json({msg: 'Not Found'});
    }
    console.log(paciente.veterinario._id)
    console.log(req.veterinario._id)
    

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.status(401).json ({ msg: ' accion no valida'});
    }

    
    res.json(paciente);
    
    

}


const actualizarPaciente = async (req, res) => {


    const {id} = req.params;
    const paciente = await Paciente.findById(id.trim());
  
    if(!paciente){
        res.status(404).json({msg: 'Not Found'});
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.status(401).json ({ msg: ' accion no valida'});
    }

    
        //Actualizar paciente
    paciente.nombre = req.body.nombre ||  paciente.nombre 
    paciente.propietario = req.body.propietario || paciente.propietario
    paciente.email = req.body.email || paciente.email
    paciente.fecha = req.body.fecha || paciente.fecha
    paciente.sintomas = req.body.sintomas || paciente.sintomas  


    try{
        const pacienteActualizado = await paciente.save();
        res.json(pacienteActualizado);

    }catch(error){
        console.log(error);
    }

    

}


const eliminarPaciente = async (req, res) => {
    const {id} = req.params;
    const paciente = await Paciente.findById(id.trim());
  
    if(!paciente){
        res.status(404).json({msg: 'Not Found'});
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.status(401).json ({ msg: ' accion no valida'});
    }

    try {
        await paciente.deleteOne();
        res.json({ msg: "paciente Eliminado" });

    }catch(error){
        console.log(error);
    }
}


export {
    agregarPacientes,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente


}