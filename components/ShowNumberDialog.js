import React from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  Provider,
  Headline,
  Paragraph,
} from "react-native-paper";
import { Picker } from "react-native-wheel-pick";
import { COLORS, SIZES } from "../constants";
import InputField from "./InputField";
const ShowNumberDialog = ({
  visible,
  _showDialog,
  setonfocused,
  term,
  _hideDialog,
  digit,
  onChange,
}) => {
  // const [visible, setVisible] = React.useState(false);
  let data = [];
  for (var i = 0; i <= 100; i++) {
    data.push({ value: `${i}`, label: `${i}` });
  }
  return (
    <Portal>
      <Dialog
        style={{ backgroundColor: COLORS.white, height: 280 }}
        visible={visible}
        onDismiss={_hideDialog}
      >
        <Dialog.Content>
          <Text style={{ color: COLORS.mobile_theme_back, fontSize: SIZES.h2 }}>
            Available Number of Rooms
          </Text>
          {/*<InputField
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
          /> */}
          <Picker
            style={{
              // top: 20,
              backgroundColor: "white",
              width: 300,
              height: 172,
            }}
            selectedValue={digit}
            pickerData={data}
            onValueChange={(value) => {
              onChange(value);
            }}
          />
        </Dialog.Content>
        <Dialog.Actions style={{ top: -5 }}>
          <Button style={{}} onPress={_hideDialog}>
            <Text
              style={{
                color: COLORS.mobile_theme_back,
                fontSize: SIZES.h2 - 2,
                // top: -50,
              }}
            >
              Done
            </Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
export default ShowNumberDialog;
