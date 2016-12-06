import { 
        START_PLAYING, 
        STOP_PLAYING, 
        SET_CURRENT_SONG, 
        SET_LIST, 
        SET_PROGRESS 
      } from '../constants';

export function startPlaying () {
  return {
    type: START_PLAYING
  }
}

export function stopPlaying () {
  return {
    type: STOP_PLAYING
  }
}

export function setCurrentSong (newSong) {
  return {
    type: SET_CURRENT_SONG,
    newSong
  }
}

export function setList (newSongList) {
  return {
    type: SET_LIST,
    newSongList
  }
}

export function setProgress (progress) {
  return {
    type: SET_PROGRESS,
    progress
  }
}

// export function play () {
//   return {
//     type: 
//   }
// }
