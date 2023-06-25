const stages = require("express").Router();
const db = require("../models");
const { Stage } = db;
const { Op } = require("sequelize");

stages.get("/", async (req, res) => {
  try {
    const foundStages = await Stage.findAll({
      order: [["stage_id", "ASC"]],
      where: {
        stage_name: { [Op.like]: `%${req.query.name ? req.query.name : ""}%` },
      },
    });
    res.status(200).json(foundStages);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error getting stages");
  }
});

stages.get("/:id", async (req, res) => {
  try {
    const foundStage = await Stage.findOne({
      where: {
        stage_id: req.params.id,
      },
    });
    res.status(200).json(foundStage);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error finding one stage");
  }
});

stages.post("/", async (req, res) => {
  try {
    const newStage = await Stage.create(req.body);
    res.status(200).json({ message: "Created a new band!", data: newStage });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding one stage");
  }
});

stages.put("/:id", async (req, res) => {
  try {
    const updatedStages = await Stage.update(req.body, {
      where: {
        stage_id: req.params.id,
      },
    });
    res.status(200).json({ message: `updated ${updatedStages} bands` });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating stages");
  }
});

stages.delete("/:id", async (req, res) => {
  try {
    const foundStage = await Stage.destroy({
      where: {
        stage_id: req.params.id,
      },
    });
    res
      .status(200)
      .json({ message: `Successfully deleted band id ${req.params.id}` });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting one stage");
  }
});

module.exports = stages;
