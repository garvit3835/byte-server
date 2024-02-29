const express = require("express");
const mongoose = require("mongoose");
const auth = require('./routers/auth')
const poem = require('./routers/poem')

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8002;

mongoose.connect(
	"mongodb+srv://byte123:test123@cluster0.xazay07.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
	{ useNewUrlParser: true, useUnifiedTopology: true }
);

app.use('/auth', auth)
app.use('/poem', poem)


app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
