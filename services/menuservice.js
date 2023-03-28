import * as firebase from 'firebase';
require("firebase/firestore");

class MenuService {

    constructor() {
        this.menusRef = firebase.firestore().collection('menus');
        this.getOptions = {
            source: 'server'
        };
    }

    getAllMenus = (callback) => {

        this.menusRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc && doc.exists)
                    callback(doc.id, doc.data());
            });
        });
    }

    getMenusByRestaurantId = async (restaurantId) => {

        let menuList = new Array();

        return new Promise((resolve, reject) => {

            this.menusRef
                .where("restaurantId", "==", restaurantId)
                .get(this.getOptions).then(
                    (querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            if (doc && doc.exists) {

                                let returnObject = {
                                    menuId: doc.id,
                                    data: {
                                        name: doc.data().name
                                    }
                                };

                                menuList.push(returnObject);
                            }
                        },
                            error => {
                                reject(error);
                            });
                        resolve(menuList);
                    });
        });
    }
}

export default MenuService;