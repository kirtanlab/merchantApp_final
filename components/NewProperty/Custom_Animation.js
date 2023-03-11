import React from 'react';
import {StyleSheet, View} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
const color = {
  primary: '#1652f0',
  secondary: '#64E9FF',
};

const remoteSource = {
  uri: 'https://raw.githubusercontent.com/lottie-react-native/lottie-react-native/master/apps/paper/src/animations/Watermelon.json',
};

const localSource = require('../../assets/animations/check.json');

const Custom_Animation = () => {
  const [source, setSource] = React.useState('local');

  const [isLoop, setLoop] = React.useState(false);

  return (
    <View style={styles.container}>
      <AnimatedLottieView
        source={source === 'remote' ? remoteSource : localSource}
        autoPlay={true}
        loop={isLoop}
        style={styles.lottie}
        colorFilters={source === 'local' ? localColorFilter : undefined}
        enableMergePathsAndroidForKitKatAndAbove
        onAnimationFinish={() => {
          console.log('finished');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {flexDirection: 'row', marginTop: 24, columnGap: 12},
  button: {
    backgroundColor: color.primary,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  text: {color: 'white'},
  lottie: {width: 100, height: 100},
});

const localColorFilter = [
  {
    keypath: 'BG',
    color: color.primary,
  },
  {
    keypath: 'O-B',
    color: color.secondary,
  },
  {
    keypath: 'L-B',
    color: color.secondary,
  },
  {
    keypath: 'T1a-Y 2',
    color: color.secondary,
  },
  {
    keypath: 'T1b-Y',
    color: color.secondary,
  },
  {
    keypath: 'T2b-B',
    color: color.secondary,
  },
  {
    keypath: 'T2a-B',
    color: color.secondary,
  },
  {
    keypath: 'I-Y',
    color: color.secondary,
  },
  {
    keypath: 'E1-Y',
    color: color.secondary,
  },
  {
    keypath: 'E2-Y',
    color: color.secondary,
  },
  {
    keypath: 'E3-Y',
    color: color.secondary,
  },
];

export default Custom_Animation;
