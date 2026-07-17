const express = require("express");

const {
    makeDonation,
    getDonations
} = require("../controllers/donationController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Logged-in user can donate
router.post("/", protect, makeDonation);

// View all donations
router.get("/", protect, getDonations);

module.exports = router;