import firebase from 'firebase';
import Configuration from '../config/config';

class FirestoreDataBase {
    
    initialize = () => {
        if(!firebase.apps.length)
            firebase.initializeApp(Configuration.fireBaseConfig);
    };
}

export default FirestoreDataBase;