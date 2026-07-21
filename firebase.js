import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBujiE-2O-DcEMMkyVPGRDqHAYYaqBFQ8A",
  authDomain: "sarmera-business-hub.firebaseapp.com",
  projectId: "sarmera-business-hub",
  storageBucket: "sarmera-business-hub.firebasestorage.app",
  messagingSenderId: "717296887202",
  appId: "1:717296887202:web:18c8021c5c05932cc33efb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
