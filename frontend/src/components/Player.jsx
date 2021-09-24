import React from 'react';

import YouTube from 'react-youtube';

export default function Player(props) {
   const videoId = props.videoId;

   const opts = {
      height: '0',
      width: '0',
      playerVars: {
         // https://developers.google.com/youtube/player_parameters
         autoplay: 0,
      },
   };
   const _onReady = (event) => {
      // access to player in all event handlers via event.target
      //  event.target.pauseVideo();
   };

   return (
      //""2g811Eo7K8U"
      <div id="player">
         videoId && <YouTube videoId={videoId} opts={opts} onReady={_onReady} />
      </div>
   );
}
