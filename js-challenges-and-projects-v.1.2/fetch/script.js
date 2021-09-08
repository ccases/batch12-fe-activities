import fetch from "node-fetch";

async function getRandomJoke() {
  try {
    let url = "https://api.chucknorris.io/jokes/random";

    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.blob();
  } catch (e) {
    console.log(e);
  }
}

getRandomJoke().then((blob) => {
  console.log(blob.arrayBuffer);
});
