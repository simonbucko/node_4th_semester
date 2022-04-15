import nodemailer from "nodemailer"

export const sendMail = async (receiversEmail, orderNumber) => {
    // const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: '"Fred Foo 👻" <simon.bucko@post.sk>', // sender address
        to: receiversEmail, // list of receivers seperated by comma
        subject: `Your order ${orderNumber}`, // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    }

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}
