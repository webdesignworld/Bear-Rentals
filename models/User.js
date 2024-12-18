import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email already exists'],
      required: [true, 'Email is required'],
      match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'], //every user has a username (obv)
      minlength: [3, 'Username must be at least 3 characters long'], //normal verif
      maxlength: [30, 'Username cannot exceed 30 characters'], //normal verif not google
    },
    image: {
      type: String, //storing image URL from google OAuth
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,    //for bookmarking properties
        ref: 'Property',
      },
    ],
    emailVerified: {
      type: Date,
      default: null, // for normal
    },
    verificationToken: {
      type: String,
      default: null, // normal
    },
    verificationTokenExpiry: {
      type: Date,
      default: null, // normal
    },

  },
  {
    timestamps: true,
  }
);

const User = models.User || model('User', UserSchema);

export default User;
