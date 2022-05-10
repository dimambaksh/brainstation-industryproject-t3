const router = require("express").Router();
const reservationController = require("../controllers/reservationController");
const userController = require("../controllers/userController");

router.route("/user/:userId").get(userController.index); //get user profile image
router.route("/login").post(userController.login);
router.route("/login/:userId").get(userController.logout);

router
  .route("/reserve/:floorSelected")
  .post(reservationController.index);

router.route("/reserve/:userId").get(reservationController.userReservations);
router.route("/reserve").post(reservationController.reserve);

router
  .route("/reserve/:reservationId")
  .put(reservationController.safetyScreen)
  .delete(reservationController.deleteReservation);

module.exports = router;
