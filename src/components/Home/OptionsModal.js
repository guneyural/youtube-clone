import React, {useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolate,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

const MAX_TRANSLATE_Y = 0;
const OptionsModal = ({closeModal, setIsOpen}) => {
  const windowHeight = Dimensions.get('window').height;

  const translateY = useSharedValue(0);

  const context = useSharedValue({y: 0});

  const scrollTo = useCallback(destination => {
    'worklet';
    translateY.value = withSpring(destination, {damping: 50});
  });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value > 80) {
        scrollTo(windowHeight);
        runOnJS(closeModal)();
      } else if (translateY.value < 80) {
        scrollTo(0);
      }
    });

  const animateModal = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  const animateOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, 200, 300],
      [1, 0.5, 0.2],
      Extrapolate.CLAMP,
    );

    return {opacity};
  });

  return (
    <GestureDetector gesture={gesture}>
      <Reanimated.View
        style={{
          ...animateModal,
        }}>
        <Reanimated.View
          style={{
            ...animateOpacity,
          }}>
          <View
            style={{
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              backgroundColor: '#333',
              transform: [{translateY: 14}],
            }}>
            <View style={styles.grayDash} />
            <TouchableOpacity
              style={styles.optionItem}
              activeOpacity={0.7}
              onPress={closeModal}>
              <View>
                <AntDesignIcons name="clockcircle" size={20} />
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.optionText}>Watch later</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionItem}
              activeOpacity={0.7}
              onPress={closeModal}>
              <View>
                <MaterialIcons name="library-add" size={20} />
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.optionText}>Add to playlist</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionItem}
              activeOpacity={0.7}
              onPress={closeModal}>
              <View>
                <MaterialIcons name="share" size={20} />
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.optionText}>Share</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionItem}
              activeOpacity={0.7}
              onPress={closeModal}>
              <View>
                <MaterialIcons name="block" size={20} />
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.optionText}>Not interested</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionItem}
              activeOpacity={0.7}
              onPress={closeModal}>
              <View>
                <MaterialIcons name="block" size={20} />
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.optionText}>
                  Don't suggest this channel
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionItem}
              activeOpacity={0.7}
              onPress={closeModal}>
              <View>
                <MaterialIcons name="report" size={20} />
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.optionText}>Report</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Reanimated.View>
      </Reanimated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  grayDash: {
    backgroundColor: 'gray',
    width: 75,
    height: 3,
    alignSelf: 'center',
    borderRadius: 2,
    marginVertical: 10,
  },
  optionItem: {
    display: 'flex',
    width: '100%',
    padding: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 20,
  },
});

export default OptionsModal;
