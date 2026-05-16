const express = require("express");

const router = express.Router();

const db = require("../db");

/* GET HERO */

router.get("/", (req, res) => {

  const sql =
    "SELECT * FROM hero_section LIMIT 1";

  db.query(sql, (err, result) => {

    if (err) {

      return res.status(500).json(err);

    }

    res.json(result[0]);

  });

});

/* UPDATE HERO */

router.put("/:id", (req, res) => {

  const {

    title,
    subtitle,
    description,
    background_image,
    featured_image,
    featured_title,
    featured_price,
    featured_duration,

  } = req.body;

  const sql = `
  
    UPDATE hero_section SET
    
    title = ?,
    subtitle = ?,
    description = ?,
    background_image = ?,
    featured_image = ?,
    featured_title = ?,
    featured_price = ?,
    featured_duration = ?

    WHERE id = ?

  `;

  db.query(

    sql,

    [

      title,
      subtitle,
      description,
      background_image,
      featured_image,
      featured_title,
      featured_price,
      featured_duration,
      req.params.id,

    ],

    (err, result) => {

      if (err) {

        return res.status(500).json(err);

      }

      res.json({

        message:
          "Hero updated successfully",

      });

    }

  );

});

module.exports = router;