import { Place } from '../types/place';

interface VideoConentProps {
  videos: Place['images'];
  className?: string;
}

const VideoContent = ({ videos, className }: VideoConentProps) => {
  return (
    <video
      src={videos[0].url}
      autoPlay
      loop
      className={className}
      onLoadStart={(e) => {
        const video = e.target as HTMLVideoElement;
        video.volume = 0;
      }}
    />
  );
};

export default VideoContent;
