const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");

const { adminControllers } = require("../Controllers");

const router = new express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static(path.resolve(__dirname, "Public")));

/*
************************** APIs **************************

1. Add Emails using CSV file to register API - "{BACKEND_URL}/api/v1/admin/upload-csv-allowed-emails"
2. Add array of Emails to register API - "{BACKEND_URL}/api/v1/admin/add-allowed-emails"
3. Fetch all allowed emails API - "{BACKEND_URL}/api/v1/admin/fetch-all-allowed-emails"
4. Delete emails from AllowedEmail schema API - "{BACKEND_URL}/api/v1/admin/delete-allowed-emails"
5. Block email/user from website API - "{BACKEND_URL}/api/v1/admin/block-email"
6. Unblock email/user from website API - "{BACKEND_URL}/api/v1/admin/unblock-email"
7. Delete Users from website API - "{BACKEND_URL}/api/v1/admin/delete-users-accounts"
8. Promote user one rank above API - "{BACKEND_URL}/api/v1/admin/promote-user"
9. Demote user one rank below API - "{BACKEND_URL}/api/v1/admin/demote-user"
10. Update team size API - "{BACKEND_URL}/api/v1/admin/update-team-size"
11. Create a new team API - "{BACKEND_URL}/api/v1/admin/create-team"
12. Delete a team API - "{BACKEND_URL}/api/v1/admin/delete-team"
13. Edit team name API - "{BACKEND_URL}/api/v1/admin/edit-team-name"

**********************************************************
*/

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Public/CSVUploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

//1. Add Emails using CSV file to register API
router.post(
  "/upload-csv-allowed-emails",
  upload.single("file"),
  adminControllers.uploadCSVAllowedEmails
);

//2. Add array of Emails to register API
router.post("/add-allowed-emails", adminControllers.addAllowedEmails);

//3. Fetch all allowed emails
router.post("/fetch-all-allowed-emails", adminControllers.fetchAllowedEmails);

//4. Delete emails from AllowedEmail schema
router.delete("/delete-allowed-emails", adminControllers.deleteAllowedEmails);

//5. Block email/user from website API
router.post("/block-email", adminControllers.blockEmail);

//6. Unblock email/user from website API
router.post("/unblock-email", adminControllers.unblockEmail);

//7. Delete Users from website API
router.delete("/delete-users-accounts", adminControllers.deleteUsers)

//8. Promote user one rank above API
router.post("/promote-user", adminControllers.promoteUser);

//9. Demote user one rank below API
router.post("/demote-user", adminControllers.demoteUser);

//************************** APIs For Teams **************************
//10. Update team size API
router.post("/update-team-size", adminControllers.updateTeamSize);

//11. Create a new team API
router.post("/create-team", adminControllers.createTeam);

//12. Delete a team API
router.delete("/delete-team", adminControllers.deleteTeam);

//13. Edit team name API
router.post("/edit-team-name", adminControllers.editTeamName);
//********************************************************************

module.exports = router;
