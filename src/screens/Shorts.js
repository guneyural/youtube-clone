import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import styles from '../styles/globals';
import BottomNavigator from '../components/BottomNavigator';

const Shorts = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
        <Text>Youtube Shorts</Text>
        <Text>Güney Ural</Text>
      </View>
      <BottomNavigator navigation={navigation} />
    </SafeAreaView>
  );
};

export default Shorts;
