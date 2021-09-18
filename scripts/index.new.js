/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */

 let sortedPlaylistsVar = sortedPlaylists(); // Global variable for playlists
 let globalSongsArraySorted = [] // Global variable for songs

 for (let i =0; i<player.songs.length; i++){ // Adding the default songs to the array
   globalSongsArraySorted.push(player.songs[i])
 }

 globalSongsArraySorted = sortedSongs(globalSongsArraySorted)

 let timer = 0; // Time passed
 let currently = [] // The first index is currently playing
 let intervalIndicator; // start/stop interval
 let globalId; // Helps to navigate which song to play and when to start (-1 stops the play)

 function playSong(songId) {
  // Your code here
}

/**
* Removes a song from the player, and updates the DOM to match.
*
* @param {Number} songId - the ID of the song to remove
*/
function removeSong(songId) {
  let songIdEl = document.getElementById("song " + String(songId)) // Finding the song element 
  songIdEl.remove() // Remove from DOM

  for (let i =0; i<globalSongsArraySorted.length; i++){ // Updates the global songs variable
    if (String(globalSongsArraySorted[i].id) === String(songId)){
      globalSongsArraySorted.splice(i, 1);
    }
  }

  if (currently.includes(songId)){ // Reset the duration time play if the playing song has removed
    timer = 0;
  }

  if (globalSongsArraySorted.length === 0){ // In case no songs left
    throw Error("No songs in player!")
  }

  for (let i = 0; i<sortedPlaylistsVar.length; i++){ // Update the playlists when song is removed 
    for (let a =0; a<sortedPlaylistsVar[i].songs.length; a++){
      if (sortedPlaylistsVar[i].songs[a] === Number(songId)){
          sortedPlaylistsVar[i].songs.splice(a, 1)
          let parent = document.querySelectorAll("#playlists .list")[0]

          // Updating the DOM
          while (document.querySelectorAll("#playlists .list")[0].firstChild){ 
            parent.removeChild(document.querySelectorAll("#playlists .list")[0].firstChild);
          }
          generatePlaylists()
      }
    }  
  } 
}

/**
* Adds a song to the player, and updates the DOM to match.
*/
function addSong({ title, album, artist, duration, coverArt }) {
  let newId;
  let added = false; // Indicates if new id generated 
  let idSongsArray = songsArray() // Gets the currently ids 

  while (added === false){ // generates new available id
    newId = getRandomInt();

    if (!idSongsArray.includes(String(newId))){
      added = true;
      idSongsArray.push(String(newId))
    }
  }

  let song ={
    id: newId,
    title: title,
    album: album,
    artist: artist,
    duration: duration,
    coverArt: coverArt
  }

  // Updating the global songs variable 
  globalSongsArraySorted.push(song)
  globalSongsArraySorted = sortedSongs(globalSongsArraySorted)

  // Adding new song to DOM
  let newSongEl;
  let parent = document.querySelectorAll(".list")[0]

  while (document.querySelectorAll(".list")[0].firstChild){
    parent.removeChild(document.querySelectorAll(".list")[0].firstChild);
  }

  for (let newSong of globalSongsArraySorted){
    newSongEl = createSongElement(newSong)
    parent.appendChild(newSongEl)
  }

  // Finds the song in playlist to remove it
  let parentDurationEl = document.getElementById("song " + String(newId))
  let durationEl = parentDurationEl.getElementsByClassName("song-duration")[0]

  // Painting the duration number depends on the length
  if (durationFormatReverse(durationEl.textContent) <= 120){
    durationEl.style.color = "rgb(1, 254, 1)"
  }
  if (durationFormatReverse(durationEl.textContent) >= 420){
    durationEl.style.color = "rgb(254, 1, 1)"
  }
  if (durationFormatReverse(durationEl.textContent) < 420 && durationFormatReverse(durationEl.textContent) > 120){
    durationEl.style.color = "rgb(122, 122, 1)"
  }

  }

/**
* Acts on a click event on an element inside the songs list.
* Should handle clicks on play buttons and remove buttons of songs.
*
* @param {MouseEvent} event - the click event
*/
function handleSongClickEvent(event) {
  // Finds the clicked song id
  let parent = event.target.parentNode
  let songEl = parent.parentNode.parentNode
  let id = songEl.id

  // Checks if the song id has 3 digits number
  if (id.length === 6){ 
    globalId = id[5]
  }

  if (id.length === 7){
    globalId = id[5] + id[6]
  }

  if (id.length === 8){
    globalId = id[5] + id[6] + id[7]
  }

  clearInterval(intervalIndicator) // Clear existed interval
  intervalIndicator = setInterval(function(){if (globalId !== -1) {playSong(globalId)}}, 1000) // Starts to play song each 1 second
}

/**
* Handles a click event on the button that adds songs.
*
* @param {MouseEvent} event - the click event
*/
function handleAddSongEvent(event) {
  // Assigning input values
  song = {
    title: document.getElementsByName('title')[0].value,
    album: document.getElementsByName('album')[0].value,
    artist: document.getElementsByName('artist')[0].value,
    duration: document.getElementsByName('duration')[0].value,
    coverArt: document.getElementsByName('cover-art')[0].value
  }
  addSong(song)
}

/**
* Creates a song DOM element based on a song object.
*/
function createSongElement({ id, title, album, artist, duration, coverArt }) {
  const children =[]

  if (String(duration).includes(":")){
    children.push(title, artist, album, duration, "Play", "Remove")
  }
  else if(!String(duration).includes(":")){
    children.push(title, artist, album, durationFormat(duration), "Play", "Remove")
  }

  const classes = ["song"]
  const attrs = {id: id}
  return createElement("div", children, classes, attrs, coverArt)
}

/**
* Creates a playlist DOM element based on a playlist object.
*/
function createPlaylistElement({ id, name, songs }) {
  const children = [name, songs.length + " songs", durationFormat(playlistDuration(songs))]
  const classes = ["playlist"]
  const attrs = {id: id}
  return createElement("div", children, classes, attrs, "", songs)
}

/**
* Creates a new DOM element.
*
* Example usage:
* createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"}, {click: (...) => {...}})
*
* @param {String} tagName - the type of the element
* @param {Array} children - the child elements for the new element.
*                           Each child can be a DOM element, or a string (if you just want a text element).
* @param {Array} classes - the class list of the new element
* @param {Object} attributes - the attributes for the new element
* @param {Object} eventListeners - the event listeners on the element
*/
function createElement(tagName, children = [], classes = [], attributes = {}, image, songs) {
  // Creating DOM as given example in index.new.html file
  let element = document.createElement(tagName)
  let leftSide = document.createElement("div")
  let songDetails;
  leftSide.setAttribute("class", "left")
  let rightSide = document.createElement("div")
  rightSide.setAttribute("class", "right")
  element.appendChild(leftSide)
  element.appendChild(rightSide)

  if (image){
    songDetails = document.createElement("div")
    songDetails.setAttribute("class", "song-details")
    let coverArt = document.createElement("img")
    coverArt.setAttribute("src", `${image}`)
    leftSide.appendChild(coverArt)
    leftSide.appendChild(songDetails)
  }
 
  for (let [attribute, value] of Object.entries(attributes)) {
      if (attribute === "id" && image){
          element.setAttribute(`${attribute}`, "song " + String(value))
      }
      else{
          element.setAttribute(`${attribute}`, `${value}`)
      }
      
  }

  for (let c of classes) {
      element.classList.add(`${c}`)
  }

  if (image){
    let leftChildren = children.splice(0,3)
    for (let child of leftChildren) {
        const newChild = document.createElement(tagName)
        newChild.textContent = `${child}`
        songDetails.appendChild(newChild)
  }
    newChild = document.createElement("div")
    newChild.textContent = `${children[0]}`
    newChild.classList.add("song-duration")
    rightSide.appendChild(newChild)
    
    newChild = document.createElement("div")
    newChild.classList.add("song-actions")
    rightSide.appendChild(newChild)

    let newPlayChild = document.createElement("button")
    newPlayChild.classList.add("play-button")
    newPlayChild.textContent = `${children[1]}`
    newChild.appendChild(newPlayChild)

    let newRemoveChild = document.createElement("button")
    newRemoveChild.classList.add("remove-button")
    newRemoveChild.textContent = `${children[2]}`
    newChild.appendChild(newRemoveChild)
  }

  if(!image){
    let newNameEl = document.createElement("div")
    newNameEl.classList.add("name")
    newNameEl.textContent = `${children[0]}`
    leftSide.appendChild(newNameEl)

    let playlistLengthEl = document.createElement("div")
    playlistLengthEl.classList.add("playlist-length")
    playlistLengthEl.textContent = `${children[1]}`
    rightSide.appendChild(playlistLengthEl)

    let playlistDurationEl = document.createElement("div")
    playlistDurationEl.classList.add("playlist-duration")
    playlistDurationEl.textContent = `${children[2]}`
    rightSide.appendChild(playlistDurationEl)

    let songsEl;

    for (let i =0; i<songs.length; i++){ // Adds the playlists songs to DOM
      songsEl = document.createElement("div")
      songsEl.textContent = String(songs[i])
      songsEl.classList.add("playlist-song")
      rightSide.appendChild(songsEl)
    }
  }

  return element
}

/**
* Inserts all songs in the player as DOM elements into the songs list.
*/
function generateSongs() {
  let i = 0 // song index
  let durationEl;

  for (let song of sortedSongs(player.songs)){ // Displaying the default songs
      document.querySelectorAll(".list")[0].appendChild(createSongElement(song))

      // Painting the duration number depends on the length
      if (song.duration <= 120){
        durationEl = document.getElementsByClassName("song-duration")[i]
        durationEl.style.color = "rgb(1, 254, 1)"
      }

      if(song.duration >= 420){
        durationEl = document.getElementsByClassName("song-duration")[i]
        durationEl.style.color = "rgb(254, 1, 1)"
      }

      if(song.duration < 420 && song.duration > 120){
        durationEl = document.getElementsByClassName("song-duration")[i]
        durationEl.style.color = "rgb(122, 122, 1)"
      }

      i++;
       }
}

/**
* Inserts all playlists in the player as DOM elements into the playlists list.
*/
function generatePlaylists() {
  for (let playlist of sortedPlaylistsVar){ // Displaying the playlists
      document.querySelectorAll(".list")[1].appendChild(createPlaylistElement(playlist))
      }
}

function sortedPlaylists() { // Sorts the songs and the playlists by their names.
  let playlistArr = [] ;

  for (let i =0; i<player.playlists.length; i++){ // Adds playlist name to array
  
      playlistArr.push(player.playlists[i].name);  
  }

  // Sorts the array by their names.
  playlistArr = playlistArr.sort()

  let playlistsArrSorted = [];
  let playlistIndex;

  for (let i =0; i<playlistArr.length; i++){
    playlistIndex = player.playlists.findIndex(a => a.name === playlistArr[i]) // finds the index of the id in the playlists array
    playlistsArrSorted.push(player.playlists[playlistIndex]);
  }

  return playlistsArrSorted
}

function playlistDuration(songs) { // Returns the playlist duration
  let totalDuration = 0;
  let songsArr = songs
  let songIndex;

  for (let i =0; i<songsArr.length; i++){
    songIndex = player.songs.findIndex(a => a.id === songsArr[i]) // finds the index of the id in the songs array.
    totalDuration += player.songs[songIndex].duration; // Sums the durations. 
  }

  return totalDuration; 
}

function durationFormat(duration) { // Converts the duration from seconds to mm:ss format
  let date = new Date(duration * 1000);
  let mm = date.getUTCMinutes(); // minutes
  let ss = date.getSeconds(); // seconds

  if(mm<10 && ss < 10){
    return "0" + mm + ":" + "0" + ss
  }

  if(mm>=10 && ss>=10){
    return mm + ":" + ss
  }

  if(mm<10 && ss>=10){
    return  "0" + mm + ":" + ss
  }

  if(mm>=10 && ss<10){
      return  mm + ":" +  "0" + ss
    }
}

function durationFormatReverse(duration){ // Converts the duration to seconds format
  let a = duration.split(':');
  let seconds = parseInt(a[0], 10)*60 + parseInt(a[1], 10);
  return seconds
}

function findSong(id) { // Returns the song of the given id
  let songIndex = globalSongsArraySorted.findIndex(i => i.id === Number(id)) // finds the index of the id in the songs array
  if (songIndex !== -1){
    return globalSongsArraySorted[songIndex]
  }
  else{
    if (globalSongsArraySorted.length !== 0){
      timer = 0;
      for (let i =0; i<currently.length; i++){
        currently.pop()
      }
      currently.push(Number(globalSongsArraySorted[0].id))
      return globalSongsArraySorted[0]
    }
    else{
      throw Error("No songs in player!")
    }
    
  }   

}

function sortedSongs(arr) { // Sorts the songs by their names.
  let songsArr = [] ;
  for (let i =0; i<arr.length; i++){ // Adds song name to array
      
      songsArr.push(arr[i].title);        
  }
  // Sorts the array by their names (does not matter if capital letters or not)
  songsArr.sort(function (a, b) {
    return a.localeCompare(b);
    });
  let songsArrSorted = [];
  let songIndex;

  for (let i =0; i<songsArr.length; i++){
    songIndex = arr.findIndex(a => a.title === songsArr[i]) // finds the index of the id in the songs array
    songsArrSorted.push(arr[songIndex]);
  }

  return songsArrSorted
}

function songsArray(){ // Returns the songs ids of the player
  let songsArr;

  if (globalSongsArraySorted){
    songsArr = sortedSongs(globalSongsArraySorted)
  }
  else if(!globalSongsArraySorted){ // On if the global variable is empty 
    songsArr = sortedSongs(player.songs)
  }
  
  let songsArrId = []

  for (let i =0; i<songsArr.length; i++){
      songsArrId.push(songsArr[i].id)
  }

  return songsArrId;
}

function getRandomInt() { // Returns Random number between 0 - 999
return Math.floor(Math.random() * 1000);
}

// Creating the page structure
generateSongs()
generatePlaylists()

// Making the add-song-button actually do something
document.getElementById("add-button").addEventListener("click", handleAddSongEvent)

document.addEventListener("click", e => { // Uses one listener to all buttons
  if (e.target.className === "remove-button"){ // Handles remove button click
    let parent = e.target.parentNode
    
    let songEl = parent.parentNode.parentNode
    let id = songEl.id

    // Checks if the song id has 3 digits number
    if (id.length === 6){
        id = id[5]
    }

    if (id.length === 7){
      id = id[5] + id[6]
    }

    if (id.length === 8){
      id = id[5] + id[6] + id[7]
    }

    removeSong(id)
  }

  if (e.target.className === "play-button"){ // Handles play button click
    handleSongClickEvent(e)
  }
})