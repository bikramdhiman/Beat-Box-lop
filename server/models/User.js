const mongoose = require("mongoose");

// step 2
const User = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false, // my default is false
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  likedSongs: {
    type: String, // will make it array later - coz lot of songs can be there d
    default: "", // by default value of liked songs will be ""
  },
  likedPlaylist: {
    type: String,
    default: "",
  },
  subscribedArtists: {
    type: String,
    default: "",
  },
  password: {
    // just added
    type: String,
    required: true,
    private: true,
  },
});

//step3
const UserModel = mongoose.model("User", User); // create user from already defined 'userSchema'

module.exports = UserModel; // with this step we can import this file anywhere to access 'UserModel'
