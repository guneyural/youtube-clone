import React, {useEffect, useState, useRef} from 'react';
import VideoItem from '../components/Home/VideoItem';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
  BackHandler,
  Pressable,
  View,
} from 'react-native';
import Videos from '../assets/videos.json';
import styles from '../styles/globals';
import VideoScreen from '../screens/VideoScreen';
import OptionsModal from '../components/Home/OptionsModal';
import Orientation from 'react-native-orientation-locker';
import BottomNavigator from '../components/BottomNavigator';
import TopNavigation from '../components/TopNavigation';

const Home = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOptionsOpened, setIsOptionsOpened] = useState(false);
  const [rotation, setRotation] = useState(Orientation.getInitialOrientation());

  const ModalTranslation = useRef(new Animated.Value(0)).current;
  const optionsModalTranslation = useRef(new Animated.Value(0)).current;
  const BackgroundColorTranslation = useRef(new Animated.Value(0)).current;

  const windowHeight = Dimensions.get('screen').height;
  const windowWidth = Dimensions.get('window').width;

  const scrolling = useRef(new Animated.Value(0)).current;

  const headerTranslation = scrolling.interpolate({
    inputRange: [100, 200],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  const flatListTranslation = scrolling.interpolate({
    inputRange: [100, 150],
    outputRange: [40, 0],
    extrapolate: 'clamp',
  });

  const getRotation = e => {
    const {
      window: {width, height},
    } = e;

    if (width < height) {
      setRotation('PORTRAIT');
    } else {
      setRotation('LANDSCAPE');
    }
  };

  useEffect(() => {
    const rotationListener = Dimensions.addEventListener('change', getRotation);
    return () => rotationListener.remove();
  }, [rotation]);

  const onRefresh = () => {
    setIsLoading(true);

    setTimeout(() => setIsLoading(false), 3000);
  };

  const toggleVideo = () =>
    Animated.timing(ModalTranslation, {
      duration: 300,
      toValue: 1,
      useNativeDriver: true,
    }).start();

  const handleBackButton = () => {
    if (isOptionsOpened) {
      closeOptionsModal();
      return true;
    }

    if (rotation.startsWith('LANDSCAPE') && isModalVisible) {
      Orientation.lockToPortrait();

      setTimeout(() => Orientation.unlockAllOrientations(), 2000);

      return true;
    }
  };

  useEffect(() => {
    let backHandler;

    backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );

    return () => {
      backHandler.remove();
    };
  }, [isModalVisible, isOptionsOpened, rotation]);

  const translateVideoModal = ModalTranslation.interpolate({
    inputRange: [0, 1],
    outputRange: [windowHeight, 0],
  });

  const animateOptionsModal = Animated.timing(optionsModalTranslation, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true,
  });
  const animateOptionsModalReverse = Animated.timing(optionsModalTranslation, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const animateBackgroundColor = Animated.timing(BackgroundColorTranslation, {
    toValue: 1,
    duration: 100,
    useNativeDriver: true,
  });
  const animateBackgroundColorReverse = Animated.timing(
    BackgroundColorTranslation,
    {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    },
  );

  const translateBackground = BackgroundColorTranslation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0', '0.5'],
  });

  const translateOptionsModal = optionsModalTranslation.interpolate({
    inputRange: [0, 1],
    outputRange: [windowHeight, 0],
  });

  const closeOptionsModal = () => {
    animateBackgroundColorReverse.start();
    animateOptionsModalReverse.start(() => setIsOptionsOpened(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#333" />
      <Animated.View
        style={{
          position: 'absolute',
          zIndex: 2,
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          backgroundColor: 'yellow',
          transform: [{translateY: headerTranslation}],
        }}>
        <TopNavigation />
      </Animated.View>
      {isOptionsOpened && (
        <Pressable
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 2,
          }}
          onPress={closeOptionsModal}>
          <Animated.View
            style={{
              position: 'relative',
              opacity: translateBackground,
              backgroundColor: 'black',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
            }}
          />
        </Pressable>
      )}
      <Animated.View
        style={{
          marginBottom: 40,
          transform: [{translateY: flatListTranslation}],
        }}>
        <Animated.FlatList
          onRefresh={onRefresh}
          refreshing={isLoading}
          showsVerticalScrollIndicator={false}
          data={Videos}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrolling}}}],
            {useNativeDriver: true},
          )}
          renderItem={({item}) => {
            return (
              <VideoItem
                key={item.id}
                Video={item}
                navigation={navigation}
                OPEN_VIDEO={setIsModalVisible}
                toggleVideo={toggleVideo}
                setIsOptionsOpened={setIsOptionsOpened}
                animateOptionsModal={animateOptionsModal}
                animateBackgroundColor={animateBackgroundColor}
                rotation={rotation}
              />
            );
          }}
        />
      </Animated.View>

      {isModalVisible && (
        <Animated.View
          style={{
            transform: [{translateY: translateVideoModal}],
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            height: Dimensions.get('window').height,
            width: rotation == 'PORTRAIT' ? windowWidth : windowWidth + 50,
            zIndex: 2,
          }}>
          <VideoScreen
            rotation={rotation}
            setIsModalVisible={setIsModalVisible}
            ModalTranslation={ModalTranslation}
          />
        </Animated.View>
      )}

      {isOptionsOpened && (
        <Animated.View
          style={{
            transform: [{translateY: translateOptionsModal}],
            position: 'absolute',
            bottom: 0,
            left: '1%',
            height: 325,
            width: '98%',
            zIndex: 2,
          }}>
          <OptionsModal
            closeModal={closeOptionsModal}
            setIsOpen={isOptionsOpened}
          />
        </Animated.View>
      )}

      <BottomNavigator route={'home'} navigation={navigation} />
    </SafeAreaView>
  );
};

export default Home;
