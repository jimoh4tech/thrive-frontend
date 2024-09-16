import { Dialog, DialogContent } from '@mui/material';
import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

const TourVideo = ({ open, onClose }: { open: boolean; onClose: VoidFunction }) => {
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.playVideo();
  };

  const opts: YouTubeProps['opts'] = {
    // height: '390',
    // width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogContent sx={{ pt: 2 }}>
        <YouTube videoId="3x1vBajSq98" opts={opts} onReady={onPlayerReady} />,
      </DialogContent>
    </Dialog>
  );
};

export default TourVideo;
