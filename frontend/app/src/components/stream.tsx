import { useRef } from 'react';
import HlsPlayer from 'react-hls-player';

export default function Stream(props: any) {
  const hlsStreamUrl = props.path
  // Create a ref for the player
  const playerRef = useRef<HTMLVideoElement>(null);

  return (
    <div style={{ position: 'relative' }}>
      <HlsPlayer
        src={hlsStreamUrl}
        autoPlay={true}
        controls={true}
        width="100%"
        height="auto"
        playerRef={playerRef}
        style={{borderRadius: '20px'}}
      />
    </div>
  );
}
