const router = require("express").Router(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  axios = require("axios");

const alert = require("../../models/Alert"),
    model = require("../../models/Model"),
    endpoint = require("../../models/Endpoint");

router.post(
    "/",
    passport.authenticate("jwt", {session = false},
    (req, user) => {
        alertToInsert = {
            endpoint: "",
            model: "",
            label: "",
            threshold: 0,
            timespan: "24"
        }
    })
);