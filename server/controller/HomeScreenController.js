const express = require("express");
const User = require("../model/User");

// Function to show a list of people to send friend requests to
const showPeopleListToSendRequest = async (req, res) => {
  console.log("\n\nIn showPeopleListToSendRequest controller");

  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const listUserExceptTheLoginOne = await User.find({ _id: { $ne: id } });

    return res.status(200).json({
      listUserExceptTheLoginOne,
    });
  } catch (error) {
    console.error("Error in showPeopleListToSendRequest:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to handle sending a friend request
const sendFriendRequestController = async (req, res) => {
  console.log("In sendFriendRequestController");

  try {
    const { currentUserId, selectedUserId } = req.body;

    if (!currentUserId || !selectedUserId) {
      return res.status(400).json({ error: "Both currentUserId and selectedUserId are required" });
    }

    await User.findByIdAndUpdate(selectedUserId, {
      $push: { friendRequests: currentUserId },
    });

    await User.findByIdAndUpdate(currentUserId, {
      $push: { sentRequests: selectedUserId },
    });

    return res.status(200).json({ message: "Friend request sent successfully" });
  } catch (error) {
    console.error("Error in sendFriendRequestController:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get all friend requests for a user
const getAllFriendRequestsController = async (req, res) => {
  console.log("In getAllFriendRequestsController");

  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await User.findById(id)
      .populate('friendRequests')
      .exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error in getAllFriendRequestsController:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


const addFriendController = async(req,res)=>
  {
    const {user,selectedId} = req.body

    console.log("Current User ID in controller : "+ user)
    console.log("Selected User ID in controller : "+ selectedId)

    //push that id to friend array
    const friendAdded = await User.findByIdAndUpdate(user,
      {
        $push:{friends:selectedId}
      }
    )

    //remove that request from friend request section
    const removeComingRequest = await User.findByIdAndUpdate(user,
      {
        $pull:{friendRequests:selectedId}
      }
    )


    return res.status(200).json({ message: "Friend added successfully" });
  }

module.exports = { showPeopleListToSendRequest, sendFriendRequestController, getAllFriendRequestsController, addFriendController };
