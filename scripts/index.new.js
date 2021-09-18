/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
 function playSong(songId) {
  // Your code here
}

/**
* Removes a song from the player, and updates the DOM to match.
*
* @param {Number} songId - the ID of the song to remove
*/
function removeSong(songId) {
  // Your code here
}

/**
* Adds a song to the player, and updates the DOM to match.
*/
function addSong({ title, album, artist, duration, coverArt }) {
  // Your code here
}

/**
* Acts on a click event on an element inside the songs list.
* Should handle clicks on play buttons and remove buttons of songs.
*
* @param {MouseEvent} event - the click event
*/
function handleSongClickEvent(event) {
  // Your code here
}

/**
* Handles a click event on the button that adds songs.
*
* @param {MouseEvent} event - the click event
*/
function handleAddSongEvent(event) {
  // Your code here
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
function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
  // Your code here
}

/**
* Inserts all songs in the player as DOM elements into the songs list.
*/
function generateSongs() {
  // Your code here
}

/**
* Inserts all playlists in the player as DOM elements into the playlists list.
*/
function generatePlaylists() {
  // Your code here
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