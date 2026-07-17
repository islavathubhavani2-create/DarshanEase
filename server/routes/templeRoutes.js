const express = require("express");

const {
    addTemple,
    getTemples,
    getTempleById,
    updateTemple,
    deleteTemple
} = require("../controllers/templeController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

// Public Routes
router.get("/", getTemples);
router.get("/:id", getTempleById);

// Admin Routes
router.post("/", protect, authorize("ADMIN"), addTemple);

router.put(
    "/:id",
    protect,
    authorize("ADMIN"),
    updateTemple
);

router.delete(
    "/:id",
    protect,
    authorize("ADMIN"),
    deleteTemple
);

module.exports = router;