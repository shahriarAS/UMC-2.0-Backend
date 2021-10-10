import nodemailer from "nodemailer"

const sendMail = async (email, randString, username, verifyFor, role) => {
    try {
        console.log(process.env.SenderEmail)
        console.log(process.env.SenderEmailPass)
        var transport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.SenderEmail,
                pass: process.env.SenderEmailPass
            }
        })

        let htmlMail = ""

        if (verifyFor == "signup") {
            if (role == "admin") {
                htmlMail = `${process.env.DOMAIN}/admin/verify/${username}/${randString}`
            }
            else {
                htmlMail = `${process.env.DOMAIN}/student/verify/${username}/${randString}`
            }
        } else {
            if (role == "admin") {
                htmlMail = `${process.env.DOMAIN}/admin/reset/${username}/${randString}`
            }
            else {
                htmlMail = `${process.env.DOMAIN}/student/reset/${username}/${randString}`
            }

        }

        console.log(htmlMail)

        var mailOptions = {
            from: "UMC | Uzzal Math Club",
            to: email,
            subject: "UMC Email Verification",
            html: htmlMail
        }

        transport.sendMail(mailOptions, function (err, resp) {
            if (err) {
                console.log(err)
            } else {
                console.log("Message Sent", resp)
            }
        })
    }
    catch (err) {
        console.log(err)
    }
}

export default sendMail