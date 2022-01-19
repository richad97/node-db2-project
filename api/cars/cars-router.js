const express = require("express");
const router = express.Router();

const { getAll, getById, create } = require("./cars-model.js");
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
} = require("./cars-middleware");

// [GET] /api/cars
router.get("/", async (req, res) => {
  const arr = await getAll();
  res.json(arr);
});

// [GET] /api/cars/:id
router.get("/:id", checkCarId, (req, res) => {
  res.json(req.obj);
});

// [POST] /api/cars/:id
router.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res) => {
    try {
      const newRecord = {
        vin: req.body.vin,
        make: req.body.make,
        model: req.body.model,
        mileage: req.body.mileage,
        title: req.body.title,
        transmission: req.body.transmission,
      };
      const insertedRecord = await create(newRecord);
      res.json(insertedRecord[0]);
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
