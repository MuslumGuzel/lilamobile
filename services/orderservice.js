import * as firebase from 'firebase';
require("firebase/firestore");
import ProcessStatusService from './processstatusservice';
import RestaurantService from './restaurantservice';

class OrderService {

    constructor() {
        this.ordersRef = firebase.firestore().collection('orders');
        this.orderFoodsRef = firebase.firestore().collection('orderfoods');
        this.getOptions = {
            source: 'server'
        };
        this.processStatusService = new ProcessStatusService();
        this.restaurantService = new RestaurantService();
    }

    getOrdersByCreatorUser = async () => {

        let orderList = new Array();

        return new Promise((resolve, reject) => {

            this.ordersRef
                .where("createdby", "==", "alternatifaziz@gmail.com")
                .get(this.getOptions).then(
                    (querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            if (doc && doc.exists) {

                                let returnObject = {
                                    orderId: doc.id,
                                    data: {
                                        orderId: doc.id,
                                        tableNo: doc.data().tableNo,
                                        processStatusId: doc.data().processStatusId,
                                        processStatusName: doc.data().processStatusName,
                                        restaurantName: doc.data().restaurantName
                                    }
                                };

                                orderList.push(returnObject);
                            }
                        },
                            error => {
                                reject(error);
                            });
                        resolve(orderList);
                    });
        });
    }

    getOrderFoodsByOrderId = async (orderId) => {

        let orderFoodList = new Array();

        return new Promise((resolve, reject) => {

            this.ordersRef
                .doc(orderId)
                .collection("orderfoods")
                .get(this.getOptions).then(
                    (querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            if (doc && doc.exists) {

                                let returnObject = {
                                    orderFoodId: doc.id,
                                    data: doc.data()
                                };

                                orderFoodList.push(returnObject);
                            }
                        },
                            error => {
                                reject(error);
                            });
                        resolve(orderFoodList);
                    });
        });
    }

    createOrderWithUser = async (inputData) => {

        return new Promise((resolve, reject) => {

            let docData = {
                restaurantId: inputData.restaurantId,
                restaurantName: inputData.restaurantName,
                userId: inputData.userId,
                processStatusId: inputData.processStatusId,
                tableNo: inputData.tableNo,
                createdby: "alternatifaziz@gmail.com",
                createdate: firebase.firestore.Timestamp.fromDate(new Date())
            };

            this.ordersRef
                .add(docData)
                .then((doc) => {
                    resolve(doc.id);
                })
                .catch((err) => reject(err));
        });
    }

    addFoodToOrder = async (foodInfo) => {

        return new Promise((resolve, reject) => {

            let docData = {
                orderId: foodInfo.orderId,
                foodId: foodInfo.foodId,
                foodName: foodInfo.foodName,
                foodPrice: foodInfo.foodPrice,
                orderItemCount: foodInfo.orderItemCount,
                createdby: "alternatifaziz@gmail.com",
                createdate: firebase.firestore.Timestamp.fromDate(new Date())
            };

            this.orderFoodsRef
                .add(docData)
                .then((data) => {
                    resolve("OrderFood is created", data.id);
                })
                .catch((err) => reject(err));;
        });
    }
}

export default OrderService;