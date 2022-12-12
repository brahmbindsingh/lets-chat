const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const {
  createRoom,
  joinRoom,
  getRoomUsers,
  deleteRoom,
  exitRoom,
  getUserRooms,
  getRoomInfo,
} = require("../controllers/roomController");
const router = express.Router();

router.route("/create").post(isAuthenticated, createRoom);
router.route("/join").put(isAuthenticated, joinRoom);
// router.route('/roomlist').get( isAuthenticated, getRoomUsers );
// router.route('/delete').delete( isAuthenticated, deleteRoom );
// router.route('/exit').put( isAuthenticated, exitRoom );
router.route("/list").get(isAuthenticated, getUserRooms);
router
  .route("/:id")
  .get(isAuthenticated, getRoomInfo)
  .put(isAuthenticated, exitRoom)
  .delete(isAuthenticated, deleteRoom);

module.exports = router;