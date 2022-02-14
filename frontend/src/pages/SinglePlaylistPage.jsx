import React, { useContext, useEffect, useState } from 'react';
import IsLoggedIn from '../components/IsLoggedIn';
import {
  FaPlayCircle,
  FaPauseCircle,
  FaTrashAlt,
  FaShare
} from 'react-icons/fa';
import { Redirect, useParams } from 'react-router-dom';

import { PlayerContext } from '../contexts/PlayerContext';

function SinglePlaylistPage(props) {
  const [playerState, updatePlayerState] = useContext(PlayerContext);
  const [playlistContent, setPlaylistContent] = useState([]);
  const [error, setError] = useState();
  const [sharelink, setSharelink] = useState(false);
  const [redirect, setRedirect] = useState(false);
  
  const { playlistId, playlistName, code } = useParams()

  console.log('playlistId', playlistId);
  console.log('playlistName', playlistName);
  console.log('shareCode', code);
  
  const url = window.location.href;

  // console.log(props.location.search);
  // const params = QueryString.parse(props.location.search);
  // console.log(params.playlistId);
  // console.log(params.playlistName);

  // const playlistId = params.playlistId;
  // const playlistName = params.playlistName;

  const shareCode = code !== undefined ? code : null;

  function playPause(songObj) {
    //{playerState.isPlaying && playerState.songPlaying.videoId === song.videoId ?  <FaPauseCircle /> : <FaPlayCircle />}
    if (
      playerState.isPlaying &&
      playerState.songPlaying.videoId === songObj.videoId
    ) {
      updatePlayerState({
        isPlaying: false,
      });
      playerState.player && playerState.player.pauseVideo();
    } else {
      updatePlayerState({
        isPlaying: true,
        songPlaying: songObj,
      });
      playerState.player && playerState.player.playVideo();
    }
  }

  function getToken() {
    return sessionStorage.getItem('auth');
  }

  async function getSinglePlaylist() {
    const TokenKey = getToken();
    const response = await fetch(`/api/fetch_playlist/${playlistId}`, {
      headers: { Authorization: `Bearer ${TokenKey}` },
    });
    const data = await response.json();
    console.log('getPlaylists data ', data);
    if (data.length > 0) {
      setPlaylistContent(data);
      playAplaylist(data)
    } else if (data.length == 0) {
      setPlaylistContent([]);
    } else if (data.error) {
      setError(data.message);
    }
  }

  async function getSharedPlaylist(code) {
    //  const TokenKey = getToken();
    const response = await fetch(`/api/fetch_shared_playlist/${code}`);
    const data = await response.json();
    console.log('get shared Playlists data ', data);
    if (data.length > 0) {
      setPlaylistContent(data);
      playAplaylist(data)

    } else if (data.length == 0) {
      setPlaylistContent([]);
    } else if (data.error) {
      setError(data.message);
    }
  }

  async function deleteFromPlaylist(e, contentId) {
    e.preventDefault();
    console.log('Delete Content#ID:' + contentId);
    console.log('Delete from Playlist#ID:' + playlistId);
    const TokenKey = getToken();
    const response = await fetch(
      `/api/delete_from_playlist/playlist/${playlistId}/contentid/${contentId}`,
      { headers: { Authorization: `Bearer ${TokenKey}` } }
    );

    const data = await response.json();
    console.log('Delete response: ', data);
    if (data.changes > 0) {

      if (!shareCode) {
        getSinglePlaylist();
      } else {
        getSharedPlaylist(shareCode);
      }

    } else if (data.error) {
      setError(data.message);
    }
  }

  async function sharePlaylist(e) {
    e.preventDefault();

    const TokenKey = getToken();
    const response = await fetch(`/api/share_playlist/${playlistId}`, {
      headers: { Authorization: `Bearer ${TokenKey}` },
    });
    const data = await response.json();
    console.log('Share response: ', data);
    if (data.error) {
      setError(data.message);
    } else if (data) {
      console.log('Share code' + data);
      navigator.clipboard.writeText(`${url}/${data}`);
      setSharelink(true);
    }
  }
  // play a list of songs
  // to be called later
  function playAplaylist(data, playCurrent = false) {

    let arr = []
    let songs = []
    console.log(data)
    if (data.length > 0) {
      data.map((song) => {
        console.log('playAplaylist song', song)
        arr.push(song.Content.videoId)
        songs.push(song.Content)
      })

      updatePlayerState({
        isPlaying: true,
        playlist: songs,
        songPlaying: songs[0],
        playedSongIndex: 0,
        playlistVideoIds: arr
      })

      console.log('playAplaylist arr', arr)
      console.log("playAplaylist arr[0]", arr[0])
    }
  }

  function addDefaultThumb(e) {
    e.target.src = '.../assets/default-thumb.png';
  }

//antingen använd playlistCxt för att uppdatera sidan i useEffect
//eller använd dig av previous props !== current props i [] på use effect.


  useEffect(() => {
    if (!shareCode) {
      getSinglePlaylist();

    } else {
      getSharedPlaylist(shareCode);
    }
    
  }, []);

  return (
    <>
      {!shareCode && <IsLoggedIn />}
      { redirect && <Redirect to='/' /> }
      <div className='single-playlist-wrapper'>
        <div className='single-playlist-header'>
          <h2>{playlistName}</h2>
          {!shareCode && (
            <button
              className='share-playlist-btn icon-btn'
              onClick={(e) => {
                sharePlaylist(e);
              }}
            >
              <FaShare />
              Share
            </button>
          )}
          <span className='hideMe'>{sharelink && 'Copied to clipboard'}</span>
        </div>

        <ul className='playlist-container song-list'>
          {playlistContent.length > 0 &&
            playlistContent.map((el) => (
              <li
                className='playlist-li'
                id={el.Id}
                value={el.Content.videoId}
                key={el.Content.videoId}
              >
                <img
                  className='thumb-li'
                  src={el.Content.thumbnails[0].url}
                  onError={addDefaultThumb}
                />
                <span className='song-title-li'>{el.Content.name}</span>
                <span className='artist-name-li'>{el.Content.artist.name}</span>

                <button
                  className='play-pause-li-btn icon-btn'
                  type='button'
                  onClick={() => playPause(el.Content)}
                >
                  {playerState.isPlaying &&
                  playerState.songPlaying.videoId === el.Content.videoId ? (
                    <FaPauseCircle />
                  ) : (
                    <FaPlayCircle />
                  )}
                </button>

                {!shareCode && (
                  <button
                    className='delete-btn icon-btn'
                    onClick={(e) => {
                      deleteFromPlaylist(e, el.Id);
                    }}
                  >
                    <FaTrashAlt />
                  </button>
                )}
              </li>
              //Button here
            ))}
        </ul>
        {error != undefined && error}
      </div>
    </>
  );
}

export default SinglePlaylistPage;
