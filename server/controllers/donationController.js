const Donation = require("../models/Donation");

// ======================
// Make Donation
// ======================

const makeDonation = async (req, res) => {

    try {

        const { temple, amount } = req.body;
console.log("req.body:", req.body);
console.log("Temple:", req.body.temple);
console.log("Amount:", req.body.amount);
        const donation = await Donation.create({

            user: req.user._id,

            temple,

            amount

        });

        res.status(201).json({

            message: "Donation Successful",

            donation

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ======================
// View Donations
// ======================

const getDonations = async (req, res) => {

    try {

        const donations = await Donation.find()
            .populate("user")
            .populate("temple");

        res.status(200).json(donations);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    makeDonation,

    getDonations

};