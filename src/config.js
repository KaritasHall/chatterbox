/* eslint-disable no-restricted-globals */

// Here we are making sure that we are connecting to our local server when working
// and not the cloud server. When we deploy our final site it will automatically connect to the cloud
export const localUrl = "http://localhost:5000/chatroom-69853/us-central1/app/";

export const cloudUrl =
  "https://us-central1-chatroom-69853.cloudfunctions.net/app/";

function getServerUrl() {
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    console.log("Working on local server!");
    return localUrl;
  } else {
    return cloudUrl;
  }
}

// Solution found on https://stackoverflow.com/questions/3162457/how-to-check-with-javascript-if-connection-is-local-host

export default getServerUrl;
