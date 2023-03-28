import * as firebase from 'firebase';
require("firebase/firestore");

class CartService {

    constructor() {
        this.cartsRef = firebase.firestore().collection('carts');
        this.getOptions = {
            source: 'server'
        };
    }

    getAllCarts = (callback) => {

        this.cartsRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc && doc.exists)
                    callback(doc.id, doc.data());
            });
        });
    }

    getCartsByCreatorUser = async () => {

        let cartList = new Array();

        return new Promise((resolve, reject) => {

            this.cartsRef
                .where("createdby", "==", "alternatifaziz@gmail.com")
                .where("isActive", "==", true)
                .get(this.getOptions).then(
                    (querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            if (doc && doc.exists) {

                                let returnObject = {
                                    cartId: doc.id,
                                    data: doc.data()
                                };

                                cartList.push(returnObject);
                            }
                        },
                            error => {
                                reject(error);
                            });
                        resolve(cartList);
                    });
        });
    }

    getCartFoodsByCartId = async (cartId) => {

        let cartFoodList = new Array();

        return new Promise((resolve, reject) => {

            this.cartsRef
                .doc(cartId)
                .collection("cartfoods")
                .get(this.getOptions).then(
                    (querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            if (doc && doc.exists) {

                                let returnObject = {
                                    cartFoodId: doc.id,
                                    data: doc.data()
                                };

                                cartFoodList.push(returnObject);
                            }
                        },
                            error => {
                                reject(error);
                            });
                        resolve(cartFoodList);
                    });
        });
    }

    cartExists = async (inputData) => {

        let cartList = new Array();

        return new Promise((resolve, reject) => {

            this.cartsRef
                .where("createdby", "==", "alternatifaziz@gmail.com")
                .where("isActive", "==", true)
                .where("restaurantId", "==", inputData.restaurantId)
                .get(this.getOptions).then(
                    (querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            if (doc && doc.exists) {

                                let returnObject = {
                                    cartId: doc.id,
                                    data: doc.data()
                                };

                                cartList.push(returnObject);
                            }
                        },
                            error => {
                                reject(error);
                            });
                        resolve(cartList);
                    });
        });
    }

    createCartWithUser = async (inputData) => {

        return new Promise((resolve, reject) => {

            let docData = {
                restaurantId: inputData.restaurantId,
                userId: inputData.userId,
                isActive: true,
                createdby: "alternatifaziz@gmail.com",
                createdate: firebase.firestore.Timestamp.fromDate(new Date())
            };

            this.cartsRef
                .add(docData)
                .then((doc) => {
                    resolve(doc.id);
                })
                .catch((err) => reject(err));
        });
    }

    addFoodToCart = async (foodInfo) => {

        return new Promise((resolve, reject) => {

            let docData = {
                foodId: foodInfo.foodId,
                foodName: foodInfo.foodName,
                foodPrice: foodInfo.foodPrice,
                orderItemCount: foodInfo.orderItemCount,
                createdby: "alternatifaziz@gmail.com",
                createdate: firebase.firestore.Timestamp.fromDate(new Date())
            };

            this.cartsRef.doc(foodInfo.cartId).collection("cartfoods")
                .add(docData);
        });
    }

    foodisExistInCart = async (cartId, foodId) => {

        let cartFood = new Array();

        return new Promise((resolve, reject) => {

            this.cartsRef.doc(cartId).collection("cartfoods")
                .where("foodId", "==", foodId)
                .get(this.getOptions).then(
                    (querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            if (doc && doc.exists) {

                                let returnObject = {
                                    cartFoodId: doc.id,
                                    orderItemCount: doc.data().orderItemCount
                                };

                                cartFood.push(returnObject);
                            }
                        },
                            error => {
                                reject(error);
                            });
                        resolve(cartFood);
                    });
        });
    }

    updateCart = async (cartId, newIsActiveValue) => {

        return new Promise((resolve, reject) => {

            this.cartsRef
                .doc(cartId)
                .update(
                    {
                        isActive: newIsActiveValue
                    }
                )
                .then(() => {
                    resolve("Cart is updated");
                })
                .catch((err) => reject(err));
        });
    }

    updateCartFoods = async (cartId, cartFoodId, newOrderItemCount) => {

        return new Promise((resolve, reject) => {

            this.cartsRef
                .doc(cartId)
                .collection("cartfoods")
                .doc(cartFoodId)
                .update(
                    {
                        orderItemCount: newOrderItemCount
                    }
                )
                .then(() => {
                    resolve("Cart is updated");
                })
                .catch((err) => reject(err));
        });
    }

    deleteCartFoods = async (cartId, cartFoodId) => {

        return new Promise((resolve, reject) => {

            this.cartsRef
                .doc(cartId)
                .collection("cartfoods")
                .doc(cartFoodId)
                .delete()
                .then(() => {
                    resolve("Cart is deleted");
                })
                .catch((err) => reject(err));
        });
    }
}

export default CartService;