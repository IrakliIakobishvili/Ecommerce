const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    messages: [
      {
        author: {
          type: String
        },
        text: {
          type: String
        },
        date: {
          type: Date,
          default: () => {
            return Date.now();
          }
        }
      }
    ]
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
