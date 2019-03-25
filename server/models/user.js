const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const commonProps = {
  firstName: String,
  lastName: String,
  balance: Number,
  verified: Boolean,
  orders: {
    type: [],
    default: undefined
  }
};

// Create a schema
const userSchema = new Schema(
  {
    method: {
      type: String,
      enum: ["local", "google", "facebook"],
      required: true
    },
    local: {
      email: String,
      password: String,
      day: Number,
      month: Number,
      year: Number,
      phone: String,
      ...commonProps
    },
    google: {
      id: String,
      email: {
        type: String,
        lowercase: true
      },
      ...commonProps
    },
    facebook: {
      id: String,
      email: {
        type: String,
        lowercase: true
      },
      ...commonProps
    },
    isAdmin: Boolean
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next) {
  try {
    console.log("entered");
    if (this.method !== "local") {
      next();
    }

    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(this.local.password, salt);
    // Re-assign hashed version over original, plain text password
    this.local.password = passwordHash;

    this.local.balance = 0;
    this.local.verified = false;
    console.log("exited");
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Create a model
const User = mongoose.model("user", userSchema);

// Export the model
module.exports = User;
