const express = require("express");
const router = express.Router();

const Director = require("../models/Director");

router.get("/", (req, res, next) => {
  const promise = Director.find({});

  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/:director_id", (req, res, next) => {
  const promise = Director.findById(req.params.director_id);

  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.put("/:director_id", (req, res, next) => {
  const promise = Director.findByIdAndUpdate(req.params.director_id, req.body, {
    new: true
  });

  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete("/:director_id", (req, res, next) => {
  const promise = Director.findByIdAndRemove(req.params.director_id);

  promise
    .then(data => {
      res.json({ message: "Diretory is removed." });
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/", (req, res, next) => {
  const director = new Director(req.body);

  const promise = director.save();

  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
