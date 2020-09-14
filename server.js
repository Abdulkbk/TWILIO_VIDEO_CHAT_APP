const express = require('express');
const mongoose = require('mongoose');
const twilio = require('twilio');
const Sessions = require('./Sessions')

// init app
const app = express();

// Parsing Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Token
const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

// handling create room route
const {accountSid, apiKey, secret, mongoURI} = require('./config/keys');

// Connect to mongodb
mongoose
	.connect(mongoURI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('Mongodb Connected...'))
	.catch(err => console.log(err));

app.post('/video/token', (req, res) => {
	const token = new AccessToken(accountSid, apiKey, secret);

	const { email, identity, room } = req.body; 
	token.identity = identity;

	const videoGrant = new VideoGrant({ room });
	token.addGrant(videoGrant);

	var jwt = token.toJwt();

	res.send({ jwt });

	const session = new Sessions({
		email,
		room: roomName,
		name: userName,
	})

	session.save()
		.then(session => console.log('Session received')
		).catch(err => console.log(err))
})

// Port
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build',  'index.html'))
    });
}

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));