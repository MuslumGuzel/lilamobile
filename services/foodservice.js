import * as firebase from 'firebase';
require("firebase/firestore");

class FoodService {

    constructor() {
        this.foodsRef = firebase.firestore().collection('foods');
        this.getOptions = {
            source: 'server'
        };
    }

    getAllFoods = (callback) => {

        this.foodsRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc && doc.exists)
                    callback(doc.id, doc.data());
            });
        });
    }

    getFoodsByCategoryId = (categoryId) => {

        let foodList = new Array();

        return new Promise((resolve, reject) => {

            this.foodsRef
                .where("categoryId", "==", categoryId)
                .get(this.getOptions).then(
                    (querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            if (doc && doc.exists) {

                                let returnObject = {
                                    foodId: doc.id,
                                    foodName: doc.data().name,
                                    foodPrice: doc.data().price
                                };

                                foodList.push(returnObject);
                            }
                        },
                            error => {
                                reject(error);
                            });
                        resolve(foodList);
                    });
        });
    }

    getFoodByFoodId = (foodId) => {

        let food;

        return new Promise((resolve, reject) => {

            this.foodsRef
                .doc(foodId)
                .get(this.getOptions).then(function(doc) {
                    if (doc.exists) {
                        resolve(doc.data());
                    } else {
                        // doc.data() will be undefined in this case
                    }
                }).catch(function(error) {
                    reject(error);
                });
        });
    }
}

export default FoodService;