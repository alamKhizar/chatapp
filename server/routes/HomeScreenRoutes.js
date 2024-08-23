const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { showPeopleListToSendRequest, sendFriendRequestController, getAllFriendRequestsController, addFriendController } = require('../controller/HomeScreenController');
const { auth } = require('../middleware/auth');

const RouterHome = express.Router();

RouterHome.get('/showPeopleListToSendRequest/:id',auth,showPeopleListToSendRequest)

RouterHome.post('/sendFriendRequest',sendFriendRequestController)

RouterHome.get('/getAllFriendRequests/:id',getAllFriendRequestsController)

RouterHome.post('/addFriend',addFriendController)

module.exports = RouterHome