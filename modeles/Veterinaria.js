import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generarId from "../helpers/generarid.js";


const vetenirariaSchema = mongoose.Schema({
    nombre: {
        type:String,
        required:true,
        trim:true
    },
    password: {
        type:String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique:true,
        trim: true

    },

    telefono:{
        type: String,
        default: 'null',
        trim: true
    },
    
    web :{
        type: String,
        default: null,

    },

    token: {
        type: String,
        default: generarId()

    },


    confirmado:{
        type : Boolean,
        default: false
    }
})

vetenirariaSchema.pre('save', async function (next) {

    console.log('Antes de almacenar')


    if(!this.isModified("password")){
    next();
}

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

    


})

vetenirariaSchema.methods.comprobarPassword = async function (passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password);
};


const Veterinario = mongoose.model("Veterinario", vetenirariaSchema);


export default Veterinario;

