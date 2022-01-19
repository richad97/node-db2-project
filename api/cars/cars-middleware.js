const { getById, getByVin } = require("./cars-model.js");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const obj = await getById(id);

    if (obj.length === 0) {
      res.status(404).json({ message: `car with id ${id} is not found` });
    } else {
      req.obj = obj[0];
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

const checkCarPayload = async (req, res, next) => {
  if (!req.body.vin) {
    res.status(400).json({ message: `vin is missing` });
  } else if (!req.body.make) {
    res.status(400).json({ message: `make is missing` });
  } else if (!req.body.model) {
    res.status(400).json({ message: `model is missing` });
  } else if (!req.body.mileage) {
    res.status(400).json({ message: `mileage is missing` });
  } else {
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  const isValidVin = vinValidator.validate(req.body.vin);
  if (isValidVin === false) {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
  } else {
    next();
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const exists = await getByVin(req.body.vin);
    if (!exists) {
      next();
    } else {
      res.status(400).json({ message: `vin ${req.body.vin} already exists` });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
