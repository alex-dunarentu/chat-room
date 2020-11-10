import firebase from "firebase/app";
import "firebase/firestore";

const config = {

};

firebase.initializeApp(config);

export const addChat = async (message, username, room, chats) => {
  const now = new Date();
  const chat = {
    message: message,
    username: username,
    room: room,
    created_at: firebase.firestore.Timestamp.fromDate(now),
  };
  const response = await chats.add(chat);
  return response;
};

export const getChats = (chats, callback, room) => {
  chats
    .where("room", "==", room)
    .orderBy("created_at")
    .onSnapshot((snapshot) => {
      const result = [];
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          result.push(change.doc.data());
        }
      });
      callback(result);
    });
};

export const db = firebase.firestore();
export default firebase;
