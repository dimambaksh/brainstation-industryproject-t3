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
  console.log(dateIn, floorIn);

  let deskData = readDeskData();

  let desksAvailable = deskData.filter((desk) => +desk.floor === +floorIn);

  console.log(desksAvailable.length);

  let reservationData = readReservationData();
  console.log(reservationData);

  let currentReservations = reservationData.filter(
    (reservation) =>
      reservation.reservationdate === dateIn && reservation.floor === floorIn
  );

  console.log(currentReservations);

  let desksReservations = {
    desks: { desksAvailable },
    reservations: { currentReservations },
  };

  return desksReservations;
};

const getUserReservations = (userEmail) => {
  console.log(userEmail);

  let reservationData = readReservationData();
  //console.log(reservationData);

  let currentReservations = reservationData.filter(
    (reservation) =>
      reservation.person.toLowerCase() === userEmail.toLowerCase()
  );

  let sortedReservations = getSortedData(currentReservations);
  console.log(sortedReservations);

  let userReservations = {
    reservations: {currentReservations: sortedReservations},
  };

  return userReservations;
};

getSortedData = (dataIn) => {
  console.log(dataIn);

  return dataIn.sort((a, b) => {
    return new Date(a.reservationdate) - new Date(b.reservationdate);
  });
};

exports.index = (req, res) => {
  console.log("Reserve Index");
  console.log(req.params);
  console.log(req.body);

  res
    .status(200)
    .json(getDesksAvailable(req.body.date, req.params.floorSelected));
};

exports.userReservations = (req, res) => {
  console.log("User Reservations");
  let currentUser = req.params.userId.toLowerCase();
  let userDB = readUserData();
  if (currentUser && userDB[currentUser]) {
    console.log("Reservation retrieved successfully.");
    res.status(200).send(getUserReservations(currentUser));
  } else {
    console.log("User not found.");
    res.status(400).send([]);
  }
};

exports.reserve = (req, res) => {
  console.log("Reserve");
  console.log(req.body);
  //reserve desk/floor/zone/user/date
  //const {desk, floor, zone, person, reservationdate} = req.body;
  // let reservationRequest = {
  //   desk: "D4-1",
  //   floor: "1",
  //   zone: "social",
  //   person: "aarone.amino@gmail.com",
  //   reservationdate: `05/09/2022`,
  // }; //req.body;
  let newReservation = reservationTemplate();
  newReservation = { ...newReservation, ...req.body };
  console.log(newReservation);

  let reservationData = readReservationData();
  reservationData.push(newReservation);
  writeReservationData(reservationData);

  res.status(200).send(newReservation);
};

exports.safetyScreen = (req, res) => {
  console.log("Safety Screen");
  let currentReservation = req.params.reservationId;
  let safetyScreen = new Boolean(req.body.safetyScreen);
  console.log(safetyScreen, req.body.safetyScreen, currentReservation);

  let reservationData = readReservationData();
  let userReservationData;

  reservationData
    .filter((reservation) => reservation.uuid === currentReservation)
    .map((userReservation) => {
      console.log("Updating Safety Pass");
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

  let newReservationData = reservationData.filter(
    (reservation) => reservation.uuid !== currentReservation
  );

  writeReservationData(newReservationData);
  res.status(200).send(newReservationData);
};
