import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  Animated,
} from 'react-native';

const ChannelInformation = ({VideoData}) => {
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
    <Pressable onPressIn={pressIn} onPressOut={pressOut}>
      <Animated.View
        style={{...styles.container, backgroundColor: backgroundInterpolation}}>
        <View style={styles.pictureAndName}>
          <Image
            source={{uri: VideoData.user.image}}
            style={styles.profilePicture}
          />
          <View style={{marginLeft: 5}}>
            <Text style={styles.username}>{VideoData.user.name}</Text>
            <Text style={styles.subCount}>228,4k Subs</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity>
            <Text style={styles.subscribeButtonText}>SUBSCRIBE</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#555',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: '#555',
    backgroundColor: '#333',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  profilePicture: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  pictureAndName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subCount: {
    fontSize: 11,
    color: '#949799',
  },
  username: {
    fontSize: 15,
    fontWeight: '500',
  },
  subscribeButtonText: {
    color: '#FF0000',
    fontWeight: '500',
    fontSize: 15,
  },
});

export default ChannelInformation;
