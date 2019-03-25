const Order = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");

module.exports = {
  saveOrder: async (req, res) => {
    const user = req.user.id;
    const { totalPrice, order } = req.body;
    let loggedUser = await User.findOne({ _id: user });
    let loggedUserDetails = loggedUser[loggedUser.method];
    console.log("totalPrice", totalPrice);
    console.log("loggedUserDetails.balance", loggedUserDetails.balance);
    if (loggedUserDetails.balance >= totalPrice) {
      for (let i = 0; i < order.length; i++) {
        let currentProduct = await Product.findOne({
          _id: order[i].product._id
        });
        if (currentProduct.quantity < order[i].quantity) {
          return res.json({
            message: `${order[i].quantity} ${
              currentProduct.name
            } isn't availabel in our store`,
            success: false
          });
        }
      }
      for (let i = 0; i < order.length; i++) {
        await Product.update(
          { _id: order[i].product._id },
          { $inc: { quantity: -order[i].quantity } }
        );
      }
      await User.update(
        { _id: user },
        {
          $set: {
            [loggedUser.method + ".balance"]:
              loggedUserDetails.balance - totalPrice
          }
        }
      );
      function clearCart(user) {
        Cart.findOne({ user: user }).then(foundCart => {
          Cart.findByIdAndRemove(foundCart._id)
            .then(
              () =>
                res
                  .status(200)
                  .json({ message: "Thank's for your purchase", success: true }) ///Transaction Saved and Cart Removed
            )
            .catch(err => res.send(err));
        });
      }
      /////
      Order.findOne({ user: user }).then(foundDoc => {
        if (foundDoc) {
          foundDoc.orders.push(order);
          foundDoc.save().then(() => {
            //   res.status(200).json("Order Saved")
            clearCart(user);
          });
        } else {
          Order.create({
            user: user,
            orders: [order]
          }).then(() => {
            //   res.status(200).json("Order Created")
            clearCart(user);
          });
        }
      });
    } else {
      return res.json({ message: "Not enough Money", success: false });
    }
  }
  //////////////////////////////////////////////////////////
  //   getCartItems: (req, res) => {
  //     Cart.findOne({ user: req.user.id })
  //       .populate("items.product")
  //       .exec((err, cart) => {
  //         if (!cart) {
  //           return res.json({ items: [] });
  //         }
  //         res.send(cart);
  //       });
  //   },
  //   removeItemFromCart: (req, res) => {
  //     Cart.findOne({ user: req.user.id }).then(foundCart => {
  //       if (foundCart) {
  //         foundCart.items = foundCart.items.filter(
  //           item => item._id != req.body.itemId
  //         );
  //         foundCart.save(() =>
  //           res
  //             .status(200)
  //             .json({ message: "Item Removed", data: foundCart.items })
  //         );
  //       }
  //     });
  //   },
  //   emptyCart: (req, res) => {
  //     Cart.findOne({ user: req.user.id }).then(foundCart => {
  //       Cart.findByIdAndRemove(foundCart._id)
  //         .then(() => res.status(200).json("Empty Cart"))
  //         .catch(err => res.send(err));
  //     });
  //   }
};
