import * as firebase from 'firebase';
require("firebase/firestore");

class ProcessStatusService {

    constructor() {
        this.processStatussRef = firebase.firestore().collection('processstatus');
        this.getOptions = {
            source: 'server'
        };
    }

    getAllProcessStatus = (callback) => {

        let processStatusList = new Array();

        return new Promise((resolve, reject) => {

            this.processStatussRef.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc && doc.exists) {
                        let returnObject = {
                            processStatusId: doc.id,
                            data: {
                                name: doc.data().name
                            }
                        };

                        processStatusList.push(returnObject);
                    }
                },
                    error => {
                        reject(error);
                    });

                resolve(processStatusList);
            });
        })
    }

    getProcessStatussById = (id) => {

        return new Promise((resolve, reject) => {

            this.processStatussRef
                .doc(id)
                .get()
                .then(function(doc) {
                        if (doc.exists) {
                            let returnObject = {
                                processStatusId: doc.id,
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

export default ProcessStatusService;