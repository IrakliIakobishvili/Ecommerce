![](http://imgur.com/t3teAxi.png)
### :handbag: A simple RESTful API for Purchases and Products


## Overview
An online marketplace application with buyer accounts, product search and suggestions, shopping cart, order management, and payment processing with PayPal - developed using React, Redux, Node, Express and MongoDB.


## Features

**Registration Features**

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| Local | &#10004; | Ability to Register Locally |
| Google | &#10004; | Ability to Register With Google |
| Facebook | &#10004; | Ability to Register With Facebook |
| Confirmation | &#10004; | Ability to Receive Confirmation Email |

**Users Features**

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| Register a User | &#10004; | Ability of Register a new User |
| See Users | &#10004; | Ability to see Registered Users |
| Block User | &#10004; | Ability of Block a User |
| Update User | &#10004; | Ability to Update User Info |

**Products Features**

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| Add a Product | &#10004; | Ability of Add a Product on the System |
| List Products | &#10004; | Ability of List Products |
| Edit a Product | &#10004; | Ability of Edit a Product |
| Delete a Product | &#10004; | Ability of Delete a Product |
| Stock | &#10004; | Ability of Update the Stock |
| Stock History | &#10004; | Ability to see the Stock History |

**Categories Features**

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| Add a Category | &#10004; | Ability of Add a Category on the System |
| List Category | &#10004; | Ability of List Category |
| Edit a Category | &#10004; | Ability of Edit a Category |
| Delete a Category | &#10004; | Ability of Delete a Category |

**Purchase Features**

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| Create a Cart | &#10004; | Ability of Create a new Cart |
| See Cart | &#10004; | Ability to see the Cart and it items |
| Remove a Cart | &#10004; | Ability of Remove a Cart |
| Add Item | &#10004; | Ability of add a new Item on the Cart |
| Remove a Item | &#10004; | Ability of Remove a Item from the Cart |
| Checkout | &#10004; | Ability to Checkout |

**Checkout Features**

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| Local  | &#10004; | Ability to Pay With Local Balance |
| PayPal | &#10004; | Ability to Pay With PayPal |
| History | &#10004; | Ability To See Payment History |
| Notification | &#10004; | Ability to Receive Payment Details On Email |

**Contact Features**

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| Receive  | &#10004; | Ability to Receive Messages |
| Send | &#10004; | Ability to Send Message |
| History | &#10004; | Ability To See All Messages |

**Chat Features**

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| Receive  | &#10004; | Ability to Receive Personal Message |
| Send | &#10004; | Ability to Send Personal Message |

**Reviews Features**

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| Comment  | &#10004; | Ability to Leave Review |
| Star | &#10004; | Ability to Leave Rating |
| Switch | &#10004; | Ability To Hide Review |


## Technologies & Tools

### Front End:

* React
* React-facebook-login
* React-google-login
* React-paypal-express-checkout
* Redux
* Redux-form
* Redux-thunk
* Axios

### Back End:

* Node/Express
* MongoDB/Mongoose
* Nodemailer
* Passport
* Multer
* JWT
* Joi

## Installation and Usage

### Requirements:

* Node.js installed
* MongoDB connection

### Steps:
1. Clone repo on your local machine:
```
$ git clone https://github.com/IrakliIakobishvili/Ecommerce.git
```
2. Install server-side dependencies:
```
$ cd Ecommerce
$ npm install
```
3. Install client-side dependencies:
```
$ cd client
$ npm install
```
4. In index.js file (config folder) replace mongoDB, Google, Facebook and Email secret keys with your own.
```
oauth: {
    google: {
      clientID: "##########",
      clientSecret: "##########"
    },
    facebook: {
      clientID: "##########",
      clientSecret: "##########"
    }
  },
  paypal: {
    clientID: "##########"
  },
  MONGODB_URI: "##########"
```
5. Build the app:
```
$ npm run build
```
6. Execute the app:
```
$ cd ..
$ npm run start-dev
```
7. App now running on ```localhost:5000```







These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Built With

* [React](https://reactjs.org/) - JavaScript Library for Building User Interfaces
* [Redux](https://redux.js.org/) - Predictable State Container for JavaScript Apps
* [Node](https://nodejs.org/) - JavaScript Runtime Environment
* [MongoDB](https://www.mongodb.com/) - Fully Managed Cloud Database

## Authors

* **Tekle Macharadze**  - [0amon0](https://github.com/0amon0)
* **Khatia Akhalkatsishvili** - [akhalkatsishvili](https://github.com/akhalkatsishvili)
* **Irakli Iakobishvili** - [IrakliIakobishvili](https://github.com/IrakliIakobishvili)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
