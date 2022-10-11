const
  express = require("express"),
  router = express.Router(),

  bmd_submission_to_entry_object_190520 = require("../libs/bmd_submission_to_entry_object_190520.js"),
  bmd_submission_to_entry_object_220926 = require("../libs/bmd_submission_to_entry_object_220926.js"),

  BmdObservedDataV190520 = require("../models/BmdObservedDataV190520.js"),
  BmdObservedDataV220926 = require("../models/BmdObservedDataV220926.js");

// /api/bmd-kobo/v190520/
router.post("/v190520/", async (req, res) => {
  try {
    const
      newObj = bmd_submission_to_entry_object_190520(req.body),
      newEntry = new BmdObservedDataV190520(newObj);

    await newEntry.save();

    res.json(newEntry);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});

// /api/bmd-kobo/v220926/
router.post("/v220926/", async (req, res) => {
  try {
    const
      newObj = bmd_submission_to_entry_object_220926(req.body),
      newEntry = new BmdObservedDataV220926(newObj);

    await newEntry.save();

    res.json(newObj);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});

module.exports = router;
