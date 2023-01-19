import {createTransport} from "nodemailer"

const sendEmail=async(from,subject,text)=>{
    const transporter=createTransport({
        host:process.env.smtp_host,
        port:process.env.smtp_port,
        service:process.env.smtp_service,
        auth:{
            user:process.env.smtp_mailer,
            pass:process.env.smtp_pass,
        }
    });
    await transporter.sendMail({
        to:process.env.smtp_mailer,
        from,
        subject,
        text,

    })
}
export default sendEmail;