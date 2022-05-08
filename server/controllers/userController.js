/**
 * router.route("/").get(userController.index);
 * router.route("/login").get(userController.login);
 * router.route("/login/:userId").get(userController.logout);
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

exports.index = (req, res) => {
  console.log("User Index");
  let currentUser = req.params.userId;
  let userDB = readUserData();

  res.json(userDB[currentUser]? userDB[currentUser].image:"");
};

exports.login = (req, res) => {
  console.log("Login");
  console.log(`User Login: ${req.body.email}`);
  let currentUser = "aarone.amino@gmail.com" //req.body.email;

  let userDB = readUserData();
  if (currentUser && userDB[currentUser]){
      console.log("Login Successful.")
      res
      .status(200)
      .send(userDB[currentUser]);
  }
  else{
    console.log("User not found.")
    res
    .status(400)
    .send([]);
  }
};

exports.logout = (req, res) => {
  console.log("Logout");
  console.log(`User Logout: ${req.params.userId}`);
  let currentUser = "aarone.amino@gmail.com" //req.params.userId;

  let userDB = readUserData();
  if (currentUser && userDB[currentUser]){
      console.log("Logout Successful.")
      res
      .status(200)
      .send(userDB[currentUser]);
  }
  else{
    console.log("User not found.")
    res
    .status(400)
    .send([]);
  }
};
