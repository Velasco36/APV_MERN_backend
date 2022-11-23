import nodemailer from "nodemailer";

const emailOlvidePassword = async (datos) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });   

      console.log(datos);

      const {email, nombre, token} =  datos;

      // enviar el email

      const info = await transporter.sendMail({
        from: "APV - Aministrador de Pacientes de Veterinaria",
        to: email,
        subject: 'Reentablecce tu Password',
        text: 'Reestablece tu password',
        html: `<p>Hola: ${nombre}, Has solicitado reestablecer tu password.</p>
        <p> Sigue el siguiente enlace para generar un nuevo Password:
        <a href="${process.env.FRONTEND_URL}/OlvidePassword/${token}">Resstablecer Password </a> </p>

        <p> SI tu no creas esta cuenta, puedes ignorar este mensaje </p>
        `,
      })
      console.log("Mensaje enviado: %s", info.messageId);
      
};



export default emailOlvidePassword;