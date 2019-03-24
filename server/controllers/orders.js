const Order = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");

module.exports = {
  saveOrder: async (req, res) => {
    const user = req.user.id;
    const { totalPrice, order } = req.body;
    let loggedUser = await User.findOne({ _id: user });
    let loggedUserDetails = loggedUser[loggedUser.method];
    if (loggedUserDetails.balance >= totalPrice) {
      for (let i = 0; i < order.length; i++) {
        let currentProduct = await Product.findOne({
          _id: order[i].product._id
        });
        if (currentProduct.quantity < order[i].quantity) {
          return res.json(
            `${order[i].quantity} ${
              currentProduct.name
            } isn't availabel in our store!`
          );
        }
      }
      for (let i = 0; i < order.length; i++) {
        await Product.update(
          { _id: order[i].product._id },
          { $inc: { quantity: -order[i].quantity } }
        );
      }
      loggedUserDetails.balance = loggedUserDetails.balance - totalPrice;
      await loggedUser.save();
      Order.findOne({ user: user }).then(foundDoc => {
        if (foundDoc) {
          foundDoc.orders.push(order);
          foundDoc.save().then(() => res.status(200).json("Order Saved"));
        } else {
          Order.create({
            user: user,
            orders: [order]
          }).then(() => res.status(200).json("Order Created"));
        }
      });
      //   return res.json("Products and balance reduced");
      //   const availableOrNotProduct = await Product.find({
      //     _id: { $in: [...orderIDs] }
      //   });
      //   res.json([...orderIDs]);
      //   await res.json(availableOrNotProduct);

      //   res.json(order);
      //   const ordersDoc = await Order.findOne({ user: user });
      //   let availableProducts = [];
      //   let completedChecking = order.length;
      //   order.forEach(el => {
      //     if (el.product.quantity < el.quantity) {
      //       completedChecking--;
      //       return res.json(
      //         `${el.quantity} ${el.product.name} isn't in our store`
      //       );
      //     } else {
      //       availableProducts.push({
      //         id: el.product._id,
      //         quantity: el.quantity
      //       });
      //     }
      //   });
      //   //   res.json(availableProducts);
      //   availableProducts.forEach(async product => {
      //     await Product.findOneAndUpdate(
      //       { _id: product.id },
      //       { $inc: { quantity: -product.quantity } }
      //     );
      //   });
      //   if (!completedChecking) {
      //     res.json("NOW REDUCE USER's BALANCE");
      //   }
    } else {
      return res.json("Not enough Money");
    }
    // res.json(loggedUser);
    // Order.findOne({ user: user }).then(foundDoc => {
    //   if (foundDoc) {
    //     foundDoc.orders.push(order);
    //     foundDoc.save().then(() => res.status(200).json("Order Saved"));
    //   } else {
    //     Order.create({
    //       user: user,
    //       orders: [order]
    //     }).then(() => res.status(200).json("Order Created"));
    //   }
    // });
    // Order.findOne({ user: user })
    //   .populate("user")
    //   .exec((err, ordersDoc) => {
    //     if (err) console.log(err);
    //     // if (loggedUser.balance >= totalPrice) {

    //     // }

    //     if (!ordersDoc) {
    //       res.json("CREATE");
    //     } else {
    //       res.json("ADD");
    //     }
    // const loggedUser = ordersDoc.user[ordersDoc.user.method];
    // if (loggedUser.balance >= totalPrice) {
    //   res.json("Bought");
    // } else {
    //   res.json(ordersDoc);
    // }

    // if (ordersDoc) {
    // } else {
    //   res.json("sheikmna new useri");
    // }
    //   });
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
