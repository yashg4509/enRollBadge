import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APP_ID
}

// const firebaseConfig = {
//   apiKey: "AIzaSyDDYcmTrSmsQ9IN3hwISXclB6mmKRlhbDc",
//   authDomain: "uw-madison-course-notification.firebaseapp.com",
//   projectId: "uw-madison-course-notification",
//   storageBucket: "uw-madison-course-notification.appspot.com",
//   messagingSenderId: "72175685541",
//   appId: "1:72175685541:web:e277f1dbf72b423ece224c"
// };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
