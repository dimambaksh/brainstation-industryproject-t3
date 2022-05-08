/**
 * Index: /:userId
 *          -> get user profile image
 * 
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

const serverRoutes = require("./routes/serverRoutes");

app.use("/", serverRoutes);

app.listen(8080, function () {
  console.log("Server started.");
});
