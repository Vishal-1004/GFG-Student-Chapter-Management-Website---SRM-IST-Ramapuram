const express = require("express");
const router = new express.Router();

const { authControllers } = require("../Controllers");
const { loginSignupRateLimiter } = require("../Utilities");

// sample API
router.get("/", authControllers.api);

// Login API
router.post("/login", loginSignupRateLimiter, authControllers.loginUser);

// Register API
router.post("/register", loginSignupRateLimiter, authControllers.register);

module.exports = router;