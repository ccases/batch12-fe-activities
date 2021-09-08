// const photos = [];

// async function photoUpload() {
//   let uploadStatus = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       photos.push("Picture");
//       resolve("Photo uploaded");
//     }, 1000);
//   });

//   let result = await uploadStatus;
//   console.log(result);
//   console.log(photos.length);
// }

// photoUpload();
import fetch from "node-fetch";

async function getRandomJoke() {
  let url = "https://api.chucknorris.io/jokes/random";
  try {
    let response = await fetch(url);
    return response.json();
  } catch (e) {
    console.log(e);
  }
}

getRandomJoke().then((response) => {
  console.log(response.value);
});
