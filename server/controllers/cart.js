const Cart = require("../models/cart");

module.exports = {
  addItemToCart: (req, res) => {
    const user = req.user.id;
    const item = {
      product: req.body.product,
      quantity: req.body.quantity
    };

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
        } else {
          foundCart.items.push(item);
          foundCart.save().then(() => res.status(200).json("Item Added"));
        }
      } else {
        Cart.create({
          user: user,
          items: [item]
        }).then(() => res.status(200).json("Cart Created"));
      }
    });
  },
  getCartItems: (req, res) => {
    Cart.findOne({ user: req.user.id })
      .populate("items.product")
      .exec((err, cart) => {
        if (!cart) {
          return res.send(null);
        }
        res.send(cart);
      });
  },
  removeItemFromCart: (req, res) => {
    Cart.findById(req.body.cartId).then(foundCart => {
      foundCart.items = foundCart.items.filter(
        item => item._id != req.body.itemId
      );
      foundCart.save(() => res.status(200).json("Item Removed"));
    });
  },
  emptyCart: (req, res) => {
    Cart.findByIdAndRemove(req.body.cartID)
      .then(() => res.status(200).json("Empty Cart"))
      .catch(err => res.send(err));
  }
};
