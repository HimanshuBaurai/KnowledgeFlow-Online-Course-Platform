import { createTransport } from 'nodemailer'

export const sendEmail = async (to, subject, text) => {
    // //normal usecase
    // const transporter = createTransport({
    //     host: process.env.SMTP_HOST,
    //     port: process.env.SMTP_PORT,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //         user: process.env.SMTP_EMAIL, // generated ethereal user
    //         pass: process.env.SMTP_PASSWORD, // generated ethereal password
    //     },
    // });


    //we would be using mailtrap.io for testing purposes, max 50 emails per day
    const transporter = createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER, // generated ethereal user
            pass: process.env.SMTP_PASSWORD, // generated ethereal password
        },
    });

    const message = {
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
    };

    await transporter.sendMail(message);
}