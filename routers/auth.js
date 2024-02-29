const express = require("express");
const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key";
const bcrypt = require("bcrypt");
const User = require('../db/models/user');
const authenticateJWT = require('../middlewares/auth')
const router = express.Router()

router.post("/register", async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
		});
		await user.save();
		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error registering user" });
	}
});

router.post("/login", async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(404).json({ message: "User not found" });

	const passwordMatch = await bcrypt.compare(req.body.password, user.password);
	if (!passwordMatch)
		return res.status(401).json({ message: "Invalid credentials" });

	const accessToken = jwt.sign(
		{ email: user.email, role: "STUDENT" },
		secretKey,
		{ expiresIn: "15m" }
	);
	const refreshToken = jwt.sign(
		{ email: user.email, role: "STUDENT" },
		secretKey,
		{ expiresIn: "1d" }
	);

	res.json({ refresh: refreshToken, access: accessToken });
});

router.get("/user-details", authenticateJWT, (req, res) => {
	res.json({
		id: req.user.id,
		email: req.user.email,
		name: req.user.name,
		number: req.user.number,
		role: req.user.role,
	});
});

module.exports = router;
