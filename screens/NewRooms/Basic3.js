import React from 'react';
import {Text, View, StatusBar, ScrollView, SafeAreaView} from 'react-native';
import * as Progress from 'react-native-progress';
import {COLORS, SIZES} from '../../constants';
import CustomButton_form from '../../components/NewProperty/CustomButton_form';
import Custom_Animation from '../../components/NewProperty/Custom_Animation';
const Basic3 = ({navigation}) => {
  function next_page() {
    navigation.replace('MainScreens');
    console.log('next pagee');
  }
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{backgroundColor: 'white'}}>
      <StatusBar
        animated={true}
        backgroundColor={COLORS.mobile_theme_back}
        barStyle={'light-content'}
      />
      <SafeAreaView
        style={{
          height: SIZES.height * 0.03,
          backgroundColor: COLORS.mobile_theme_back,
          elevation: 1,
        }}
      />
      <View>
        <Progress.Bar
          progress={1}
          color={COLORS.mobile_theme_back}
          width={SIZES.width}
          height={SIZES.height * 0.01}
          style={{position: 'absolute', top: -1}}
        />
      </View>
      <View style={{padding: 15, marginTop: 45, flexDirection: 'column'}}>
        <View style={{margin: 24}}>
          <Text
            style={{
              fontSize: 34,
              fontWeight: 'bold',
              color: COLORS.mobile_theme_back,
            }}>
            Thank you for Registering Room
          </Text>
        </View>
        <View>
          <Custom_Animation />
        </View>
      </View>
      <View style={{marginTop: 90}}>
        <CustomButton_form
          fontColor={COLORS.font_color}
          backgroundColor={COLORS.mobile_theme_back}
          label={'Go to Home Screen'}
          _borderColor={COLORS.mobile_theme}
          borderRadius
          onPress={() => {
            next_page();
          }}
        />
      </View>
    </ScrollView>
  );
};
export default Basic3;
