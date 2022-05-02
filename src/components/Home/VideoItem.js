import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, Pressable, Animated, Image} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const VideoItem = ({
  Video,
  OPEN_VIDEO,
  toggleVideo,
  setIsOptionsOpened,
  animateOptionsModal,
  animateBackgroundColor,
  rotation,
  isVideoPlaying,
}) => {
  const translation = useRef(new Animated.Value(0)).current;
  const threeDotsButtonTranslation = useRef(new Animated.Value(0)).current;

  const pressedIn = () => {
    Animated.timing(translation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const pressedOut = () => {
    Animated.timing(translation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const threeDotsButtonPressedIn = () => {
    setIsOptionsOpened(true);

    Animated.timing(threeDotsButtonTranslation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    animateOptionsModal.start();
    animateBackgroundColor.start();
  };

  const threeDotsButtonPressedOut = () => {
    Animated.timing(threeDotsButtonTranslation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeOptionsModal = () => {
    setIsOptionsOpened(false);

    Animated.timing(optionsModalTranslation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    });
  };

  const convertDuration = time => {
    // time is in second format. If time is greater than 3600 (more than 1 hours),
    // then get the hours so we start cutting the string from 11st character
    // otherwise cut from 14th character (only get minute and seconds)

    return new Date(time * 1000)
      .toISOString()
      .substring(time > 3600 ? 11 : 14, 19);
  };

  const numberFormatter = num => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0).replace(/\.0$/, '') + 'K';
    }
    return num;
  };

  const openVideo = videoId => {
    if (isVideoPlaying) {
      console.log(`Opened the video with the Id of ${videoId}`);
    } else {
      OPEN_VIDEO(true);
      toggleVideo();
    }
  };

  return (
    <Pressable
      onPressIn={pressedIn}
      onPressOut={pressedOut}
      onPress={() => openVideo(Video.id)}>
      <Animated.View
        style={[
          {
            backgroundColor: translation.interpolate({
              inputRange: [0, 1],
              outputRange: ['#333', '#545545'],
            }),
          },
          styles.videoItem,
        ]}>
        <View style={styles.thumbnailSection}>
          <Image
            style={[
              styles.thumbnailImage,
              {height: rotation == 'PORTRAIT' ? 200 : 250},
            ]}
            source={{uri: Video.thumbnail}}
          />
          <View style={styles.videoDurationSection}>
            <Text style={styles.videoDuration}>
              {convertDuration(Video.duration)}
            </Text>
          </View>
        </View>
        <View style={styles.videoInformation}>
          <View>
            <Image
              style={styles.profileImage}
              source={{uri: Video.user.image}}
            />
          </View>
          <View style={{flex: 1, marginHorizontal: 10}}>
            <Text style={styles.videoTitle}>{Video.title}</Text>
            <View style={styles.videoStats}>
              <Text style={styles.videoStat}>{Video.user.name}</Text>
              <Text style={{...styles.videoStat, paddingLeft: 5}}>·</Text>
              <Text style={{...styles.videoStat, paddingLeft: 5}}>
                {numberFormatter(Video.views)} views
              </Text>
              <Text style={{...styles.videoStat, paddingLeft: 5}}>·</Text>
              <Text style={{...styles.videoStat, paddingLeft: 5}}>
                {Video.createdAt}
              </Text>
            </View>
          </View>
          <Pressable
            onPressIn={threeDotsButtonPressedIn}
            onPressOut={threeDotsButtonPressedOut}>
            <Animated.View
              style={{
                backgroundColor: threeDotsButtonTranslation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['transparent', '#545545'],
                }),
                ...styles.threeDotsButton,
              }}>
              <Entypo name="dots-three-vertical" size={13} color={'#f1f1f1'} />
            </Animated.View>
          </Pressable>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  videoItem: {
    paddingBottom: 18,
  },
  thumbnailSection: {
    position: 'relative',
  },
  thumbnailImage: {
    height: 200,
  },
  videoDurationSection: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  videoDuration: {
    color: '#f1f1f1',
    fontWeight: '600',
    fontSize: 12,
    paddingHorizontal: 3,
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  videoInformation: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 8,
    marginHorizontal: 8,
  },
  videoTitle: {
    color: '#f0f0f0',
    fontWeight: '600',
  },
  threeDotsButton: {
    height: 30,
    width: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  videoStats: {
    flexDirection: 'row',
  },
  videoStat: {
    color: '#a3a3a3',
    fontSize: 13,
  },
});

export default VideoItem;
