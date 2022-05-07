/**
 * Login:   /login/:userId
 *          -> get return userObject (image/information/reservations)
 *          /login/:userId/logout
 *         -> get -> logout, return confirmation
 *          /login/users -> number of users online
 *
 * Reserve: /reserve
 *          -> get => availability by floor/zone
 *          -> post => reserve desk/floor/zone/user/date
 *
 * Reserve: /reserve/:uuid
 *          -> put => safetyscreen = true
 *          -> delete => remove reservation
 */
 const express = require("express");
 const app = express();
 const cors = require("cors");
 const dotenv = require("dotenv");
 dotenv.config();
 
 app.use(cors({ origin: "*" }));
 app.use(express.json());
 
const router = require("express").Router();
const reservationController = require("./controllers/reservationController");
const userController = require("./controllers/userController");

router.route("/").post(userController.index);
router.route("/login").get(userController.login);
router.route("/login/:userId").get(userController.logout);

router
  .route("/reserve")
  .get(reservationController.index)
  .post(reservationController.reserve);

router
  .route("/reserve/:reservationId")
  .put(reservationController.safetyScreen)
  .delete(reservationController.deleteReservation);

module.exports = router;

app.listen(8080, function () {
    console.log("Server started.");
  });