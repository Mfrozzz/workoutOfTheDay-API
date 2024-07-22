const express = require("express");
const apicache = require("apicache");
const router = express.Router();
const cache = apicache.middleware;
const memberController = require("../../controllers/memberController");
const verifyToken = require("../../middleware/isAuthenticated");

router.post("/login", memberController.signIn);

router.post("/", memberController.createNewMember);

router.use(verifyToken);

router.get("/", cache("2 minutes"),memberController.getAllMembers);

router.get("/:memberId",memberController.getOneMember);

router.get("/:email",memberController.getOneMemberByEmail);

router.patch("/:memberId", memberController.updateOneMember);

router.delete("/:memberId", memberController.deleteOneMember);

// router.get('/logout', function(req,res){
//     res.status(200).send({
//         auth: false,
//         token: null
//     });
// });

module.exports = router;