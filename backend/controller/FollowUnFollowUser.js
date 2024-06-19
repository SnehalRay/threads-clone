import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import generateToken from '../helper/generateToken.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// CONDITIONS:
// 1. CANNOT FOLLOW/UNFOLLOW YOURSELF
// 2. USER CANNOT BE FOUND
// 3. IF YOU FOLLOW, THEN UNFOLLOW
// 4. IF YOU DON'T FOLLOW, THEN FOLLOW
// 5. USER DOES NOT EXIST

export const followUnfollow = async (req, res) => {
  try {
    const { id } = req.params;
    const myUserId = req.user.id;

    if (id === myUserId) {
      return res.status(401).json({ message: "Cannot follow yourself" });
    }

    const myUser = await User.findById(myUserId);
    const userToFollow = await User.findById(id);

    if (!userToFollow) {
      return res.status(401).json({ message: "User does not exist" });
    }

    // IF I AM FOLLOWING SOMEONE, THEN I UNFOLLOW

    const isFollowing = myUser.following.includes(id);

    if (!isFollowing) {
      // then we follow them
      // we put their id in our following array
      // they put us in their followers array
      myUser.following.push(id);
      userToFollow.followers.push(myUserId);
    } else {
      // if we already follow them, then we unfollow
      // which is removing their id from my following
      // removing my id from their followers array
      myUser.following = myUser.following.filter(followId => followId.toString() !== id);
      userToFollow.followers = userToFollow.followers.filter(followerId => followerId.toString() !== myUserId);
    }

    await myUser.save();
    await userToFollow.save();

    res.status(200).json({ message: `Successfully ${isFollowing ? 'unfollowed' : 'followed'} the user`, myUser, userToFollow });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { followUnfollow };
