const User = require("../models/User");
const Temple = require("../models/Temple");
const Slot = require("../models/Slot");
const Booking = require("../models/Booking");
const Donation = require("../models/Donation");

const getDashboardStats = async (req, res) => {

    try {

        const totalUsers = await User.countDocuments();

        const totalTemples = await Temple.countDocuments();

        const totalSlots = await Slot.countDocuments();

        const totalBookings = await Booking.countDocuments();

        const totalDonations = await Donation.countDocuments();

        const donationAmount = await Donation.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }
        ]);

        res.json({

            totalUsers,

            totalTemples,

            totalSlots,

            totalBookings,

            totalDonations,

            totalDonationAmount:
                donationAmount.length > 0
                    ? donationAmount[0].total
                    : 0

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    getDashboardStats

};