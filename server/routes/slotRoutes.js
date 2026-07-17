const express = require("express");

const {
    addSlot,
    getSlots,
    getSlotById,
    updateSlot,
    deleteSlot
} = require("../controllers/slotController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

// Public Routes
router.get("/", getSlots);
router.get("/:id", getSlotById);

// Admin Routes
router.post("/", protect, authorize("ADMIN"), addSlot);

router.put(
    "/:id",
    protect,
    authorize("ADMIN"),
    updateSlot
);

router.delete(
    "/:id",
    protect,
    authorize("ADMIN"),
    deleteSlot
);

module.exports = router;