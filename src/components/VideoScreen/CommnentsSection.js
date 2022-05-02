import React, {useRef} from 'react';
import {View, Text, StyleSheet, Animated, Image, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CommentSection = ({openCommentsModal}) => {
  const backgroundTransition = useRef(new Animated.Value(0)).current;

  const pressIn = () => {
    Animated.timing(backgroundTransition, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const pressOut = () => {
    Animated.timing(backgroundTransition, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const backgroundInterpolation = backgroundTransition.interpolate({
    inputRange: [0, 1],
    outputRange: ['#333', '#555'],
  });

  return (
    <Pressable
      onPressIn={pressIn}
      onPressOut={pressOut}
      onPress={openCommentsModal}>
      <Animated.View
        style={{...styles.container, backgroundColor: backgroundInterpolation}}>
        <View style={styles.header}>
          <Text style={{color: 'white'}}>
            Comments <Text style={{color: '#a1a1a1'}}>2.3k</Text>
          </Text>
          <Ionicons name="filter-outline" size={16} />
        </View>
        <View style={styles.body}>
          <Image
            source={{
              uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg',
            }}
            style={styles.image}
          />
          <Text style={styles.commentText}>
            Lorem ipsum dolor sit amet Güney Ural Lorem ipsum dolor sit amet
            GÜNEY URAL Developer: Güney Ural
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    padding: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 50,
  },
  body: {
    marginVertical: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  commentText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 13,
  },
});

export default CommentSection;
