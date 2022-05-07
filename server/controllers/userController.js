/**
 * router.route("/").post(userController.index);
 * router.route("/login").get(userController.login);
 * router.route("/login/:userId").get(userController.logout);
 */

const { v4: uuidv4 } = require("uuid");

exports.index = (req, res) => {
    console.log("Index");
};

exports.login = (req, res) => {
    console.log("Login");
};

exports.logout = (req, res) => {
    console.log("Logout");
};
