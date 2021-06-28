const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const nodemailer = require("nodemailer");


app.use(bodyParser.json());
app.use(cors())


app.get('/', (req,res)=>{
	res.json('this is working bruh');
})

app.post('/sent', (req,res) =>{
	const { email, phone, yourName, companyName, websiteType, pages, message, urgency, companyType } = req.body;
	console.log(req.body)

	if(!email || !phone || !yourName || !companyName || !websiteType || !pages || !message || !urgency || !companyType){
     	return res.status(400).json('Insufficient information')
     }
	
	const output = `
		<p>You have a new website request</p>
		<h3>Website Details</h3>
		<ul>
			<li>Type of Website :${websiteType}</li>
			<li>Website Category :${companyType}</li>
			<li>Number of Website Pages - Estimate :${pages}</li>
			<li>How soon do you require the website :${urgency}</li>
			<li>Organization name :${companyName}</li>
			<li>Your Name :${yourName}</li>
			<li>Email :${email}</li>
			<li>Phone :${phone}</li>
			<h3>Message</h3>
			<p>${message}</p>
			
		</ul>
	`;

		async function main() {
			  

			  // create reusable transporter object using the default SMTP transport
			  let transporter = nodemailer.createTransport({
			    host: "smtp.gmail.com",
			    port: 587,
			    secure: false, // true for 465, false for other ports
			    auth: {
			      user: 'flexdevske@gmail.com', // generated ethereal user
			      pass: 'jflbquxpbapzetbz', // generated ethereal password
			    },
			    tls:{
			    	rejectUnauthorized:false
			    }
			  });

			  // send mail with defined transport object
			  let info = await transporter.sendMail({
			    from: '"Nodemailer Contact" <smtp.gmail.com>', // sender address
			    to: "flexdevske@gmail.com", // list of receivers
			    subject: "Website Quotation Request", // Subject line
			    text: "Hello world?", // plain text body
			    html: output, // html body
			  });

			  console.log("Message sent: %s", info.messageId);
			  
			  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
			  
			}

			main().catch(console.error);
			res.json('success')

})

	const PORT = process.env.PORT || 3001 ;
	
app.listen (PORT,  ()=>{
	console.log(`App is running on port ${PORT}`)
})




/*
	/sent ------> email and other data ----> POST = success/fail

	type ---message---name----company name--- urgency--budget----email--phone
	type of website --->company type----> message ---->pages --->urgency ---> companyName----->your name -->email ---> phn
////////////////

	Thanks for contacting flex devske 
	How can we help you today
	
	type of website :(type of website)
				    i Need a new website
				    i need  a redsign of my current website


    company type :(website category)
                personal website
				startup business
				sme
				corporate

	
	message :(Okay great — We'd love to
			 help you with this project. Can you 
			 explain a little more about what 
			 you exactly need?This question 
			 is required. *)

 pages :(Estimate of no. of pages on website)

	 		pages estimate 1-5

			page estimate 6 - 10

			page estimate 11 - 20

 urgency: (How soon do your require the website)

 	   1-2 weeks
 	   3-4 weeks	
 	   1-2 months
		

company Name :()

your name : ()

email :()

phn()

*/
