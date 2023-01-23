// This file is for the "Send an authentication link to the user's email address"
// Part one: Construct the ActionCodeSettings object, which provides Firebase with instructions on how to construct the email link. Set the following fields


const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.

    // DON´T FORGET TO CHANGE THIS URL ONCE WE HAVE HOSTED THE FRONT-END!!!!

    url: 'https://www.example.com/finishSignUp?cartId=1234',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'example.page.link'
  };

  export default actionCodeSettings;