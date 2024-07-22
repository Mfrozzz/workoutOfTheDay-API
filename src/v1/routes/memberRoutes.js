const express = require("express");
const apicache = require("apicache");
const router = express.Router();
const cache = apicache.middleware;
const memberController = require("../../controllers/memberController");
// const isAuthenticated = require("../../middleware/isAuthenticated");

// router.use(isAuthenticated.middleware);

router.get("/", cache("2 minutes"),memberController.getAllMembers);

router.get("/:memberId",memberController.getOneMember);

router.get("/:email",memberController.getOneMemberByEmail);

router.post("/", memberController.createNewMember);

router.post("/login", memberController.signIn);

router.patch("/:memberId", memberController.updateOneMember);

router.delete("/:memberId", memberController.deleteOneMember);

module.exports = router;