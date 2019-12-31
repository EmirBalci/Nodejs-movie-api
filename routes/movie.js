const express = require("express");
const router = express.Router();

const Movie = require("../models/Movie");

router.get("/", (req, res, next) => {
  const promise = Movie.find({});
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/top10", (req, res, next) => {
  const promise = Movie.find({})
    .sort({ imdb: -1 })
    .limit(10);
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/between/:start_year/:end_year", (req, res) => {
  const { start_year, end_year } = req.params;
  const promise = Movie.find()
    .where("year")
    .gte(start_year)
    .lte(end_year);
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/:movie_id", (req, res, next) => {
  const promise = Movie.findById(req.params.movie_id);
  promise
    .then(data => {
      if (!data) next({ message: "The movie was not found.", code: 102 });
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.put("/:movie_id", (req, res, next) => {
  const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, {
    new: true
  });
  promise
    .then(data => {
      if (!data) next({ message: "The movie was not found.", code: 102 });
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete("/:movie_id", (req, res, next) => {
  const promise = Movie.findByIdAndRemove(req.params.movie_id);
  promise
    .then(data => {
      if (!data) next({ message: "The movie was not found.", code: 102 });
      res.json({ message: "Movie is Removed." });
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/", (req, res, next) => {
  const movie = new Movie(req.body);

  const promise = movie.save();

  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
