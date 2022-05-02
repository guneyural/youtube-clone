import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, Image} from 'react-native';
import Video from 'react-native-video';

const VideoPlayer = ({rotation, VideoData, isPaused}) => {
  const videoRef = useRef();
  const [isMediaLoading, setIsMediaLoading] = useState(false);

  useEffect(() => {
    if (rotation.startsWith('LANDSCAPE')) {
      videoRef.current?.presentFullscreenPlayer();
    } else {
      videoRef.current?.dismissFullscreenPlayer();
    }
  }, [rotation]);

  return (
    <>
      <Video
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        style={styles.video}
        resizeMode={'cover'}
        ref={videoRef}
        poster={VideoData.thumbnail}
        posterResizeMode={'contain'}
        onLoadStart={() => setIsMediaLoading(true)}
        onReadyForDisplay={() => setIsMediaLoading(false)}
        paused={isPaused}
      />
      {isMediaLoading && (
        <Image
          style={{
            ...styles.loadingGif,
            top: rotation == 'PORTRAIT' ? '10%' : '22%',
            left: rotation == 'PORTRAIT' ? '25%' : '38%',
          }}
          source={require('../../assets/loading.gif')}
        />
      )}
    </>
  );
};

let styles = StyleSheet.create({
  video: {
    margin: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  loadingGif: {
    position: 'absolute',
    zIndex: 3,
  },
});

export default VideoPlayer;
