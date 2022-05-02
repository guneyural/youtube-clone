import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BottomNavigator = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View style={styles.navItem}>
            <Entypo name="home" size={22} />
            <Text style={styles.navText}>Home</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Shorts')}>
          <View style={styles.navItem}>
            <MaterialCommunityIcons name="video-stabilization" size={22} />
            <Text style={styles.navText}>Shorts</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.navItem}>
            <SimpleLineIcons name="plus" size={32} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.navItem}>
            <Entypo name="folder-video" size={22} />
            <Text style={styles.navText}>Subscriptions</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.navItem}>
            <MaterialIcons name="video-library" size={22} />
            <Text style={styles.navText}>Playlists</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 1,
    width: '100%',
    backgroundColor: '#333',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
  },
  navText: {
    fontSize: 10,
  },
});

export default BottomNavigator;
