import React, {useRef, useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  LogBox,
  StyleSheet,
} from 'react-native';
import icons from '../../../constants/icons';
import ImageCarouselData from '../../../data/ImageCarouselData';
import {ParallaxImage} from 'react-native-snap-carousel';
import CustomSlider from './CustomSlider';

const {width: screenWidth} = Dimensions.get('window');

const ImageCarousel = props => {
  return <CustomSlider data={ImageCarouselData} />;
};

export default ImageCarousel;
