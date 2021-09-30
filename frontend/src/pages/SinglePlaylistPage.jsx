import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap/';
import IsLoggedIn from '../components/IsLoggedIn';
import {
  FaPlayCircle,
  FaPauseCircle,
  FaTrashAlt,
  FaShare,
  FaArrowLeft,
} from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as QueryString from 'query-string';
import Player from '../components/Player';
import { Link } from 'react-router-dom';

import { PlayerContext } from '../contexts/PlayerContext';

function SinglePlaylistPage(props) {
  const [playerState, updatePlayerState] = useContext(PlayerContext);
  const [playlistContent, setPlaylistContent] = useState([]);
  const [error, setError] = useState();
  const [sharelink, setSharelink] = useState(false);
  const url = window.location.href;
  //const playlistId = props.location.state.playlistId
  console.log(props.location.search);
  const params = QueryString.parse(props.location.search);
  console.log(params.playlistId);
  console.log(params.playlistName);

  const playlistId = params.playlistId;
  const playlistName = params.playlistName;

  const sharing_code = params.code !== undefined ? params.code : null;

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

  //This is the fetch that we're gonna use once we can connecto to backend.
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
    } else if (data.error) {
      setError(data.message);
    }
  }

  async function getSharedPlaylist(code) {
    const TokenKey = getToken();
    const response = await fetch(`/api/fetch_shared_playlist/${code}`);
    const data = await response.json();
    console.log('get shared Playlists data ', data);
    if (data.length > 0) {
      setPlaylistContent(data);
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
      var element = e.target.parentNode;
      element.parentNode.removeChild(element);
    } else if (data.error) {
      setError(data.message);
    }
  }

  async function sharePlaylist(e) {
    e.preventDefault();
    // console.log('Delete from Playlist#ID:' + playlistId);
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
      navigator.clipboard.writeText(url + '&code=' + data);
      setSharelink(true);
    }
  }
  useEffect(() => {
    if (!sharing_code) {
      getSinglePlaylist();
    } else {
      getSharedPlaylist(sharing_code);
    }
  }, []);

  function addDefaultThumb(e) {
    e.target.src = '../assets/default-thumb.png';
  }

  return (
    <>
      {!sharing_code && <IsLoggedIn />}
      <div className='single-playlist-wrapper'>
        <div className='single-playlist-header'>
          <h2>{playlistName}</h2>
          <button className='back-btn icon-btn'>
            <Link to={'/'}>
              <FaArrowLeft />
            </Link>
          </button>

          {!sharing_code && (
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
          <span>{sharelink && 'Copied to clipboard'}</span>
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

                {!sharing_code && (
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

        <Player></Player>
      </div>
    </>
  );
}

export default SinglePlaylistPage;
