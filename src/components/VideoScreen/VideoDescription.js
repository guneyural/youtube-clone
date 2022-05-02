import React, {useRef} from 'react';
import {View, Text, StyleSheet, Pressable, Animated} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const VideoDescription = ({VideoData, openDetailsModal}) => {
  const TitleBackgroundAnimation = useRef(new Animated.Value(0)).current;

  const titlePressedIn = () => {
    Animated.timing(TitleBackgroundAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const titlePressedOut = () => {
    Animated.timing(TitleBackgroundAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Pressable
      onPressIn={titlePressedIn}
      onPressOut={titlePressedOut}
      onPress={openDetailsModal}>
      <Animated.View
        style={{
          padding: 8,
          backgroundColor: TitleBackgroundAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['#333', '#575757'],
          }),
        }}>
        <Text style={styles.tag}>{VideoData.tags}</Text>
        <View style={styles.titleContainer}>
          <View style={{flex: 1}}>
            <Text style={styles.title}>{VideoData.title}</Text>
            <Text style={styles.textMuted}>
              {VideoData.views} views · {VideoData.createdAt}
            </Text>
          </View>
          <View>
            <Pressable>
              <AntDesign name="down" size={20} />
            </Pressable>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tag: {
    color: '#5892e8',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
  },
  textMuted: {
    color: '#949799',
    fontSize: 12,
  },
});

export default VideoDescription;
