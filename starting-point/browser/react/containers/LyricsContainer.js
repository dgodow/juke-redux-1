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
      songQuery: ''
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

  handleSubmit () {
    axios.get(`/api/lyrics/${this.state.artistQuery}/${this.state.songQuery}`)
    .then(res => res.data)
    .then(lyrics => {
      const newLyrics = setLyrics(lyrics);
      store.dispatch(newLyrics);
      console.log(store.getState());
    })
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
      <Lyrics setArtist = {this.setArtist} setSong = {this.setSong} handleSubmit = {this.handleSubmit} />
    )
  }
}