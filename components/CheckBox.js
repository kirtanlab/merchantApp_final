import React, {useEffect} from 'react';
import {Platform, View} from 'react-native';
import {Checkbox} from 'react-native-paper';
import {COLORS} from '../constants';

const CheckBox = ({onPress, status, baseTerms, CheckedBaseTerms}) => {
  //   let [_status, setStatus] = useEffect(status);
  let _status = status;
  return (
    <View>
      {Platform === 'ios' ? (
        <View>
          <Checkbox.IOS
            label="Item"
            uncheckedColor={COLORS.lightGray4}
            color={COLORS.mobile_theme_back}
            status={_status}
            onPress={onPress}
          />
        </View>
      ) : (
        <View>
          <Checkbox.Android
            label="Item"
            uncheckedColor={COLORS.lightGray4}
            color={COLORS.mobile_theme_back}
            status={_status}
            onPress={onPress}
          />
        </View>
      )}
    </View>
  );
};

export default CheckBox;
