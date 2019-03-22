const Cart = require("../models/cart");

module.exports = {
  addItemToCart: (req, res) => {
    const user = req.user.id;
    const item = {
      product: req.body.product,
      quantity: req.body.quantity
    };
    ///////////// Start//////////////
    // const getCartItems = id => {
    //   Cart.findOne({ user: id })
    //     .populate("items.product")
    //     .exec((err, cart) => {
    //       if (!cart) {
    //         return res.json({ items: [] });
    //       }
    //       res.send(cart);
    //     });
    // };
    ///////////// End /////////////
    Cart.findOne({ user: user }).then(foundCart => {
      if (foundCart) {
        let products = foundCart.items.map(item => item.product + "");
        if (products.includes(item.product)) {
          Cart.findOneAndUpdate(
            {
              user: user,
              items: {
                $elemMatch: { product: item.product }
              }
            },
            {
              $inc: { "items.$.quantity": item.quantity }
            }
          )
            .exec()
            .then(() => res.status(200).json("Quantity Increased"));
          // getCartItems(req.user.id);
        } else {
          foundCart.items.push(item);
          foundCart.save().then(
            () => res.status(200).json("Item Added")
            // getCartItems(req.user.id)
          );
        }
      } else {
        Cart.create({
          user: user,
          items: [item]
        }).then(
          () => res.status(200).json("Cart Created")
          // getCartItems(req.user.id)
        );
      }
    });
  },
  getCartItems: (req, res) => {
    Cart.findOne({ user: req.user.id })
      .populate("items.product")
      .exec((err, cart) => {
        if (!cart) {
          return res.json({ items: [] });
        }
        res.send(cart);
      });
  },
  removeItemFromCart: (req, res) => {
    Cart.findOne({ user: req.user.id }).then(foundCart => {
      if (foundCart) {
        foundCart.items = foundCart.items.filter(
          item => item._id != req.body.itemId
        );
        foundCart.save(() =>
          res
            .status(200)
            .json({ message: "Item Removed", data: foundCart.items })
        );
      }
    });
  },
  emptyCart: (req, res) => {
    Cart.findByIdAndRemove(req.body.cartID)
      .then(() => res.status(200).json("Empty Cart"))
      .catch(err => res.send(err));
  }
};
