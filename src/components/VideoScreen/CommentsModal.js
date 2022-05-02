import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  Animated,
  Image,
  TextInput,
} from 'react-native';
import Comments from '../../assets/comments.json';
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolate,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CommentsModal = ({
  closeCommentsModal,
  setIsPaused,
  translateY,
  commentDetails,
  setCommentDetails,
  commentDetailsBodyOpeningAnimation,
  commentDetailsBodyClosingAnimation,
  modalBodyHeight,
  setModalBodyHeight,
}) => {
  const context = useSharedValue({y: 0});

  const [MAX_TRANSLATE_Y, set_MAX_TRANSLATE_Y] = useState(
    Dimensions.get('window').height - (Dimensions.get('window').height - 250),
  );
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get('window').height,
  );

  const CommentDetailsModalHeaderOpacity = useRef(
    new Animated.Value(0),
  ).current;
  const CommentModalHeaderOpacity = useRef(new Animated.Value(1)).current;
  const AnimateToRight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const getDimensions = Dimensions.addEventListener('change', () => {
      setWindowHeight(Dimensions.get('window').height);
      set_MAX_TRANSLATE_Y(windowHeight - (windowHeight - 250));
    });

    return () => getDimensions.remove();
  }, [windowHeight, MAX_TRANSLATE_Y]);

  useEffect(() => {
    const closeCommentDetails = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (commentDetails.isOpen) {
          closeCommentDetailsModal();
          return true;
        }

        closeCommentsModal();
        return true;
      },
    );

    return () => closeCommentDetails.remove();
  }, [commentDetails]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
      if (translateY.value < 1)
        runOnJS(setModalBodyHeight)(windowHeight - translateY.value);
    })
    .onUpdate(event => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value < -100) {
        translateY.value = withSpring(-MAX_TRANSLATE_Y, {damping: 300});
        runOnJS(setIsPaused)(true);
        runOnJS(setModalBodyHeight)(windowHeight);
      } else if (translateY.value > 200) {
        runOnJS(closeCommentsModal)();
        runOnJS(setIsPaused)(false);
        translateY.value = withSpring(0, {damping: 300});
      } else {
        translateY.value = withSpring(0, {damping: 300});
        runOnJS(setIsPaused)(false);
        runOnJS(setModalBodyHeight)(windowHeight - 251);
      }
    });

  const interpolateBorderRadius = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [0, -60],
      [30, 0],
      Extrapolate.CLAMP,
    );

    return {
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
      borderBottomColor: '#333',
      borderBottomWidth: 1,
      backgroundColor: '#333',
    };
  });

  const animateModal = useAnimatedStyle(() => {
    return {transform: [{translateY: translateY.value}]};
  });

  const openCommentDetailsModal = comment => {
    setCommentDetails({
      isOpen: true,
      comment,
    });

    Animated.timing(CommentModalHeaderOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.parallel([
      Animated.timing(CommentDetailsModalHeaderOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(AnimateToRight, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      commentDetailsBodyOpeningAnimation,
    ]).start();
  };

  const closeCommentDetailsModal = () => {
    Animated.parallel([
      Animated.timing(CommentDetailsModalHeaderOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(AnimateToRight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      commentDetailsBodyClosingAnimation,
    ]).start(() => {
      setCommentDetails({
        isOpen: false,
        comment: null,
      });
    });

    Animated.timing(CommentModalHeaderOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const interpolateCommentDetailsHeaderOpacity =
    CommentDetailsModalHeaderOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

  const interpolateCommentHeaderOpacity = CommentModalHeaderOpacity.interpolate(
    {inputRange: [0, 1], outputRange: [0, 1]},
  );

  const interpolateToRight = AnimateToRight.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  return (
    <Reanimated.View style={{flex: 1, ...animateModal}}>
      <Reanimated.View style={interpolateBorderRadius}>
        {!commentDetails.isOpen && <View style={styles.grayDash} />}
        {commentDetails.isOpen ? (
          <View>
            <View style={styles.modalHeaderSection}>
              <Animated.Text
                style={[
                  styles.header,
                  {opacity: interpolateCommentHeaderOpacity},
                ]}>
                Comments
              </Animated.Text>
            </View>
            <View style={styles.modalHeaderSection}>
              <Animated.View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  opacity: interpolateCommentDetailsHeaderOpacity,
                  transform: [{translateX: interpolateToRight}],
                }}>
                <TouchableOpacity
                  onPress={closeCommentDetailsModal}
                  style={{width: 35}}>
                  <AntDesign name={'left'} size={25} />
                </TouchableOpacity>
                <Text style={[styles.header, {marginLeft: 5}]}>Replys</Text>
              </Animated.View>
            </View>
          </View>
        ) : (
          <GestureDetector gesture={gesture}>
            <View>
              <View style={styles.modalHeaderSection}>
                <Animated.Text
                  style={[
                    styles.header,
                    {opacity: interpolateCommentHeaderOpacity},
                  ]}>
                  Comments
                </Animated.Text>
                <TouchableOpacity
                  onPress={closeCommentsModal}
                  style={styles.closeButton}>
                  <FontAwesome name="times" size={25} />
                </TouchableOpacity>
              </View>
              <View style={styles.modalHeaderSection}>
                <Animated.View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    opacity: interpolateCommentDetailsHeaderOpacity,
                    transform: [{translateX: interpolateToRight}],
                  }}>
                  <TouchableOpacity
                    onPress={closeCommentDetailsModal}
                    style={{width: 35}}>
                    <AntDesign name={'left'} size={25} />
                  </TouchableOpacity>
                  <Text style={[styles.header, {marginLeft: 5}]}>Replys</Text>
                </Animated.View>
                <TouchableOpacity
                  onPress={closeCommentsModal}
                  style={styles.closeButton}>
                  <FontAwesome name="times" size={25} />
                </TouchableOpacity>
              </View>
            </View>
          </GestureDetector>
        )}
        <View
          style={{
            height: modalBodyHeight == 0 ? 'auto' : modalBodyHeight,
            ...styles.modalBody,
          }}>
          <View>
            <FlatList
              data={Comments}
              ListHeaderComponent={() => {
                return (
                  <View style={styles.textInputContainer}>
                    <Image
                      source={{
                        uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/graham.jpg',
                      }}
                      style={styles.profileImage}
                    />
                    <TextInput
                      style={styles.textInputStyle}
                      placeholder="Add Comment..."
                      placeholderTextColor={'#858585'}></TextInput>
                  </View>
                );
              }}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => openCommentDetailsModal(item)}
                    style={styles.commentItem}>
                    <View>
                      <Image
                        source={{uri: item.user.image}}
                        style={styles.profileImage}
                      />
                    </View>
                    <View style={{flex: 1, paddingHorizontal: 20}}>
                      <Text style={styles.username}>
                        {item.user.name} · {item.createdAt}
                      </Text>
                      <Text>{item.comment}</Text>
                      <View style={{marginTop: 10, flexDirection: 'row'}}>
                        <TouchableOpacity>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <AntDesign name={'like2'} size={14} />
                            <Text style={{fontSize: 12, marginLeft: 5}}>
                              {item.likes}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginLeft: 15,
                            }}>
                            <AntDesign name={'dislike2'} size={14} />
                            <Text style={{fontSize: 12, marginLeft: 5}}>
                              {item.dislikes}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        {item.id % 2 === 0 && (
                          <TouchableOpacity
                            onPress={() => openCommentDetailsModal(item)}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginLeft: 20,
                              }}>
                              <MaterialCommunityIcons
                                name={'comment-text-outline'}
                                size={14}
                              />
                              <Text style={{fontSize: 12, marginLeft: 5}}>
                                {item.id + 4}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        )}
                      </View>
                      {item.id % 2 === 0 && (
                        <TouchableOpacity
                          style={{marginTop: 20}}
                          onPress={() => openCommentDetailsModal(item)}>
                          <Text style={{color: '#458cf5', fontWeight: '700'}}>
                            {item.id + 4} REPLYS
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Reanimated.View>
    </Reanimated.View>
  );
};

const styles = StyleSheet.create({
  modalBody: {
    paddingTop: 70,
  },
  modalHeaderSection: {
    position: 'absolute',
    top: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingVertical: 15,
    paddingRight: 15,
    marginVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#707070',
    zIndex: 2,
  },
  grayDash: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'gray',
    width: 50,
    height: 3,
    borderRadius: 25,
    alignSelf: 'center',
    marginVertical: 5,
    zIndex: 3,
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
  },
  closeButton: {
    width: 30,
  },
  commentItem: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderBottomColor: '#424242',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  profileImage: {
    height: 25,
    width: 25,
    borderRadius: 50,
  },
  username: {
    color: '#949494',
    fontSize: 12,
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#424242',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  textInputStyle: {
    width: '100%',
    color: '#efefef',
    marginLeft: 10,
  },
});

export default CommentsModal;
