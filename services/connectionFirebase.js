//biblioteca do firebase
import firebase from 'firebase/compat/app';
//autenticação de email e senha
import 'firebase/compat/auth';
//trabalha com o banco de dados criado no firebase
import 'firebase/compat/database';

let firebaseConfig = {
  apiKey: "AIzaSyBA4ns87SsEH6ItMfnscMEduwWnc0tq1Y0",
  authDomain: "bdnotesf.firebaseapp.com",
  databaseURL: "https://bdnotesf-default-rtdb.firebaseio.com",
  projectId: "bdnotesf",
  storageBucket: "bdnotesf.appspot.com",
  messagingSenderId: "1067197279709",
  appId: "1:1067197279709:web:56e7889bf935daeb2d5a34"
};

//está verificando se a conexão com o firebase está aberto ou fechado
if (!firebase.apps.length) {
    // Initialize Firebase
     firebase.initializeApp(firebaseConfig);
    }

export default firebase;