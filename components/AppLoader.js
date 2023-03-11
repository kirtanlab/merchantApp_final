import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {SIZES} from '../constants';

const AppLoader = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <LottieView
        source={require('../assets/icons/_home.json')}
        autoPlay
        loop
        style={{height: 100, width: 100}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
    height: SIZES.height,
    width: SIZES.width,
    position: 'absolute',
    // marginTop: '80%',
    // backgroundColor: 'white',
    // marginLeft: 150,
    zIndex: 1,
  },
});
export default AppLoader;
