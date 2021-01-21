# Epitome

An app to summarize your days and months. Made with Expo SDK v40.0.0.

### Usage

- Install Expo using this [Installation Documentation](https://docs.expo.io/get-started/installation/).
- Install Firebase

  ```
  expo install firebase
  ```

- Clone the repository

  ```
  git clone https://github.com/Insiyaa/epitome.git
  cd epitome
  ```

- Create a Firebase account following [this video](https://www.youtube.com/watch?v=E6AXbYwRrdE&feature=emb_logo).
- Create `firebase.js` with your keys.
  ```javascript
  export default {
    apiKey: "COPY_FROM_FIREBASE",
    authDomain: "COPY_FROM_FIREBASE",
    databaseURL: "COPY_FROM_FIREBASE",
    projectId: "COPY_FROM_FIREBASE",
    storageBucket: "COPY_FROM_FIREBASE",
    messagingSenderId: "COPY_FROM_FIREBASE",
    appId: "COPY_FROM_FIREBASE",
  };
  ```
- Install dependencies using `npm` and start the app.
  ```
  npm install
  expo start
  ```

Thank you. Feel free to provide suggestions and contributions.

## References

- [Expo Documentation](https://docs.expo.io/)
- [Firebase](https://firebase.google.com/docs/auth/web/firebaseui)
- [Expo Firebase Authentication](https://medium.com/swlh/expo-firebase-authentication-cloud-firestore-using-async-await-react-hooks-700920ad4b2b)
