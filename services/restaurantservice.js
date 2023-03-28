import * as firebase from 'firebase';
require("firebase/firestore");

class RestaurantService {

    constructor() {
        this.restaurantsRef = firebase.firestore().collection('restaurants');
        this.getOptions = {
            // source: 'server'
        };
    }

    getAllRestaurants = (callback) => {

        this.restaurantsRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc && doc.exists)
                    callback(doc.id, doc.data());
            });
        });
    }

    getRestaurantsByCreatedBy = () => {

        let restaurantList = new Array();
        console.log("getRestaurantsByCreatedBy");

        return new Promise((resolve, reject) => {

            this.restaurantsRef
                .where("createdby", "==", "alternatifaziz@gmail.com")
                .get(this.getOptions).then(
                    (querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            if (doc && doc.exists) {

                                let returnObject = {
                                    restaurantId: doc.id,
                                    data: {
                                        name: doc.data().name
                                    }
                                };

                                restaurantList.push(returnObject);
                            }
                        },
                            error => {
                                reject(error);
                            });
                        resolve(restaurantList);
                    });
        });
    }

    getRestaurantsById = (id) => {

        return new Promise((resolve, reject) => {

            this.restaurantsRef
                .doc(id)
                .get()
                .then(function(doc) {
                        if (doc.exists) {
                            let returnObject = {
                                restaurantId: doc.id,
                                data: {
                                    name: doc.data().name
                                }
                            };

                            resolve(returnObject);
                        } else {
                            // doc.data() will be undefined in this case
                        }
                    }).catch(function(error) {
                        reject(error);
                    });
        });
    }
}

export default RestaurantService;