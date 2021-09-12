/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
 function playSong(songId) {
    // Your code here
}

/**
 * Creates a song DOM element based on a song object.
 */
 function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = [title, artist, album, durationFormat(duration)]
    const classes = ["songs"]
    const attrs = { id: id, onclick: `playSong(${id})`,  cursor:"pointer" }
    return createElement("div", children, classes, attrs, coverArt)
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = []
    const classes = []
    const attrs = {}
    return createElement("div", children, classes, attrs)
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 */
function createElement(tagName, children = [], classes = [], attributes = {}) {
    // Your code here
}

// You can write more code below this line

function Sorted() { // Sorts the songs and the playlists by their names.
    let songsArr = [] ;
    let playlistArr = [] ;
    let results = {} ;
  
    for (let i =0; i<player.songs.length; i++){ // Adds song name to array
        
        songsArr.push(player.songs[i].title);        
    }
  
    for (let i =0; i<player.playlists.length; i++){ // Adds playlist name to array
    
        playlistArr.push(player.playlists[i].name);  
    }
  
    // Sorts the array by their names.
    songsArr = songsArr.sort()
    playlistArr = playlistArr.sort()
  
    let songsArrSorted = [];
    let playlistsArrSorted = [];
    let songIndex;
    let playlistIndex;
  
    for (let i =0; i<songsArr.length; i++){
      songIndex = player.songs.findIndex(a => a.title === songsArr[i]) // finds the index of the id in the songs array
      songsArrSorted.push(player.songs[songIndex]);
    }
  
    for (let i =0; i<playlistArr.length; i++){
      playlistIndex = player.playlists.findIndex(a => a.name === playlistArr[i]) // finds the index of the id in the playlists array
      playlistsArrSorted.push(player.playlists[playlistIndex]);
    }
  
    results = {
      songs : songsArrSorted,
      playlists : playlistsArrSorted,
    }
  
    return results
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
  
    if(mm>10 && ss>10){
      return mm + ":" + ss
    }
  
    if(mm<10 && ss>10){
      return  "0" + mm + ":" + ss
    }

    if(mm>10 && ss<10){
        return  mm + ":" +  "0" + ss
      }
  
  }

  function findSong(id) { // Returns the song of the given id
    let songIndex = player.songs.findIndex(i => i.id === id) // finds the index of the id in the songs array
    if (songIndex !== -1){
      return player.songs[songIndex]
    }
    else{
      throw Error("Song Doesn't Exist");
    }    
  
  }
