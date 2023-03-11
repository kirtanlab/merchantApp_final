import React from 'react';
import {View, Text, ScrollView, TextInput} from 'react-native';
import {
  Button,
  Dialog,
  Portal,
  Provider,
  Headline,
  Paragraph,
} from 'react-native-paper';
import {COLORS, SIZES} from '../constants';
import InputField from './InputField';
const ShowDialog = ({
  visible,
  _showDialog,
  setonfocused,
  term,
  _hideDialog,
  onChange,
}) => {
  // const [visible, setVisible] = React.useState(false);

  return (
    <Portal>
      <Dialog
        style={{backgroundColor: COLORS.white}}
        visible={visible}
        onDismiss={_hideDialog}>
        <Dialog.Content>
          <Text
            style={{color: COLORS.mobile_theme_back, fontSize: SIZES.h2 + 5}}>
            Add Terms
          </Text>
          <InputField
            label={'Add Terms Here'}
            type={'Terms_pg'}
            keyboardType={'default'}
            onFocus={() => {
              console.log('changed');
              setonfocused(true);
            }}
            onBlur={() => {
              console.log('changed');
              setonfocused(false);
            }}
            value={term}
            onChange={e => onChange(e)}
            multiline
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button style={{top: '15%'}} onPress={_hideDialog}>
            <Text
              style={{color: COLORS.mobile_theme_back, fontSize: SIZES.h2 - 2}}>
              Done
            </Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
export default ShowDialog;
