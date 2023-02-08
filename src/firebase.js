
import { initializeApp } from "firebase/app"; 

// initialize firebase 

const config = { 
    apiKey: "AIzaSyAaYMA1ildaowUYTLzqpoLsHuD21vg548k",
    authDomain: "elden-ring-boss-slayer.firebaseapp.com",
    databaseURL: "https://elden-ring-boss-slayer-default-rtdb.firebaseio.com/",
    projectId: "elden-ring-boss-slayer",
    storageBucket: "elden-ring-boss-slayer.appspot.com",
    messagingSenderId: "734863872997",
    appId: "1:734863872997:web:7b5bd33bf482ccda44150c"
} 

// setting variable that initializes the app 
const firebase = initializeApp(config); 

//export 
export default firebase; 

