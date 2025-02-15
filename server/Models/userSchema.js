require("dotenv").config();

const chalk = require("chalk");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { Team } = require(".");

const SECRET_KEY = process.env.SECRET_KEY;

const userSchema = new mongoose.Schema({
  profilePicture: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  bio: {
    type: String,
    default: null,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  academicYear: {
    type: Number,
    enum: [1, 2, 3, 4],
  },
  phoneNumber: {
    type: Number,
    default: null,
  },
  role: {
    type: String,
    enum: [
      "USER",
      "MEMBER",
      "COREMEMBER",
      "VICEPRESIDENT",
      "PRESIDENT",
      "ADMIN",
    ],
    default: "USER",
  },
  linkedinUsername: {
    type: String,
    default: null,
  },
  codolioUsername: {
    type: String,
    default: null,
  },
  leetcodeUsername: {
    type: String,
    default: null,
  },
  codechefUsername: {
    type: String,
    default: null,
  },
  codeforcesUsername: {
    type: String,
    default: null,
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teams", // Reference to the `teams` schema
    default: null,
  },
  solvedQuestionsCount: {
    type: Number,
    default: 0,
    min: 0, // Ensures non-negative values
  },
  totalContestsParticipated: {
    type: Number,
    default: 0,
    min: 0, // Ensures non-negative values
  },
  subscribed: {
    type: Boolean,
    default: true,
  },
  authToken: {
    type: String,
    default: null,
  },
  resetPasswordOTP: {
    type: Number,
    default: null,
  },
  otpExpiry: {
    type: Date,
    default: null,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
});

// Hash password when password is changed/modified
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Trigger team update whenever solvedQuestionsCount changes/modified
userSchema.post("save", async function () {
  if (this.isModified("solvedQuestionsCount") && this.teamId) {
    const team = await Team.findById(this.teamId);
    if (team) {
      await team.updateTeamSolvedQuestions();
    }
  }
});

// Token generate
userSchema.methods.generateAuthtoken = async function () {
  try {
    let newToken = jwt.sign({ _id: this._id }, SECRET_KEY, {
      expiresIn: "1h", // 1h sets the expiration to 1 hour (30m for 30 minutes)
    });

    await this.updateOne({ authToken: newToken });
    return newToken;
  } catch (error) {
    console.error(
      chalk.bgRed.bold.red("Error generating auth token:"),
      error.message
    );
    return null;
  }
};

// Create & Export user model
const Users = mongoose.model("users", userSchema);

module.exports = Users;
