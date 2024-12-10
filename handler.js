const AWS = require("aws-sdk");
            AWS.config.update({ region: "us-east-1" });

            const ses = new AWS.SES();

            module.exports.sendEmail = async (event) => {
            const { name, email, message } = JSON.parse(event.body);

            const params = {
               Source: "your-sender-email@example.com",
               Destination: {
                  ToAddresses: ["delijaytechconsult@gmail.com"],
               },
               Message: {
                  Subject: {
                  Data: `New Contact Form Submission from ${name}`,
                  },
                  Body: {
                  Text: {
                     Data: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
                  },
                  },
               },
            };

            try {
               await ses.sendEmail(params).promise();
               return {
                  statusCode: 200,
                  body: JSON.stringify({ message: "Email sent successfully!" }),
               };
            } catch (error) {
               return {
                  statusCode: 500,
                  body: JSON.stringify({ error: error.message }),
               };
            }
            };
