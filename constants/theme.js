import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const COLORS = {
  primary: '#1E1E1E',
  secondary: '#3B3B3B',

  mobile_theme: '#ffffff', //button
  mobile_theme_back: '#19347d', //buttons
  font_color: '#ffffff', //for button text
  progress_bar: '#1F1C7D',
  // text_color: 'black'
  white: '#fff',
  lightGreen: '#4BEE70',
  darkGreen: '#237135',
  red: '#D84035',
  black: '#000000',
  gray: '#212125',
  gray1: '#1f1f1f',
  lightGray: '#3B3B3B',
  lightGray2: '#212125',
  lightGray3: '#8E8D8D',
  lightGray4: '#EFEFEF',
  lightGray5: '#EFEDFFD6',
  lightGray6: '#DEDEDE54',
  lightGray7: '#DEDEDE',
  transparentWhite: 'rgba(255, 255, 255, 0.2)',
  transparentBlack: 'rgba(0, 0, 0, 0.8)',
  transparentBlack1: 'rgba(0, 0, 0, 0.4)',
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  //Form Button Sizes
  form_button_borderWidth: 1,
  form_button_borderRadius: 12,
  form_button_minWidth: 80,
  form_button_maxWidth: 160,
  form_button_maxHeight: 37,
  form_button_padding: 5,
  form_button_alignItems: 'center',
  form_button_justifyContent: 'center',

  //Form Button Text
  form_button_text_fontSize: 17,
  form_button_text_fontWeight: 'bold',
  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,
  subtitle: 16,
  custom1: 19,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  largeTitle: {fontFamily: 'Roboto-Black', fontSize: SIZES.largeTitle},
  h1: {fontFamily: 'Roboto-Black', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h4, lineHeight: 22},
  h5: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h5, lineHeight: 22},
  body1: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body1, lineHeight: 36},
  body2: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body2, lineHeight: 30},
  body3: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body3, lineHeight: 22},
  body4: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body4, lineHeight: 22},
  body5: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body5, lineHeight: 22},
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
