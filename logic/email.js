const nodemailer = require("nodemailer");

/**
 * Envoi d'un email à l'adresse email de l'administrateur,
 * avec le contenu du message et spécificant l'adresse email de l'expéditeur
 * @param {string} adresseExpediteur 
 * @param {string} msg 
 */
async function exec(adresseExpediteur, msg) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            type: "login",
            user: "lebaill.glen@gmail.com",
            pass: process.env.WEBCOMET_MAIL_P
        }
    })

    // send mail with defined transport object
    return await transporter.sendMail({
        from: '"webcomet.fr" <lebaill.glen@gmail.com>', // sender address
        to: "lebaill.glen@gmail.com", // list of receivers
        subject: "webcomet.fr -> email client", // Subject line
        text: `De ${adresseExpediteur} :\n` + msg, // plain text body
        html: `De ${adresseExpediteur} :<br>` + msg // html body
    })
}

module.exports = exec
