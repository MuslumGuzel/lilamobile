import * as firebase from 'firebase';
require("firebase/firestore");

class CategoryService {

    constructor() {
        this.categorysRef = firebase.firestore().collection('categories');
        this.getOptions = {
            source: 'server'
        };
    }

    getAllCategories = (callback) => {

        this.categorysRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc && doc.exists)
                    callback(doc.id, doc.data());
            });
        });
    }

    getCategorysByMenuId = (menuId) => {

        let categoryList = new Array();

        return new Promise((resolve, reject) => {

            this.categorysRef
                .where("menuId", "==", menuId)
                .get(this.getOptions).then(
                    (querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            if (doc && doc.exists) {

                                let returnObject = {
                                    categoryId: doc.id,
                                    data: {
                                        name : doc.data().name
                                    }
                                };

                                categoryList.push(returnObject);
                            }
                        },
                            error => {
                                reject(error);
                            });
                        resolve(categoryList);
                    });
        });
    }
}

export default CategoryService;