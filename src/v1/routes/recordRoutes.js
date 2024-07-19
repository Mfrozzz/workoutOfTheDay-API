const express = require("express");
const apicache = require("apicache");
const router = express.Router();
const cache = apicache.middleware;
const recordController = require("../../controllers/recordController");

router.get("/", cache("2 minutes"),recordController.getAllRecords);

router.get("/:recordId",recordController.getOneRecord);

router.post("/", recordController.createNewRecord);

router.patch("/:recordId", recordController.updateOneRecord);

router.delete("/:recordId", recordController.deleteOneRecord);

module.exports = router;