// import React, {Component} from 'react';
// import {StyleSheet, Dimensions, Button, View} from 'react-native';
// import {StackNavigator} from 'react-navigation';
// import Pdf from 'react-native-pdf';
// import {SIZES} from '../constants';
// import NAVHeader_BLOB from '../components/NavHeader_BLOB';
// const uri =
//   'https://firebasestorage.googleapis.com/v0/b/pgrental-8e454.appspot.com/o/656543418.PDF?alt=media';
// const GovtTerms = ({navigation}) => {
//   return (
//     <View
//       style={{
//         flexDirection: 'column',
//         height: SIZES.height,
//         backgroundColor: 'white',
//       }}>
//       <View>
//         <NAVHeader_BLOB
//           screen_name={'Goverment Terms'}
//           onPress_back={() => navigation.navigate('ProfileScreen')}
//         />
//       </View>
//       <View>
//         <Pdf
//           trustAllCerts={false}
//           onLoadComplete={(numberOfPages, filePath) => {
//             console.log(`number of pages: ${numberOfPages}`);
//           }}
//           onPageChanged={(page, numberOfPages) => {
//             console.log(`current page: ${page}`);
//           }}
//           onError={error => {
//             console.log(error);
//           }}
//           source={{uri: uri, cache: true}}
//           style={styles.pdf}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   pdf: {
//     // flex: 1,
//     // top: 12,
//     height: SIZES.height,
//     width: Dimensions.get('window').width,
//   },
// });

// export default GovtTerms;

import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
// import { PRIMARY_COLOR } from "@env";
import NAVHeader_BLOB from "../components/NavHeader_BLOB";
import { COLORS } from "../constants";
const GovtTerms = ({ navigation }) => {
  let PRIMARY_COLOR = COLORS.mobile_theme_back;
  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1, padding: 12 }}>
      <NAVHeader_BLOB
        screen_name={"About Us"}
        onPress_back={() => navigation.navigate("ProfileScreen")}
      />

      <Text
        style={{
          marginTop: 10,
          fontSize: 14,
          color: "#4d4d4d",
          marginBottom: 70,
          marginHorizontal: 7,
          fontFamily: "Poppins-Regular",
        }}
      >
        Welcome To Shelterhub Business {"\n"}
        {"\n"}Shelterhub Business is a Professional rental solutions provider Platform. Here
        we will provide you only interesting content, which you will like very
        much. We're dedicated to providing you the best of rental solutions
        provider, with a focus on dependability and Introducing our startup,
        which aims to provide a hassle-free solution to finding affordable and
        comfortable accommodations in different parts of the city. We understand
        that finding a suitable place to stay can be a daunting task, especially
        when you are new to a city or have limited knowledge of the localities.
        Our platform offers a user-friendly interface that allows users to
        search and compare available rooms in paying guests and hostels across
        different areas of the city. Our vast network of partner properties
        ensures that users have access to a wide variety of options, ranging
        from budget-friendly to premium accommodations. We prioritize user
        satisfaction and have stringent quality checks to ensure that all
        properties meet our standards of hygiene, safety, and comfort. Users can
        view detailed descriptions, photos, and reviews of each property before
        making a booking, giving them complete transparency and control over
        their choices. Our platform also offers seamless booking and payment
        options, making the entire process easy and hassle-free. Our dedicated
        customer support team is always available to assist users with any
        queries or concerns they may have. We believe in making accommodations
        accessible and affordable for everyone, and our platform is the perfect
        solution for students, working professionals, and travelers alike. So
        whether you are looking for a short-term stay or a long-term rental, we
        have got you covered!. We're working to turn our passion for rental
        solutions provider into a booming online website. We hope you enjoy our
        rental solutions provider as much as we enjoy offering them to you.
        {"\n"}
        {"\n"} I will keep posting more important posts on my Website for all of
        you. Please give your support and love. {"\n"}
        {"\n"}Thanks For Visiting Our Application Have a nice day!
      </Text>
    </ScrollView>
  );
};

export default GovtTerms;
