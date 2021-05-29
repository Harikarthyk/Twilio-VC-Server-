require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

var AccessToken = require("twilio").jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;

// Substitute your Twilio AccountSid and ApiKey details

var ACCOUNT_SID = process.env.ACCOUNT_SID;
var API_KEY_SID = process.env.API_KEY_SID;
var API_KEY_SECRET = process.env.API_KEY_SECRET;

// Create an Access Token
var accessToken = new AccessToken(ACCOUNT_SID, API_KEY_SID, API_KEY_SECRET);

app.get("/", (req, res) => {
	res.send("Server is running successfully...");
});

app.post("/api/token/:userId", (req, res) => {
	// Set the Identity of this token
	accessToken.identity = req.params.userId;

	// console.log(req.body);
	// Grant access to Video
	var grant = new VideoGrant();
	grant.room = req.body.roomName
		? req.body.roomName
		: " Twilio_Vedio_Calling_Room_Name";
	accessToken.addGrant(grant);
	// Serialize the token as a JWT
	var jwt = accessToken.toJwt();

	res.status(200).json({
		token: jwt,
	});
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`));
