import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolate,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

const VideoDetailsModal = ({
  VideoData,
  closeDetailsModal,
  setIsPaused,
  translateY,
}) => {
  const context = useSharedValue({y: 0});
  const [MAX_TRANSLATE_Y, set_MAX_TRANSLATE_Y] = useState(
    Dimensions.get('window').height - (Dimensions.get('window').height - 250),
  );
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get('window').height,
  );

  useEffect(() => {
    const getDimensions = Dimensions.addEventListener('change', () => {
      setWindowHeight(Dimensions.get('window').height);
      set_MAX_TRANSLATE_Y(windowHeight - (windowHeight - 250));
    });

    return () => getDimensions.remove();
  }, [windowHeight, MAX_TRANSLATE_Y]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value < -100) {
        translateY.value = withSpring(-MAX_TRANSLATE_Y, {damping: 300});
        runOnJS(setIsPaused)(true);
      } else if (translateY.value > 55) {
        runOnJS(closeDetailsModal)();
        runOnJS(setIsPaused)(false);
        translateY.value = withSpring(0, {damping: 300});
      } else {
        translateY.value = withSpring(0, {damping: 300});
        runOnJS(setIsPaused)(false);
      }
    });

  const animateModal = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
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

  return (
    <Reanimated.View style={{flex: 1, ...animateModal}}>
      <Reanimated.View
        style={{
          ...interpolateBorderRadius,
        }}>
        <View style={styles.grayDash} />
        <GestureDetector gesture={gesture}>
          <View style={styles.modalHeaderSection}>
            <Text style={styles.header}>Description</Text>
            <TouchableOpacity
              onPress={closeDetailsModal}
              style={styles.closeButton}>
              <FontAwesome name="times" size={25} />
            </TouchableOpacity>
          </View>
        </GestureDetector>

        <View
          style={{height: Dimensions.get('window').height, paddingBottom: 60}}>
          <ScrollView>
            <View style={styles.modalBodySection}>
              <Text style={styles.title}>{VideoData.title}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Image
                  source={{uri: VideoData.user.image}}
                  style={styles.profilePicture}
                />
                <Text style={styles.username}>{VideoData.user.name}</Text>
              </View>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.stat}>{VideoData.likes}</Text>
                  <Text style={styles.statName}>Likes</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.stat}>35.870</Text>
                  <Text style={styles.statName}>Views</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.stat}>2022</Text>
                  <Text style={styles.statName}>14 April</Text>
                </View>
              </View>
              <View style={styles.seperator} />
              <Text style={styles.descriptionText}>
                M1 gerçekten çok mu güzel? Çikolatadan da mı güzel? TypeScript
                ne yapmaya çalışmaktadır? Deno oyları mı bölüyor? Amerikan
                başkanı Kenedi, Taçsız Kral Pele, ve Nadya Komanaçi hangi
                programlama dilini kullanıyor?
              </Text>
              <Text style={styles.descriptionText}>
                Yazılım ve hayatla ilgili aklınıza gelen her şeyi
                sorabileceğiniz, benim de dilimin döndüğünce anlattığım
                soru-cevap yayınlarının bir yenisini daha bu Cumartesi
                yapıyoruz.
              </Text>
              <Text style={styles.descriptionText}>
                Cumartesi gecesi görüşmek üzere!
              </Text>
              <TouchableOpacity style={styles.button} activeOpacity={0.5}>
                <Text style={styles.buttonText}>Show Transcript</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Reanimated.View>
    </Reanimated.View>
  );
};

const styles = StyleSheet.create({
  modalHeaderSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#707070',
  },
  grayDash: {
    backgroundColor: 'gray',
    width: 50,
    height: 3,
    borderRadius: 25,
    alignSelf: 'center',
    marginVertical: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBodySection: {
    padding: 10,
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
  },
  profilePicture: {
    height: 35,
    width: 35,
    borderRadius: 50,
  },
  username: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  stat: {
    fontWeight: '700',
    color: 'white',
    fontSize: 18,
  },
  statItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  statName: {
    color: '#a8a8a8',
  },
  seperator: {
    width: '100%',
    backgroundColor: '#707070',
    height: 1,
    marginVertical: 10,
  },
  descriptionText: {
    marginVertical: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#5892e8',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: 3,
    marginTop: 5,
  },
  buttonText: {
    color: '#5892e8',
    fontWeight: '500',
  },
});

export default VideoDetailsModal;
