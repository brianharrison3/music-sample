const form = document.querySelector('#artist-form')
const url = 'https://proxy-itunes-api.glitch.me/search?term='
const artistInput = document.querySelector('#artist-input')
const songBox = document.querySelector("#song-list");




  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const songText = artistInput.value;
    getSongs(songText);
    form.reset();
  });



function getSongs() {
  fetch(url + "entity=song&" + "term=" + artistInput.value + "&limit=6")
    .then((response) => response.json())
    .then((songResults) => {
      if (songResults.resultCount === 0) {
        const songDiv = document.querySelector('#song-div')
        songDiv.innerText = "No results"
        songDiv.appendChild(songDiv.innerText);
      } else {
      console.log(songResults.results, "songsInfo.results");
      const songsInfoResults = songResults.results;
      renderSongCard(songsInfoResults)
    }})
}





function renderSongCard(data) {
  for (let i of data) {
    
    const songCard = document.createElement("div");
    songCard.classList.add("song-card");
    songBox.appendChild(songCard);

    const albumArt = document.createElement("img"); 
    albumArt.classList.add("song-card");
    albumArt.src = i.artworkUrl100;
    songCard.appendChild(albumArt);

    
    const song = document.createElement("p");
    song.classList.add("song-card");
    song.innerText = i.trackName;
    song.classList.add("song-title");
    songCard.appendChild(song);

    
    const artist = document.createElement("p");
    artist.classList.add("song-card");
    artist.innerText = i.artistName;
    artist.classList.add("artist-name");
    songCard.appendChild(artist);

    
    const songAudio = document.createElement("audio");
    songAudio.classList.add("song-card");
    songAudio.classList.add("audio");
    songAudio.src = i.previewUrl;
    songAudio.controls = true;
    songCard.appendChild(songAudio);

  }
}
