import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import COMMENTS from '../../assets/comments.json';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CommentDetailsModal = ({Comment}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={COMMENTS}
        ListHeaderComponent={() => {
          return (
            <View>
              <TouchableOpacity
                activeOpacity={0.5}
                style={[
                  styles.commentItem,
                  {backgroundColor: '#222', marginTop: 0, paddingTop: 10},
                ]}>
                <View>
                  <Image
                    source={{uri: Comment.user.image}}
                    style={styles.profileImage}
                  />
                </View>
                <View style={{flex: 1, paddingHorizontal: 20}}>
                  <Text style={styles.username}>
                    {Comment.user.name} · {Comment.createdAt}
                  </Text>
                  <Text>{Comment.comment}</Text>
                  <View style={{marginTop: 10, flexDirection: 'row'}}>
                    <TouchableOpacity>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <AntDesign name={'like2'} size={14} />
                        <Text style={{fontSize: 12, marginLeft: 5}}>
                          {Comment.likes}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginLeft: 15,
                        }}>
                        <AntDesign name={'dislike2'} size={14} />
                        <Text style={{fontSize: 12, marginLeft: 5}}>
                          {Comment.dislikes}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {Comment.id % 2 === 0 && (
                      <TouchableOpacity>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 20,
                          }}>
                          <MaterialCommunityIcons
                            name={'comment-text-outline'}
                            size={14}
                          />
                          <Text style={{fontSize: 12, marginLeft: 5}}>
                            {Comment.id + 4}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.textInputContainer}>
                <Image
                  source={{
                    uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/graham.jpg',
                  }}
                  style={styles.profileImage}
                />
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="Reply..."
                  placeholderTextColor={'#858585'}></TextInput>
              </View>
            </View>
          );
        }}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.5}
              style={[styles.commentItem, {paddingLeft: 40}]}>
              <View>
                <Image
                  source={{uri: item.user.image}}
                  style={styles.profileImage}
                />
              </View>
              <View style={{flex: 1, paddingHorizontal: 20}}>
                <Text style={styles.username}>
                  {item.user.name} · {item.createdAt}
                </Text>
                <Text>{item.comment}</Text>
                <View style={{marginTop: 10, flexDirection: 'row'}}>
                  <TouchableOpacity>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <AntDesign name={'like2'} size={14} />
                      <Text style={{fontSize: 12, marginLeft: 5}}>
                        {item.likes}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 15,
                      }}>
                      <AntDesign name={'dislike2'} size={14} />
                      <Text style={{fontSize: 12, marginLeft: 5}}>
                        {item.dislikes}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {item.id % 2 === 0 && (
                    <TouchableOpacity>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginLeft: 20,
                        }}>
                        <MaterialCommunityIcons
                          name={'comment-text-outline'}
                          size={14}
                        />
                        <Text style={{fontSize: 12, marginLeft: 5}}>
                          {item.id + 4}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {height: '100%', width: '100%', backgroundColor: '#333'},
  commentItem: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingBottom: 20,
  },
  profileImage: {
    height: 25,
    width: 25,
    borderRadius: 50,
  },
  username: {
    color: '#949494',
    fontSize: 12,
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
  },
  textInputStyle: {
    width: '100%',
    color: '#efefef',
    paddingLeft: 10,
    height: 60,
  },
});

export default CommentDetailsModal;
