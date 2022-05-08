const router = require("express").Router();
const reservationController = require("../controllers/reservationController");
const userController = require("../controllers/userController");

router.route("/user/:userId").get(userController.index);//get user profile image
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