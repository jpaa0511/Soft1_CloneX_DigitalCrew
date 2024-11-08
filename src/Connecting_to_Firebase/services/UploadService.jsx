import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../firebase";

export function uploadFile(file, folder = "avatar") {
  return new Promise((resolve, reject) => {
    if (!file) {
      console.error("No file selected");
      reject(new Error("No file selected"));
      return;
    }

    const uniqueId = uuidv4();
    const fileExtension = file.name.split(".").pop();
    const uniqueFileName = `${uniqueId}.${fileExtension}`;
    const storageRef = ref(storage, `${folder}/${uniqueFileName}`);

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("File uploaded successfully!", snapshot);
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        console.log("Download URL:", downloadURL);
        resolve(downloadURL);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        reject(error);
      });
  });
}
