import React, {Component} from 'react';
import {StyleSheet, Dimensions, Button, View} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Pdf from 'react-native-pdf';
import {SIZES} from '../constants';
import NAVHeader_BLOB from '../components/NavHeader_BLOB';
const uri =
  'https://firebasestorage.googleapis.com/v0/b/pgrental-8e454.appspot.com/o/656543418.PDF?alt=media';
const AppTerms = ({navigation}) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        height: SIZES.height,
        backgroundColor: 'white',
      }}>
      <View>
        <NAVHeader_BLOB
          screen_name={'App Terms'}
          onPress_back={() => navigation.navigate('ProfileScreen')}
        />
      </View>
      <View>
        <Pdf
          trustAllCerts={false}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          source={{uri: uri, cache: true}}
          style={styles.pdf}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    // flex: 1,
    // top: 12,
    height: SIZES.height,
    width: Dimensions.get('window').width,
  },
});

export default AppTerms;
