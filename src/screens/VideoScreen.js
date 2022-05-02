import React, {useState, useRef, useEffect} from 'react';
import {
  BackHandler,
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Pressable,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import VideoPlayer from '../components/VideoScreen/VideoPlayer';
import VideoData from '../assets/video.json';
import VideoDescription from '../components/VideoScreen/VideoDescription';
import VideoDetailsModal from '../components/VideoScreen/VideoDetailsModal';
import Reanimated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import VideoButtons from '../components/VideoScreen/VideoButtons';
import ChannelInformation from '../components/VideoScreen/ChannelInformation';
import CommentSection from '../components/VideoScreen/CommnentsSection';
import OptionsModal from '../components/Home/OptionsModal';
import Videos from '../assets/videos.json';
import VideoItem from '../components/Home/VideoItem';
import CommentsModal from '../components/VideoScreen/CommentsModal';
import CommentDetailsModal from '../components/VideoScreen/CommentDetailsModal';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const VideoScreen = ({
  rotation,
  setRotation,
  setIsModalVisible,
  ModalTranslation,
}) => {
  const translateY = useSharedValue(350);

  const translateDetailsModal = useRef(new Animated.Value(0)).current;
  const animateOptionsModalBackground = useRef(new Animated.Value(0)).current;
  const animateOptionsModal = useRef(new Animated.Value(0)).current;
  const translateCommentModal = useRef(new Animated.Value(0)).current;
  const AnimateCommentDetailsBody = useRef(new Animated.Value(0)).current;

  const [currentVideo, setCurrentVideo] = useState(VideoData);
  const [isVideoDescriptionModalOpen, setIsVideoDescriptonModalOpen] =
    useState(false);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isOptionsOpened, setIsOptionsOpened] = useState(false);
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get('window').height,
  );
  const [commentDetails, setCommentDetails] = useState({
    isOpen: false,
    comment: null,
  });
  const [modalBodyHeight, setModalBodyHeight] = useState(0);

  useEffect(() => {
    const getDimension = Dimensions.addEventListener('change', () => {
      setWindowHeight(Dimensions.get('window').height);

      if (windowHeight <= Dimensions.get('screen').height - 330)
        setIsCommentsModalOpen(false);
    });

    return () => getDimension.remove();
  }, [windowHeight]);

  const openDetailsModal = () => {
    translateY.value = withTiming(0, {duration: 800});
    setIsVideoDescriptonModalOpen(true);

    Animated.timing(translateDetailsModal, {
      duration: 100,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const closeDetailsModal = () => {
    Animated.timing(translateDetailsModal, {
      duration: 100,
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      setIsVideoDescriptonModalOpen(false);
    });

    translateY.value = withSpring(350, {damping: 100});
  };

  const videoDetailsInterpolation = translateDetailsModal.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('window').height, 0],
  });

  const openCommentsModal = () => {
    translateY.value = withTiming(0, {duration: 800});
    setIsCommentsModalOpen(true);

    Animated.timing(translateCommentModal, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const closeCommentsModal = () => {
    Animated.timing(translateCommentModal, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCommentDetails({isOpen: false, comment: null});
      setIsCommentsModalOpen(false);
    });

    translateY.value = withSpring(350, {damping: 100});
  };

  const interpolateCommentsModal = translateCommentModal.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('window').height, 0],
  });

  useEffect(() => {
    if (rotation == 'LANDSCAPE') {
      closeDetailsModal();

      translationY.value = withSpring(0, {damping: 50});
    }
  }, [rotation]);

  const interpolateOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [350, 0],
      [1, 0],
      Extrapolate.CLAMP,
    );

    return {opacity};
  });

  const modalBackgroundAnimation = Animated.timing(
    animateOptionsModalBackground,
    {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    },
  );

  const optionsModalAnimation = Animated.timing(animateOptionsModal, {
    toValue: 1,
    duration: 200,
    useNativeDriver: true,
  });

  const modalBackgroundAnimationReverse = Animated.timing(
    animateOptionsModalBackground,
    {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    },
  );

  const optionsModalAnimationReverse = Animated.timing(animateOptionsModal, {
    toValue: 0,
    duration: 200,
    useNativeDriver: true,
  });

  const closeOptionsModal = () => {
    modalBackgroundAnimationReverse.start();
    optionsModalAnimationReverse.start(() => setIsOptionsOpened(false));
  };

  const commentDetailsBodyOpeningAnimation = Animated.timing(
    AnimateCommentDetailsBody,
    {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    },
  );

  const commentDetailsBodyClosingAnimation = Animated.timing(
    AnimateCommentDetailsBody,
    {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    },
  );

  const interpolateAnimateDetailsBody = AnimateCommentDetailsBody.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('window').width, 0],
  });

  const context = useSharedValue({y: 0});
  const translationY = useSharedValue(0);
  const [goBack, setGoBack] = useState(false);
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translationY.value, goBack: false};
    })
    .onUpdate(event => {
      if (rotation == 'PORTRAIT') {
        translationY.value = event.translationY + context.value.y;
        translationY.value = Math.max(0, translationY.value);
      }
    })
    .onEnd(() => {
      if (translationY.value > 100) {
        translationY.value = withSpring(windowHeight - 60, {damping: 50});
      } else if (translationY.value < 100) {
        translationY.value = withSpring(0, {damping: 50});
      }
      if (translationY.value > windowHeight - 80) {
        translationY.value = withSpring(windowHeight, {damping: 50});
        runOnJS(setGoBack)(true);
      }
    });

  useEffect(() => {
    if (isCommentsModalOpen) setCommentDetails({isOpen: false, comment: null});

    const handleBackPress = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (
          isVideoDescriptionModalOpen ||
          isOptionsOpened ||
          isCommentsModalOpen
        ) {
          closeDetailsModal();
          closeOptionsModal();
          closeCommentsModal();
          return true;
        }

        if (translationY.value < 100) {
          translationY.value = withSpring(windowHeight - 60, {damping: 50});
          return true;
        }

        return;
      },
    );

    return () => handleBackPress.remove();
  }, [isVideoDescriptionModalOpen, isOptionsOpened, isCommentsModalOpen]);

  const screenTranslationY = useAnimatedStyle(() => {
    return {transform: [{translateY: translationY.value}]};
  });

  const interpolateScreenOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      translationY.value,
      [0, 350, 600],
      [1, 0.5, 0],
      Extrapolate.CLAMP,
    );

    return {opacity};
  });

  const interpolateVideoHeight = useAnimatedStyle(() => {
    const height = interpolate(
      translationY.value,
      [0, windowHeight - 300, windowHeight - 80],
      [250, 150, 60],
      Extrapolate.CLAMP,
    );

    return {height};
  });

  const interpolateVideoWidth = useAnimatedStyle(() => {
    const width = interpolate(
      translationY.value,
      [0, 500, windowHeight - 80],
      [100, 100, 30],
      Extrapolate.CLAMP,
    );

    return {width: `${width}%`};
  });

  const interpolateMiniPlayerContainerX = useAnimatedStyle(() => {
    const translateX = interpolate(
      translationY.value,
      [0, 500, windowHeight - 80],
      [500, 500, 125],
      Extrapolate.CLAMP,
    );

    return {transform: [{translateX}]};
  });

  const interpolateMiniPlayerOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      translationY.value,
      [0, 500, windowHeight - 120, windowHeight - 80],
      [0, 0, 0.5, 1],
      Extrapolate.CLAMP,
    );

    return {opacity};
  });

  const enlargeModal = () => {
    translationY.value = withSpring(0, {damping: 50});
  };

  useEffect(() => {
    if (goBack) {
      setIsModalVisible(false);
      ModalTranslation.setValue(0);
    }
  }, [goBack]);

  const startStopMiniPlayer = () => {
    setIsPaused(!isPaused);
  };

  const closeMiniPlayer = () => {
    translationY.value = withSpring(windowHeight, {damping: 50});
    setGoBack(true);
  };

  return (
    <Reanimated.View
      style={{
        ...screenTranslationY,
        paddingLeft: 100,
      }}>
      <View
        style={{
          height: '100%',
          backgroundColor: '#333',
        }}>
        <GestureDetector gesture={gesture}>
          <View style={styles.videoPlayerContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => enlargeModal()}>
              <Reanimated.View
                style={[
                  interpolateVideoHeight,
                  interpolateVideoWidth,
                  {minHeight: 250},
                ]}>
                <VideoPlayer
                  rotation={rotation}
                  VideoData={currentVideo}
                  setRotation={setRotation}
                  isPaused={isPaused}
                />
              </Reanimated.View>
              <Reanimated.View
                style={[
                  styles.miniPlayerContainer,
                  interpolateMiniPlayerContainerX,
                  interpolateMiniPlayerOpacity,
                ]}>
                <View>
                  <Text>
                    {VideoData.title.length > 30
                      ? `${VideoData.title.substring(0, 27)}...`
                      : VideoData.title.length}
                  </Text>
                  <Text style={{color: '#9c9c9c', fontSize: 12}}>
                    {VideoData.user.name}
                  </Text>
                </View>
                <View
                  style={{marginLeft: 10, marginTop: 10, flexDirection: 'row'}}>
                  <Pressable
                    onPress={() => startStopMiniPlayer()}
                    style={{height: 40, width: 40}}>
                    <Text>
                      {isPaused ? (
                        <Feather name="play" size={25} />
                      ) : (
                        <FontAwesome5 name="grip-lines-vertical" size={25} />
                      )}
                    </Text>
                  </Pressable>
                  <TouchableOpacity
                    onPress={() => closeMiniPlayer()}
                    style={{height: 40, width: 40}}>
                    <FontAwesome5 name="times" size={25} />
                  </TouchableOpacity>
                </View>
              </Reanimated.View>
            </TouchableOpacity>
          </View>
        </GestureDetector>

        <View style={styles.blackBackground}>
          <Reanimated.View style={interpolateScreenOpacity}>
            <Reanimated.View style={interpolateOpacity}>
              <FlatList
                data={Videos}
                ListHeaderComponent={() => {
                  return (
                    <View>
                      <VideoDescription
                        VideoData={currentVideo}
                        openDetailsModal={openDetailsModal}
                      />
                      <VideoButtons VideoData={currentVideo} />
                      <ChannelInformation VideoData={currentVideo} />
                      <CommentSection openCommentsModal={openCommentsModal} />
                    </View>
                  );
                }}
                renderItem={({item}) => {
                  return (
                    <VideoItem
                      key={item.id}
                      Video={item}
                      setIsOptionsOpened={setIsOptionsOpened}
                      rotation={rotation}
                      isVideoPlaying={true}
                      animateOptionsModal={optionsModalAnimation}
                      animateBackgroundColor={modalBackgroundAnimation}
                    />
                  );
                }}
              />
            </Reanimated.View>
          </Reanimated.View>
        </View>

        {isVideoDescriptionModalOpen && (
          <Animated.View
            style={[
              styles.videoDetailsModalContainer,
              {transform: [{translateY: videoDetailsInterpolation}]},
            ]}>
            <VideoDetailsModal
              closeDetailsModal={closeDetailsModal}
              setIsPaused={setIsPaused}
              translateY={translateY}
              VideoData={currentVideo}
            />
          </Animated.View>
        )}

        {isCommentsModalOpen && (
          <Animated.View
            style={[
              styles.commentsModalContainer,
              {transform: [{translateY: interpolateCommentsModal}]},
            ]}>
            <CommentsModal
              translateY={translateY}
              closeCommentsModal={closeCommentsModal}
              setIsPaused={setIsPaused}
              commentDetails={commentDetails}
              setCommentDetails={setCommentDetails}
              commentDetailsBodyOpeningAnimation={
                commentDetailsBodyOpeningAnimation
              }
              commentDetailsBodyClosingAnimation={
                commentDetailsBodyClosingAnimation
              }
              interpolateAnimateDetailsBody={interpolateAnimateDetailsBody}
              modalBodyHeight={modalBodyHeight}
              setModalBodyHeight={setModalBodyHeight}
            />
          </Animated.View>
        )}

        {isOptionsOpened && (
          <Animated.View
            style={{
              ...styles.optionsModalBackground,
              opacity: animateOptionsModalBackground.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            }}>
            <Pressable
              style={{height: '100%', width: '100%'}}
              onPress={closeOptionsModal}
            />
          </Animated.View>
        )}

        {isOptionsOpened && (
          <Animated.View
            style={{
              transform: [
                {
                  translateY: animateOptionsModal.interpolate({
                    inputRange: [0, 1],
                    outputRange: [Dimensions.get('screen').height, 0],
                  }),
                },
              ],
              position: 'absolute',
              bottom: 0,
              left: '1%',
              height: 325,
              width: '98%',
              zIndex: 99999999,
            }}>
            <OptionsModal closeModal={closeOptionsModal} />
          </Animated.View>
        )}

        {commentDetails.isOpen && (
          <Animated.View
            style={[
              styles.commentDetailsContainer,
              {
                transform: [{translateX: interpolateAnimateDetailsBody}],
                height: isPaused
                  ? Dimensions.get('window').height - 60
                  : Dimensions.get('window').height - 310,
                bottom: 0,
              },
            ]}>
            <CommentDetailsModal Comment={commentDetails.comment} />
          </Animated.View>
        )}
      </View>
    </Reanimated.View>
  );
};

let styles = StyleSheet.create({
  blackBackground: {
    flex: 1,
    backgroundColor: 'black',
  },
  videoPlayerContainer: {
    position: 'relative',
    top: 0,
    left: 0,
    margin: 0,
    width: '100%',
    backgroundColor: 'black',
  },
  miniPlayerContainer: {
    position: 'absolute',
    transform: [{translateX: 500}],
    backgroundColor: '#333',
    height: 60,
    width: '100%',
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  videoDetailsModalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    marginBottom: 1,
    height: Dimensions.get('screen').height - 330,
    width: '100%',
  },
  optionsModalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 9999999,
  },
  commentsModalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    marginBottom: 1,
    height: Dimensions.get('screen').height - 330,
  },
  commentDetailsContainer: {
    position: 'absolute',
    left: 0,
    width: '100%',
  },
});

export default VideoScreen;
