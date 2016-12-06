import { setLyrics } from '../action-creators/lyrics';
import { SET_LYRICS } from '../constants';

const DEFAULT_STATE = {
  lyrics: ''
};

export default function reducer (currentState = DEFAULT_STATE, action) {

  switch (action.type) {
    case SET_LYRICS:
      return Object.assign({}, currentState, {
        lyrics: action.lyrics
      })

    default:
      return currentState;
  }
}
