// domain.com/verifytoken/asdasdfasdfasdf () => 1 => better for server side
// domain.com/verifytoken?token=dafsdfasdfasdf () => 2 => better for client side

import nodemailer from 'nodemailer';
import User from '@/models/userModel'; // do this from the controller next time
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // generating the and getting the hash value 
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        // we want to find the user and update the user
        // we also want to add some properties in the model to the token

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, 
                {
                    verifyToken: hashedToken, 
                    verifyTokenExpiry: Date.now() + 3600000
                },
            )
        }else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, 
                {
                    forgotPasswordToken: hashedToken, 
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                },
            )
        } // now the new hashedToken is updated in the db for any of the 2 cases


        // create TRANSPORT with NODE MAILER
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "6e07f2ac71402d",
              pass: "30819ca2b7350c"
            //   TODO: add these credentials to .env file
            }
        });

        // add MAIL OPTIONS
        const mailOptions = {
            from: 'devyoma@gmail.com', 
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `
                <p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
                or copy and paste the link below in your browser. <br /> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                </p>
            `
        }

        // sending email with mail options
        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}