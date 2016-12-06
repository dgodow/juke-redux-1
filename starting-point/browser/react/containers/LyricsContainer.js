import React from 'react';
import store from '../store.js';
import Lyrics from '../components/lyrics';
import setLyrics from '../action-creators/lyrics';
import axios from 'axios';

export default class LyricsContainer extends React.Component {

  constructor (props) {
    super(props)
    this.state = Object.assign({
      artistQuery: '',
      songQuery: '',
    }, store.getState()
    );

    this.setArtist = this.setArtist.bind(this);
    this.setSong = this.setSong.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setArtist (string) {
    this.setState({artistQuery: string})
  }

  setSong (string) {
    this.setState({songQuery: string})
  }

  fetchLyrics (artist, song) {
    return function (dispatch, getState) {
      axios.get(`/api/lyrics/${artist}/${song}`)
        .then(res => {
          dispatch(setLyrics(res.data.lyric));
        })
    }
  }

  handleSubmit () {
    return store.dispatch(this.fetchLyrics(this.state.artistQuery, this.state.songQuery));
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  render () {
    return (
      <Lyrics setArtist = {this.setArtist} setSong = {this.setSong} handleSubmit = {this.handleSubmit} text = {this.state.lyrics.lyrics} />
    )
  }
}