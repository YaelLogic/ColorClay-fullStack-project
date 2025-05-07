const express = require("express")
const router = express.Router()
const tableAvailabilityController = require("../controllers/tableAvailabilityController")

router.get("/getAvailableTables",tableAvailabilityController.getAvailableTables)

router.get("/getReservationsByDate",tableAvailabilityController.getReservationsByDate)

router.delete("deleteByDate",tableAvailabilityController.deleteByDate)

module.exports=router
