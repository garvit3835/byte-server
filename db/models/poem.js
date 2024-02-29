const mongoose = require('mongoose');

const poemSchema = new mongoose.Schema({
	poem: String,
	author: String,
	user: mongoose.ObjectId,
});

module.exports = mongoose.model("Poem", poemSchema);