const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

var AccessToken = require("twilio").jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;

//Make it Private .
// Substitute your Twilio AccountSid and ApiKey details
var ACCOUNT_SID = "AC8c98b68a5f547d3e8c971bfd0df293de";
var API_KEY_SID = "SK96c64e000cab419a48112716eca28388";
var API_KEY_SECRET = "NStABqRQA5KXWdOUyQL2SzEYuwy50pKs";

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
	// console.log(jwt);
	res.status(200).json({
		token: jwt,
	});
});

const PORT = 5050;
app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`));
