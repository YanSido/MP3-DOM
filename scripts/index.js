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
    const children = []
    const classes = []
    const attrs = { onclick: `playSong(${id})` }
    return createElement("div", children, classes, attrs)
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
