const Chat = require("../models/chat");

module.exports = {
  sendToAdmin: async (req, res) => {
    Chat.findOne({ user: req.user.id }).then(foundChat => {
      let message = {
        author: "Me",
        text: req.body.text
      };
      if (foundChat) {
        foundChat.messages.push(message);
        foundChat.save().then(() => res.status(200).json("Message Added"));
      } else {
        Chat.create({
          user: req.user.id,
          messages: [message]
        }).then(() => res.status(200).json("Message Created"));
      }
    });
  },
  answerFromAdmin: async (req, res) => {
    Chat.findOne({ user: req.body.receiver }).then(foundChat => {
      let message = {
        author: "Admin",
        text: req.body.text
      };
      if (foundChat) {
        foundChat.messages.push(message);
        foundChat.save().then(() => res.status(200).json("Message Added"));
      } else {
        Chat.create({
          user: req.body.receiver,
          messages: [message]
        }).then(() => res.status(200).json("Message Created"));
      }
    });
  },
  userMessages: async (req, res) => {
    Chat.findOne({ user: req.user.id }, function(err, result) {
      if (err) {
        return res.send({ messages: [] });
      }
      if (!result) {
        return res.send({ messages: [] });
      } else {
        res.json(result);
      }
    });
  },
  adminMessages: async (req, res) => {
    Chat.find({})
      .populate("user")
      .exec((err, chats) => {
        if (!chats) {
          return res.json({ messages: [] });
        }
        let filterInfo = chats.map(chat => {
          return {
            author: {
              id: chat.user._id,
              fullName:
                chat.user[chat.user.method].firstName +
                " " +
                chat.user[chat.user.method].lastName
            },
            message: chat.messages
          };
        });
        res.send(filterInfo);
      });
  }
};
