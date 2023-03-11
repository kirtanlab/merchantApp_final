import React from 'react';
import {ParallaxImage} from 'react-native-snap-carousel';
import {View, Text, Pressable, SafeAreaView} from 'react-native';
import styles from './carousel_css';
function Carouselitem({item, index}, parallaxProps) {
  return (
    <View>
      <Text>hey</Text>
      <Pressable onPress={() => alert('Image description:' + item.id)}>
        <SafeAreaView style={styles.item}>
          <ParallaxImage
            source={{uri: item.illustration}} /* the source of the image */
            containerStyle={styles.imageContainer}
            style={styles.image}
            {...parallaxProps} /* pass in the necessary props */
          />
          <Text style={styles.title} numberOfLines={2}>
            {item.id}
          </Text>
        </SafeAreaView>
      </Pressable>
    </View>
  );
}

export default Carouselitem;
