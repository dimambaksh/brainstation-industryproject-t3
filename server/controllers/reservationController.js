/**
router
  .route("/reserve")
  .get(reservationController.index)
  .post(reservationController.reserve);

router
  .route("/reserve/:reservationId")
  .put(reservationController.safetyScreen)
  .delete(reservationController.deleteReservation);
 */

 const { v4: uuidv4 } = require("uuid");

 exports.index = (req, res) => {
     console.log("Index");
 };
 
 exports.reserve = (req, res) => {
    console.log("Reserve");
 };
 
 exports.safetyScreen = (req, res) => {
    console.log("Safety Screen");
 };

 exports.deleteReservation = (req, res) => {
    console.log("Delete Reservation");
 };