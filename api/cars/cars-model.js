const db = require("../../data/db-config");

const getAll = async () => {
  return db("cars");
};

const getById = async (id) => {
  return db("cars").where({ id });
};

const create = async (record) => {
  const created = await db("cars").insert(record);
  return getById(created[0]);
};

const getByVin = (vin) => {
  return db("cars").where("vin", vin).first();
};

module.exports = {
  getAll,
  getById,
  create,
  getByVin,
};
