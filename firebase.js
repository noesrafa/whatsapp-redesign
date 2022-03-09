import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBXYG1BCMA0Q51dnn1ZVsqJWN5NbvurKOY",
    authDomain: "whatskiller-soyrafadev.firebaseapp.com",
    projectId: "whatskiller-soyrafadev",
    storageBucket: "whatskiller-soyrafadev.appspot.com",
    messagingSenderId: "779400848297",
    appId: "1:779400848297:web:4a6c60532fe56f3ab95ab8",
    measurementId: "G-87YFPKF29R"
  }; 

const timestamp = firebase.firestore.FieldValue.serverTimestamp()

// Use this to initialize the firebase app
const firebaseApp = firebase.initializeApp(firebaseConfig)

// Use this for db & auth
const db = firebaseApp.firestore()
const auth = firebase.auth()

// Google authentication
const provider = new firebase.auth.GoogleAuthProvider()

// Exportamos estas pro separado
export { auth, provider, timestamp }

// db lo exportamos por default ya que lo usaremos mas
export default db
