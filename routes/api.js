const express = require('express');
const router = express.Router();
const maincontroller = require("../controllers/Maincontroller");

/*********** API for upload the CSV */
router.post('/upload',maincontroller.uploadFile);

/************ API for find policy info with the help of the username */
router.get('/policy-details/:username',maincontroller.findPolicyByUsername);

/*********************** API for provide aggregated policy by each user. */
router.get('/aggregated_policy',maincontroller.aggregatedPolicyByuser);
module.exports = router