import {Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Carouselitem from './CarouselItem';
import {View, Text} from 'react-native';
// import styles from './styles';
import {Button} from 'react-native';
import React, {useRef, useState} from 'react';
import styles from './carousel_css';

import CustomPaging from './CustomPaging';
const {width} = Dimensions.get('window');
export default function CustomSlider({data}) {
  const [slideIndex, setSlideIndex] = useState(0);
  const settings = {
    sliderWidth: width,
    sliderHeight: width,
    itemWidth: width - 80,
    data: data,
    renderItem: Carouselitem,
    hasParallaxImages: true,
    onSnapToItem: index => setSlideIndex(index), //add this in 'settings' variable.
  };

  const carouselRef = useRef(null);
  return (
    <View style={styles.container}>
      <Text>ite's working</Text>
      <Carousel ref={carouselRef} {...settings} />
      <CustomPaging data={data} activeSlide={slideIndex} />
      <View>
        <Button
          onPress={() => carouselRef.current.snapToItem(0)}
          title="Go to start"
        />
        <Button
          onPress={() => carouselRef.current.snapToItem(data.length - 1)}
          title="Go to end"
        />
      </View>
    </View>
  );
}
