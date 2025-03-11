import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  experience: [
    {
      _id: Schema.Types.ObjectId,
      title: String,
      company: String,
      dates: {
        start: Date,
        end: Date,
      },
      description: String,
    },
  ],
  skills: [String],
  information: {
    bio: String,
    location: String,
    website: String,
  },
  isDeleted: { type: Boolean, default: false, select: false },
});

userSchema.pre("find", function () {
  this.where({ isDeleted: false });
});

userSchema.pre("findOne", function () {
  this.where({ isDeleted: false });
});

userSchema.pre("findOne", function () {
  this.where({ isDeleted: false });
});

const User = model("User", userSchema);
export default User;
