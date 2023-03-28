import * as firebase from 'firebase';
import Configuration from '../config/config';

class FirebaseDataBase {
    
    initialize = () => {
        if(!firebase.apps.length)
            firebase.initializeApp(Configuration.fireBaseConfig);
    };

    offlineWork = () => {
        firebase.database().goOffline();
    }

    onlineWork = () => {
        firebase.database().goOnline();
    }

    insert = (documentPath, willBeInsertedData) => {
        firebase.database().ref(documentPath).set(willBeInsertedData)
        .then(() => {
            console.log('INSERTED');
        })
        .catch((error) => {
            console.log(error);
        })
    };

    update = (documentPath, willBeUpdatedData) => {
        firebase.database().ref(documentPath).update(willBeUpdatedData)
        .then(() => {
            console.log('UPDATED');
        })
        .catch((error) => {
            console.log(error);
        })
    }

    delete = (documentPath) => {
        firebase.database().ref(documentPath).remove();
    }

    select = (documentPath, callback) => {
        firebase.database().ref(documentPath).once('value', (data) => {
            callback(data.toJSON());
        })
    }

    selectOnRealTime = (documentPath, callback) => {
        firebase.database().ref(documentPath).on('value', (data) => {
            callback(data.toJSON());
        })
    }
}

export default FirebaseDataBase;