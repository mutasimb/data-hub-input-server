const
  express = require("express"),
  router = express.Router(),

  bmd_submission_to_entry_object_190520 = require("../libs/bmd_submission_to_entry_object_190520.js"),

  BmdObservedDataV190520 = require("../models/BmdObservedDataV190520.js");

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

module.exports = router;
