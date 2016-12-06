import React from 'react';

export default function (props) {

  function artistChange (event) {
    props.setArtist(event.target.value);
  }

  function songChange (event) {
    props.setSong(event.target.value);
  }

  return (

    <div id="lyrics">
      <form onSubmit={props.handleSubmit}>
        <div>
          <input type="text" value={props.artistQuery} placeholder="Artist" onChange={artistChange}/>
          <input type="text" value={props.songQuery} placeholder="Song" onChange={songChange}/>
        </div>
        <pre>{props.text || 'Search above!'}</pre>
        <button onClick={props.handleSubmit}>Search for Lyrics</button>
      </form>
    </div>
  );
}