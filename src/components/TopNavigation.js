import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TopNavigation = () => {
  return (
    <View style={styles.navbar}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <AntDesign name="youtube" size={35} color={'red'} />
        <Text style={styles.brandName}>Güney Ural</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="cast-connected" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="notifications" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <AntDesign name="search1" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={{
              uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/graham.jpg',
            }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#333',
  },
  brandName: {
    marginLeft: 10,
    fontWeight: '700',
    fontSize: 16,
  },
  navItem: {
    marginHorizontal: 5,
    width: 30,
    height: 30,
  },
  profileImage: {
    height: 25,
    width: 25,
    borderRadius: 50,
  },
});

export default TopNavigation;
