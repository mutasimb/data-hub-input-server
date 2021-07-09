const
  express = require("express"),
  router = express.Router(),

  bmd_submission_to_entry_object = require("../libs/bmd_submission_to_entry_object"),

  BmdObservedData = require("../models/BmdObservedData");

// /api/bmd-kobo/v190520/
router.post("/v190520/", async (req, res) => {
  try {
    const
      newObj = bmd_submission_to_entry_object(req.body),
      newEntry = new BmdObservedData(newObj);

    await newEntry.save();

    res.json(newEntry);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});

module.exports = router;
