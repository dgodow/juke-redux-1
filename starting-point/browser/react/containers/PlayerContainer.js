import React from 'react';
import store from '../store.js';
import Player from '../components/player';
import AUDIO from '../audio';

import { startPlaying, stopPlaying, setCurrentSong, setList, setProgress } from '../action-creators/player';

export default class PlayerContainer extends React.Component {

  constructor (props) {
    super(props)
    this.state = store.getState();

    this.toggle = this.toggle.bind(this);
    this.toggleOne = this.toggleOne.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    })

    AUDIO.addEventListener('ended', () =>
      this.next());
    AUDIO.addEventListener('timeupdate', () =>
      this.setProgress(AUDIO.currentTime / AUDIO.duration));
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  play () {
    AUDIO.play();
    // this.setState({ isPlaying: true });
    store.dispatch(startPlaying());
  }

  pause () {
    AUDIO.pause();
    // this.setState({ isPlaying: false });
    store.dispatch(stopPlaying());
  }

  load (currentSong, currentSongList) {
    AUDIO.src = currentSong.audioUrl;
    AUDIO.load();
    // this.setState({
    //   currentSong: currentSong,
    //   currentSongList: currentSongList
    // });
    store.dispatch(setCurrentSong(currentSong));
    store.dispatch(setList(currentSongList));
  }

  setProgress (progress) {
    // this.setState({ progress: progress });
    store.dispatch(setProgress(progress));
  }

  startSong (song, list) {
    this.pause();
    this.load(song, list);
    this.play();
  }

  toggleOne (selectedSong, selectedSongList) {
    if (selectedSong.id !== this.state.player.currentSong.id)
      this.startSong(selectedSong, selectedSongList);
    else this.toggle();
  }

  toggle () {
    if (this.state.player.isPlaying) this.pause();
    else this.play();
  }

  next () {
    this.startSong(...skip(1, this.state));
  }

  prev () {
    this.startSong(...skip(-1, this.state));
  }

  render () {
    return (
      <Player
          currentSong = {this.state.player.currentSong}
          currentSongList = {this.state.player.currentSongList}
          isPlaying = {this.state.player.isPlaying}
          progress = {this.state.player.progress}
          next = {this.next}
          prev = {this.prev}
          toggle = {this.toggle}
      />
    )
  }
}
