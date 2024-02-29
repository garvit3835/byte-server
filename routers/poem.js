const express = require("express");
const Poem = require("../db/models/poem");
const authenticateJWT = require("../middlewares/auth");
const router = express.Router();

router.post("/get", authenticateJWT, async (req, res) => {
	try {
		const poems = await Poem.find({ user: req.body.user });
		res.json(poems);
	} catch (error) {
		res.status(500).json({ message: "Error fetching poems" });
	}
});

router.post("/create", authenticateJWT, async (req, res) => {
	try {
		const poem = new Poem({
			poem: req.body.poem,
			author: req.body.author,
			user: req.body.user,
		});
		await poem.save();
		res.json({ message: "Poem created successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error creating poem" });
	}
});

module.exports = router;
