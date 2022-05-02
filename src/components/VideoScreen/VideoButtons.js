import React from 'react';
import {View, Text, Pressable, ScrollView, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const VideoButton = ({VideoData}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.buttonsContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Pressable
          style={({pressed}) => [
            styles.button,
            {backgroundColor: pressed ? '#444' : '#333'},
          ]}>
          <AntDesign name="like2" size={25} />
          <Text style={styles.buttonText}>{VideoData.likes}</Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            styles.button,
            {backgroundColor: pressed ? '#444' : '#333'},
          ]}>
          <AntDesign name="dislike2" size={25} />
          <Text style={styles.buttonText}>{VideoData.dislikes}</Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            styles.button,
            {backgroundColor: pressed ? '#444' : '#333'},
          ]}>
          <MaterialCommunityIcons name="share-outline" size={25} />
          <Text style={styles.buttonText}>Share</Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            styles.button,
            {backgroundColor: pressed ? '#444' : '#333'},
          ]}>
          <AntDesign name="download" size={25} />
          <Text style={styles.buttonText}>Download</Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            styles.button,
            {backgroundColor: pressed ? '#444' : '#333'},
          ]}>
          <Feather name="scissors" size={25} />
          <Text style={styles.buttonText}>Cut</Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            styles.button,
            {backgroundColor: pressed ? '#444' : '#333'},
          ]}>
          <MaterialCommunityIcons name="playlist-plus" size={25} />
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    height: 60,
    width: 60,
    margin: 5,
    marginTop: 0,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 12,
    marginTop: 3,
  },
});

export default VideoButton;
