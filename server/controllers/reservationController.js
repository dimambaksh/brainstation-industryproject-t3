/**
router
  .route("/reserve")
  .get(reservationController.index)
  .post(reservationController.reserve);

router
  .route("/reserve/:reservationId")
  .put(reservationController.safetyScreen)
  .delete(reservationController.deleteReservation);

 * Reserve: /reserve
 *          -> get => availability by floor/zone
 *          -> post => reserve desk/floor/zone/user/date
 *
 * Reserve: /reserve/:reservationId
 *          -> put => safetyscreen = true
 *          -> delete => remove reservation
 */

const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data");

const readUserData = () => {
  const userDataFile = fs.readFileSync(`${dataPath}/${process.env.USERS_FILE}`);
  return JSON.parse(userDataFile);
};

const writeUserData = (dataJson) => {
  fs.writeFileSync(
    `${dataPath}/${process.env.USERS_FILE}`,
    JSON.stringify(dataJson)
  );
};

const readReservationData = () => {
  const reservationDataFile = fs.readFileSync(
    `${dataPath}/${process.env.RESERVATIONS_FILE}`
  );
  return JSON.parse(reservationDataFile);
};

const writeReservationData = (dataJson) => {
  fs.writeFileSync(
    `${dataPath}/${process.env.RESERVATIONS_FILE}`,
    JSON.stringify(dataJson)
  );
};

const readDeskData = () => {
  const desksDataFile = fs.readFileSync(
    `${dataPath}/${process.env.DESKS_FILE}`
  );
  return JSON.parse(desksDataFile);
};

const writeDeskData = (dataJson) => {
  fs.writeFileSync(
    `${dataPath}/${process.env.DESKS_FILE}`,
    JSON.stringify(dataJson)
  );
};

const reservationTemplate = () => {
  return {
    uuid: uuidv4(),
    timestamp: Math.floor(new Date().getTime() / 1000),
    floor: "",
    desk: "",
    person: "",
    zone: "",
    reservationdate: "",
    safetypass: false,
  };
};

const getDesksAvailable = (dateIn, floorIn) => {
  let deskData = readDeskData();
  let desksAvailable = deskData.filter(
    (desk) => desk.available === "true" && desk.floor === floorIn
  );
  let reservationData = readReservationData();
  let currentReservations = reservationData.filter(
    (reservation) =>
      reservation.reservationdate === dateIn && reservation.floor === floorIn
  );

  let desksReservations = {
    desks: { desksAvailable },
    reservations: { currentReservations },
  };

  return desksReservations;
};

exports.index = (req, res) => {
  console.log("Reserve Index");
  let currentRequest = {
    date: "05/09/2022",
    floor: "1",
  }; //req.body;

  res.status(200).json(getDesksAvailable(currentRequest.date, currentRequest.floor));
};

exports.reserve = (req, res) => {
  console.log("Reserve");
  //reserve desk/floor/zone/user/date
  let reservationRequest = {
    desk: "D4-1",
    floor: "1",
    zone: "social",
    person: "aarone.amino@gmail.com",
    reservationdate: `05/09/2022`,
  }; //req.body;
  let newReservation = reservationTemplate();
  newReservation = { ...newReservation, ...reservationRequest };
  console.log(newReservation);

  let reservationData = readReservationData();
  reservationData.push(newReservation);
  writeReservationData(reservationData);

  res.status(200).send(newReservation);
};

exports.safetyScreen = (req, res) => {
  console.log("Safety Screen");
  let currentReservation = req.params.reservationId;
  let safetyScreen = true; //req.body.safetyScreen;

  let reservationData = readReservationData();
  let userReservationData;

  reservationData
    .filter((reservation) => reservation.uuid === currentReservation)
    .map((userReservation) => {
      userReservation.safetypass = safetyScreen;
      userReservationData = userReservation;
      return userReservation;
    });

  writeReservationData(reservationData);
  res.status(200).send(userReservationData);
};

exports.deleteReservation = (req, res) => {
  console.log("Delete Reservation");
  let currentReservation = req.params.reservationId;

  let reservationData = readReservationData();

  let newReservationData = reservationData.filter((reservation) => reservation.uuid !== currentReservation)

  writeReservationData(newReservationData);
  res.status(200).send(newReservationData);
};
