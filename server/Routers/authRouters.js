const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const router = new express.Router();

const { authControllers } = require("../Controllers");
const { loginSignupRateLimiter } = require("../Utilities");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static(path.resolve(__dirname, "Public")));

/*
************************** APIs **************************

1. Login API - "{BACKEND_URL}/api/v1/auth/login"
2. Register API - "{BACKEND_URL}/api/v1/auth/register"

**********************************************************
*/

// Multer storage configuration with unique file naming
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Public/ProfilePicUploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// Multer instance with file validation
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2 MB
});

// Login API
router.post("/login", loginSignupRateLimiter, authControllers.loginUser);

// Register API
router.post(
  "/register",
  upload.single("file"),
  loginSignupRateLimiter,
  authControllers.register
);

module.exports = router;
