import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { connect } from "react-redux";
import { COLORS, FONTS, SIZES } from "../constants";
import * as AuthActions from "../store/auth/authActions";
import * as NewPropertyActions from "../store/Newproperty/newproperty_action";
import * as NewRoomActions from "../store/NewRooms/Newrooms_actions";
function InputField({
  label,
  value,
  show,
  icon,
  inputType,
  defaultValue,
  onChange,
  keyboardType,
  totalRooms,
  updateAboutRoom,
  occupancy,
  fieldButtonLabel,
  checked_PropertyName,
  focused_PropertyName,
  update_PropertyName,
  type,
  multiline,
  password,
  fieldButtonFunction,
  updatesign_name,
  updatesign_password,
  updatesign_conf_password,
  updatesign_email,
  sign_email_focused,
  sign_name_focused,
  sign_password_focused,
  sign_conf_pass_focused,
  sign_email_checked,
  sign_name_checked,
  sign_pass_checked,
  sign_conf_pass_checked,
  checked_sign_name,
  focused_sign_name,
  gen_sign_err_method,
  login_pass_checked,
  login_email_checked,
  updatelogin_email,
  updatelogin_pass,
  update_phone,
  phone_checked,
  phone_focused,
  update_adhar_name,
  focused_adhar_name,
  checked_adhar_name,
  checked_house_no,
  checked_description_pg,
  checked_location,
  checked_landmark,
  focused_house_no,
  focused_description_pg,
  focused_landmark,
  focused_location,
  title_no,
  update_house_no,
  update_description_pg,
  update_landmark,
  update_location,
  updateAC,
  updatePrices,
  updatetitle,
  updateAttached,
  checkedtitle,
  checkedAC,
  checkedAttached,
  checkedPrices,
  focusedAC,
  focusedAttached,
  focusedPrices,
  focusedtitle,
  onBlur,
  onFocus,
  focusedOccupancy,
  focusedTotalAvai,
  updateOccupancy,
  updatetotalAval,
  checkedAvailableRoom,
  checkedoccupancy,
  adhar_name,
  phone,
  about_pg,
  propertyName,
  house_no,
  Landmark,
  price,
  about_room,
  checkedMessPrice,
  focusedMessPrice,
  updateMessPrice,
  mess_price,
}) {
  let [sign_name_color, set_sign_name_color] = useState("#ccc");
  let err = false;
  let checked = true;
  const [_pass, setPassword] = useState("");
  useEffect(() => {
    if (err) {
      set_sign_name_color("red");
    } else if (checked) {
      set_sign_name_color("green");
    }
  }, [err, checked]);

  function render_field() {
    function validate_name(val) {
      var regex = /^(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{5,16}$/;
      return regex.test(val);
    }
    function validate_phone(val) {
      var regex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
      // var regex = /^[6-9][0-9]{9}$/;
      return regex.test(val);
    }
    function validate_email(val) {
      var regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      return regex.test(val);
    }
    function validate_password(val) {
      var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      return regex.test(val);
    }
    function validate_conf_password(val, _pass) {
      console.log("lolmlol", password);
      if (val == password) {
        sign_conf_pass_checked(true);
      }
      return val == password;
    }
    if (type == "sign_password") {
      return (
        <TextInput
          onFocus={(e) => {
            sign_password_focused(true);
            gen_sign_err_method(false);
          }}
          onBlur={() => {
            sign_password_focused(false);
          }}
          value={value}
          defaultValue={defaultValue}
          placeholder={label}
          keyboardType={keyboardType}
          style={{
            flex: 1,
            paddingVertical: 0,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            // paddingBottom: 0,
            fontSize: SIZES.form_section_input_fontsize,
          }}
          secureTextEntry={false}
          onChange={(value) => {
            value = value.nativeEvent.text;
            value = value.trimEnd();
            // sign_conf_pass_checked(false);
            validate_conf_password();
            setPassword(value);
            console.log(_pass, "clear");
            updatesign_password(value);
            // console.log('handeled', value.nativeEvent.text);
            if (validate_password(value)) {
              sign_pass_checked(true);
              // gen_sign_err_method(false);
              // sign_password_focused(false);
            } else {
              sign_pass_checked(false);
            }
          }}
        />
      );
    }
    if (type == "new_password") {
      return (
        <TextInput
          // pointerEvents="
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={label}
          keyboardType={keyboardType}
          style={{
            flex: 1,
            paddingVertical: 0,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            // paddingBottom: 4,
            fontSize: SIZES.form_section_input_fontsize,
          }}
          // editable={false}
          contextMenuHidden={true}
          // selectTextOnFocus={false}
          onChange={onChange}
        />
      );
    }
    if (type == "new_conf_password") {
      return (
        <TextInput
          // pointerEvents="
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={label}
          keyboardType={keyboardType}
          style={{
            flex: 1,
            paddingVertical: 0,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            // paddingBottom: 4,
            fontSize: SIZES.form_section_input_fontsize,
          }}
          // editable={false}
          contextMenuHidden={true}
          // selectTextOnFocus={false}
          onChange={onChange}
        />
      );
    }
    if (type == "sign_email") {
      return (
        <TextInput
          onFocus={(e) => {
            sign_email_focused(true);
            gen_sign_err_method(false);
            // sign_email_checked(false);
          }}
          onBlur={() => {
            sign_email_focused(false);
          }}
          placeholder={label}
          keyboardType={keyboardType}
          style={{
            flex: 1,
            paddingVertical: 0,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            // paddingBottom: 4,
            fontSize: SIZES.form_section_input_fontsize,
          }}
          value={value}
          defaultValue={defaultValue}
          onChange={(value) => {
            value = value.nativeEvent.text;
            value = value.trimEnd();
            updatesign_email(value);
            if (validate_email(value)) {
              sign_email_checked(true);
              // sign_email_focused(false);
            } else {
              sign_email_checked(false);
            }
          }}
        />
      );
    }
    if (type == "sign_name") {
      return (
        <TextInput
          onFocus={(e) => {
            sign_name_focused(true);
            gen_sign_err_method(false);
          }}
          onBlur={() => {
            sign_name_focused(false);
          }}
          value={value}
          defaultValue={defaultValue}
          placeholder={label}
          keyboardType={keyboardType}
          style={{
            flex: 1,
            paddingVertical: 0,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            // paddingBottom: 4,
            fontSize: SIZES.form_section_input_fontsize,
          }}
          onChange={(value) => {
            value = value.nativeEvent.text;
            value = value.trimEnd();
            updatesign_name(value);
            if (validate_name(value)) {
              sign_name_checked(true);
              // sign_name_focused(false);
            } else {
              sign_name_checked(false);
            }
          }}
        />
      );
    }
    if (type === "sign_conf_password") {
      return (
        <TextInput
          onFocus={(e) => {
            sign_conf_pass_focused(true);
            console.log("focused", _pass);
            gen_sign_err_method(false);
          }}
          onBlur={() => {
            sign_conf_pass_focused(false);
          }}
          value={value}
          defaultValue={defaultValue}
          placeholder={label}
          keyboardType={keyboardType}
          style={{
            flex: 1,
            paddingVertical: 0,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            // paddingBottom: 4,
            fontSize: SIZES.form_section_input_fontsize,
          }}
          onChange={(value) => {
            value = value.nativeEvent.text;
            value = value.trimEnd();
            updatesign_conf_password(value);
            console.log(_pass, "maybe");
            if (validate_conf_password(value, _pass)) {
              sign_conf_pass_checked(true);
              // sign_conf_pass_focused(false);
            } else {
              sign_conf_pass_checked(false);
            }
          }}
        />
      );
    }
    if (type == "login_email") {
      return (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{
            flex: 1,
            paddingVertical: 0,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 4,
            fontSize: SIZES.form_section_input_fontsize,
          }}
          value={value}
          defaultValue={defaultValue}
          onChange={(value) => {
            onChange,
              // coole.log('handeled', value.nativeEvent.text);
              // updatesign_email(value.nativeEvent.text);
              (value = value.nativeEvent.text);
            value = value.trimEnd();
            console.log("cliekd");
            updatelogin_email(value);
            if (validate_email(value)) {
              login_email_checked(true);
            } else {
              login_email_checked(false);
            }
          }}
        />
      );
    }
    if (type == "forget_email") {
      return (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{
            flex: 1,
            paddingVertical: 0,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 4,
            fontSize: SIZES.form_section_input_fontsize,
          }}
          onChange={onChange}
        />
      );
    }

    if (type == "login_password") {
      return (
        <TextInput
          value={value}
          placeholder={label}
          keyboardType={keyboardType}
          defaultValue={defaultValue}
          style={{
            flex: 0.85,
            paddingVertical: 0,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            // paddingBottom: 4,

            fontSize: SIZES.form_section_input_fontsize,
          }}
          secureTextEntry={show}
          onChange={(value) => {
            onChange,
              // console.log('handeled', value.nativeEvent.text);
              (value = value.nativeEvent.text),
              // updatesign_password(value.nativeEvent.text);
              updatelogin_pass(value);
            if (validate_password(value)) {
              login_pass_checked(true);
              console.log(true);
            } else {
              login_pass_checked(false);
            }
          }}
        />
      );
    }
    if (type == "Adhar_Name") {
      return (
        <TextInput
          onFocus={() => {
            console.log("Entering focued");
            focused_adhar_name(true);
            // gen_sign_err_method(false);
          }}
          onBlur={() => {
            console.log("!Entering focued");
            focused_adhar_name(false);
          }}
          placeholder={label}
          keyboardType={keyboardType}
          style={{
            flex: 1,
            paddingVertical: 0,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            // paddingBottom: -10,
            marginTop: 6,
            left: -5,
            fontSize: SIZES.form_section_input_fontsize,
          }}
          defaultValue={adhar_name}
          // secureTextEntry={true}
          onChange={(value) => {
            console.log("handeled", value.nativeEvent.text);
            // updatesign_password(value.nativeEvent.text);
            value = value.nativeEvent.text;
            if (value !== "") {
              checked_adhar_name(true);
              update_adhar_name(value);
            } else {
              checked_adhar_name(false);
            }
          }}
        />
      );
    }
    if (type == "PropertyName") {
      return (
        <TextInput
          onFocus={() => {
            console.log("Entering focued");
            focused_PropertyName(true);
            // gen_sign_err_method(false);
          }}
          onBlur={() => {
            console.log("!Entering focued");
            focused_PropertyName(false);
          }}
          placeholder={label}
          keyboardType={keyboardType}
          style={{
            flex: 1,
            paddingVertical: 0,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            marginTop: 6,
            // paddingBottom: -10,
            left: -10,
            fontSize: SIZES.form_section_input_fontsize,
          }}
          // value={propertyName}
          defaultValue={propertyName}
          // secureTextEntry={true}

          onChangeText={(value) => {
            // console.log("valueonchagnetext", value);
            // update_PropertyName(value);
            if (value !== "") {
              update_PropertyName(value);
              checked_PropertyName(true);
            } else {
              checked_PropertyName(false);
            }
          }}
          // onChange={(value) => {
          //   console.log("handeled", value.nativeEvent.text);

          //   // updatesign_password(value.nativeEvent.text);
          //   value = value.nativeEvent.text;
          //   update_PropertyName(value);
          // if (value !== "") {
          //   checked_PropertyName(true);
          // } else {
          //   checked_PropertyName(false);
          // }
          // }}
        />
      );
    }
    if (type == "totalRooms") {
      return (
        <TextInput
          onFocus={() => {
            console.log("Entering totalRooms");
            focusedTotalAvai(true);
            // gen_sign_err_method(false);
          }}
          onBlur={() => {
            console.log("!Entering focued");
            focusedTotalAvai(false);
          }}
          value={totalRooms}
          placeholder={label}
          keyboardType={keyboardType}
          style={{
            flex: 1,
            paddingVertical: 0,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            marginTop: 6,
            paddingBottom: 4,
            fontSize: SIZES.form_section_input_fontsize,
          }}
          // secureTextEntry={true}
          onChange={(value) => {
            // console.log('handeled', value.nativeEvent.text);
            value = value.nativeEvent.text;

            // console.log('total', Number(value.nativeEvent.text));

            updatetotalAval(value);
            if (Number(value) >= 1 && Number(value) % 1 == 0) {
              console.log("etnereed green");
              checkedAvailableRoom(true);
              // gen_sign_err_method(false);
              // sign_password_focused(false);
            } else {
              checkedAvailableRoom(false);
            }
          }}
        />
      );
    }
    if (type == "occupancy") {
      return (
        <TextInput
          onFocus={() => {
            console.log("Entering occupacny");
            focusedOccupancy(true);
            // gen_sign_err_method(false);
          }}
          onBlur={() => {
            console.log("!Entering focued");
            focusedOccupancy(false);
          }}
          value={occupancy}
          placeholder={label}
          keyboardType={keyboardType}
          style={{
            flex: 1,
            paddingVertical: 0,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            marginTop: 6,
            paddingBottom: 4,
            fontSize: SIZES.form_section_input_fontsize,
          }}
          // secureTextEntry={true}
          onChange={(value) => {
            // console.log('handeled', value.nativeEvent.text);
            value = value.nativeEvent.text;

            updateOccupancy(value);
            if (Number(value) >= 1 && Number(value) % 1 == 0) {
              console.log("etnereed green");
              checkedoccupancy(true);
              // gen_sign_err_method(false);
              // sign_password_focused(false);
            } else {
              checkedoccupancy(false);
            }
          }}
        />
      );
    }
    if (type == "phone") {
      return (
        <TextInput
          onFocus={() => {
            console.log("Entering focued");
            phone_focused(true);
            // gen_sign_err_method(false);
          }}
          onBlur={() => {
            console.log("!Entering focued");
            phone_focused(false);
          }}
          value={phone.toString()}
          // defaultValue={defaultValue}
          placeholder={label}
          keyboardType={keyboardType}
          style={{
            flex: 1,
            paddingVertical: 0,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 4,
            fontSize: SIZES.form_section_input_fontsize,
          }}
          // secureTextEntry={true}
          onChange={(value) => {
            if (value.nativeEvent.text === "") {
              value = "";
            } else {
              value = Number(value.nativeEvent.text.trimEnd());
            }

            // console.log('handeled', value.nativeEvent.text);
            update_phone(value);
            if (validate_phone(value)) {
              console.log("etnereed green");
              phone_checked(true);
              // gen_sign_err_method(false);
              // sign_password_focused(false);
            } else {
              phone_checked(false);
            }
          }}
        />
      );
    }
    if (type == "prices") {
      return (
        <TextInput
          onFocus={() => {
            console.log("Entering focued");
            focusedPrices(true);
            // gen_sign_err_method(false);
          }}
          onBlur={() => {
            console.log("!Entering focued");
            focusedPrices(false);
          }}
          placeholder={label}
          keyboardType={keyboardType}
          style={{
            flex: 1,
            paddingVertical: 0,
            borderBottomColor: "#ccc",
            marginTop: 6,
            borderBottomWidth: 1,
            paddingBottom: 4,
            fontSize: SIZES.form_section_input_fontsize,
          }}
          value={price.toString()}
          // secureTextEntry={true}
          onChange={(value) => {
            let value_string = value.nativeEvent.text;
            // console.log('handeled', value.nativeEvent.text.length);
            // value = Number(value_string);
            updatePrices(value_string);
            console.log("value_prices", value_string);
            if (Number(value_string) >= 99 && Number(value_string) % 1 == 0) {
              console.log("etnereed green");
              checkedPrices(true);
              // gen_sign_err_method(false);
              // sign_password_focused(false);
            } else {
              checkedPrices(false);
            }
          }}
        />
      );
    }
    if (type == "mess_prices") {
      return (
        <TextInput
          onFocus={() => {
            console.log("Entering focued");
            focusedMessPrice(true);
            // gen_sign_err_method(false);
          }}
          onBlur={() => {
            console.log("!Entering focued");
            focusedMessPrice(false);
          }}
          placeholder={label}
          keyboardType={keyboardType}
          style={{
            flex: 1,
            paddingVertical: 0,
            borderBottomColor: "#ccc",
            marginTop: 6,
            borderBottomWidth: 1,
            paddingBottom: 4,
            fontSize: SIZES.form_section_input_fontsize,
          }}
          value={mess_price.toString()}
          // secureTextEntry={true}

          onChange={(value) => {
            let value_string = value.nativeEvent.text;
            // console.log('handeled', value.nativeEvent.text.length);
            // value = Number(value_string);
            updateMessPrice(value_string);
            console.log("value_prices", value_string);
            if (Number(value_string) >= 10 && Number(value_string) % 1 == 0) {
              console.log("etnereed green");
              checkedMessPrice(true);
              // gen_sign_err_method(false);
              // sign_password_focused(false);
            } else {
              checkedMessPrice(false);
            }
          }}
        />
      );
    }
    if (type == "room_title") {
      return (
        <TextInput
          onFocus={() => {
            console.log("Entering focued House No");
            focusedtitle(true);
            // gen_sign_err_method(false);
          }}
          onBlur={() => {
            console.log("!Entering focued House No");
            focusedtitle(false);
          }}
          placeholder={label}
          keyboardType={keyboardType}
          style={{
            flex: 1,
            paddingVertical: 0,
            borderBottomColor: "#ccc",
            marginTop: 6,
            borderBottomWidth: 1,
            paddingBottom: 4,
            fontSize: SIZES.form_section_input_fontsize,
          }}
          value={title_no}
          // secureTextEntry={true}
          onChange={(value) => {
            value = value.nativeEvent.text;
            // console.log('hande
            // console.log('handeled', value.nativeEvent.text);
            // value = Number(value.nativeEvent.text);
            updatetitle(value);
            if (value !== "") {
              console.log("etnereed house no");
              checkedtitle(true);
              // gen_sign_err_method(false);
              // sign_password_focused(false);
            } else {
              checkedtitle(false);
            }
          }}
        />
      );
    }
    if (type == "House_No") {
      return (
        <TextInput
          onFocus={() => {
            console.log("Entering focued House No");
            focused_house_no(true);
            // gen_sign_err_method(false);
          }}
          onBlur={() => {
            console.log("!Entering focued House No");
            focused_house_no(false);
          }}
          placeholder={label}
          keyboardType={keyboardType}
          defaultValue={house_no}
          style={{
            flex: 1,
            paddingVertical: 0,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 4,
            marginTop: 6,
            fontSize: SIZES.form_section_input_fontsize,
          }}
          // secureTextEntry={true}
          onChange={(value) => {
            value = value.nativeEvent.text;
            // console.log('hande
            // console.log('handeled', value.nativeEvent.text);
            // value = Number(value.nativeEvent.text);

            if (value !== "") {
              console.log("etnereed house no");
              checked_house_no(true);
              update_house_no(value);
              // gen_sign_err_method(false);
              // sign_password_focused(false);
            } else {
              checked_house_no(false);
            }
          }}
        />
      );
    }
    if (type == "Description_pg") {
      return (
        <TextInput
          onFocus={() => {
            console.log("Entering focued House No");
            focused_description_pg(true);
            // gen_sign_err_method(false);
          }}
          onBlur={() => {
            console.log("!Entering focued House No");
            focused_description_pg(false);
          }}
          placeholder={label}
          keyboardType={keyboardType}
          style={{
            flex: 1,
            paddingVertical: 0,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 4,
            fontSize: 19,
          }}
          // secureTextEntry={true}
          onChange={(value) => {
            value = value.nativeEvent.text;
            // console.log('handeled', value.nativeEvent.text);
            // value = Number(value.nativeEvent.text);
            if (value !== "") {
              console.log("etnereed house no");
              checked_description_pg(true);
              // gen_sign_err_method(false);
              // sign_password_focused(false);
              update_description_pg(value);
            } else {
              checked_description_pg(false);
            }
          }}
        />
      );
    }
    if (type == "Landmark") {
      return (
        <TextInput
          onFocus={() => {
            console.log("Entering focued landmark");
            focused_landmark(true);
            // gen_sign_err_method(false);
          }}
          onBlur={() => {
            console.log("!Entering focued landmark");
            focused_landmark(false);
          }}
          placeholder={label}
          keyboardType={keyboardType}
          style={{
            flex: 1,
            paddingVertical: 0,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            marginTop: 6,
            paddingBottom: 4,
            fontSize: SIZES.form_section_input_fontsize,
          }}
          defaultValue={Landmark}
          // secureTextEntry={true}
          onChange={(value) => {
            // console.log('handeled', value.nativeEvent.text);
            value = value.nativeEvent.text;

            if (value !== "") {
              console.log("etnereed landmark");
              update_landmark(value);
              checked_landmark(true);
              // gen_sign_err_method(false);
              // sign_password_focused(false);
            } else {
              checked_landmark(false);
            }
          }}
        />
      );
    }
    if (type == "Terms_pg") {
      return (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          multiline={multiline ? true : false}
          style={{
            // flex: 1,
            marginTop: 10,
            paddingVertical: 5,
            // borderBottomColor: COLORS.lightGray4,
            // borderBottomWidth: 1,
            // paddingBottom: 4,
            fontSize: 19,
            // paddingRight: 10,
            lineHeight: 23,
            flex: 2,
            textAlignVertical: "top",
            height: 200,
            borderRadius: SIZES.form_button_borderRadius,
            borderWidth: 1,
            borderColor: COLORS.lightGray4,
            // shadowColor: '#000',

            // elevation: 5,
          }}
          // secureTextEntry={true}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      );
    }
    if (type == "About_pg") {
      return (
        <TextInput
          // onFocus={() => {
          //   console.log('Entering focued landmark');
          //   focused_landmark(true);
          //   // gen_sign_err_method(false);
          // }}
          // onBlur={() => {
          //   console.log('!Entering focued landmark');
          //   focused_landmark(false);
          // }}
          placeholder={label}
          keyboardType={keyboardType}
          multiline={multiline ? true : false}
          style={{
            paddingVertical: -2,
            borderBottomColor: COLORS.lightGray4,
            borderBottomWidth: 1,
            fontSize: FONTS.form_section_input_fontsize,
            // lineHeight: 25,
            width: "95%",
            textAlignVertical: "top",
            height: 200,
            // alignContent: "center",
            // justifyContent: "center",
            // fontWeight: "bold",
            borderWidth: 1,
            borderColor: COLORS.lightGray4,
          }}
          // secureTextEntry={true}
          onChange={onChange}
          value={about_pg}
        />
      );
    }
    if (type == "About_room") {
      return (
        <TextInput
          // onFocus={() => {
          //   console.log('Entering focued landmark');
          //   focused_landmark(true);
          //   // gen_sign_err_method(false);
          // }}
          // onBlur={() => {
          //   console.log('!Entering focued landmark');
          //   focused_landmark(false);
          // }}
          value={about_room}
          placeholder={label}
          keyboardType={keyboardType}
          multiline={multiline ? true : false}
          style={{
            paddingVertical: -2,
            borderBottomColor: COLORS.lighupdate_house_notGray4,
            borderBottomWidth: 1,
            fontSize: SIZES.form_section_input_fontsize,
            lineHeight: 23,
            width: SIZES.width * 0.88,
            textAlignVertical: "top",
            // minHeight: 50,
            minHeight: 180,
            // fontWeight: "bold",
            borderWidth: 1,
            borderColor: COLORS.lightGray4,
          }}
          returnKeyType="done"
          returnKeyLabel="done"
          // secureTextEntry={true}
          onChange={(value) => {
            value = value.nativeEvent.text;
            // console.log('handeled', value.nativeEvent.text);
            updateAboutRoom(value);
          }}
        />
      );
    }
  }

  return (
    <View
      style={{
        flexDirection: "row",
        paddingBottom: 8,
        marginBottom: 25,
      }}
    >
      {icon}
      {render_field()}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text
          style={{
            color: COLORS.mobile_theme_back,
            // fontWeight: "bold",
            // left: 100,
            position: "absolute",
            marginTop: 10,
            marginLeft: 4,
            fontSize: 14,
          }}
        >
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    password: state.authReducer.sign_password,
    adhar_name: state.authReducer.adhar_name,
    phone: state.authReducer.phone,
    title_no: state.Newrooms_reducer.title_no,
    about_pg: state.newproperty_reducer.about_pg,
    propertyName: state.newproperty_reducer.propertyName,
    about_room: state.Newrooms_reducer.about_room,
    about_room: state.Newrooms_reducer.about_room,
    totalRooms: state.Newrooms_reducer.totalRooms,
    occupancy: state.Newrooms_reducer.occupancy,
    house_no: state.newproperty_reducer.house_no,
    price: state.Newrooms_reducer.price,
    mess_price: state.newproperty_reducer.mess_price,
    Landmark: state.newproperty_reducer.Landmark,
    // propertyName: state.newproperty_reducer.propertyName,
    // propertyName: state.newproperty_reducer.propertyName,

    checked_sign_name: state.authReducer.checked_sign_name,
    focused_sign_name: state.authReducer.focused_sign_name,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkedMessPrice: (value) => {
      return dispatch(NewPropertyActions.checkedMessPrice(value));
    },
    focusedMessPrice: (value) => {
      return dispatch(NewPropertyActions.focusedMessPrice(value));
    },
    updateMessPrice: (value) => {
      return dispatch(NewPropertyActions.updateMessPrice(value));
    },
    updateAboutRoom: (value) => {
      dispatch(NewRoomActions.updateAboutRoom(value));
    },
    //NewRoom
    updateExtraDescription: (value) => {
      dispatch(NewRoomActions.updateExtraDescription(value));
    },

    checkedtitle: (value) => {
      return dispatch(NewRoomActions.checkedtitle(value));
    },
    checkedPrices: (value) => {
      return dispatch(NewRoomActions.checkedPrices(value));
    },
    focusedtitle: (value) => {
      return dispatch(NewRoomActions.focusedtitle(value));
    },
    focusedPrices: (value) => {
      return dispatch(NewRoomActions.focusedPrices(value));
    },
    updatetitle: (value) => {
      return dispatch(NewRoomActions.updatetitle(value));
    },
    updatetotalAval: (value) => {
      return dispatch(NewRoomActions.updatetotalAval(value));
    },
    updateOccupancy: (value) => {
      return dispatch(NewRoomActions.updateOccupancy(value));
    },
    focusedTotalAvai: (value) => {
      return dispatch(NewRoomActions.focusedTotalAvai(value));
    },
    focusedOccupancy: (value) => {
      return dispatch(NewRoomActions.focusedOccupancy(value));
    },
    checkedAvailableRoom: (value) => {
      return dispatch(NewRoomActions.checkedAvailableRoom(value));
    },
    checkedoccupancy: (value) => {
      return dispatch(NewRoomActions.checkedoccupancy(value));
    },
    updatePrices: (value) => {
      return dispatch(NewRoomActions.updatePrices(value));
    },
    //Newproperty Name
    checked_PropertyName: (value) => {
      return dispatch(NewPropertyActions.checked_PropertyName(value));
    },
    focused_PropertyName: (value) => {
      return dispatch(NewPropertyActions.focused_PropertyName(value));
    },
    update_PropertyName: (value) => {
      return dispatch(NewPropertyActions.update_PropertyName(value));
    },
    // location
    checked_house_no: (value) => {
      return dispatch(NewPropertyActions.checked_house_no(value));
    },
    checked_description_pg: (value) => {
      return dispatch(NewPropertyActions.checked_description_pg(value));
    },
    checked_location: (value) => {
      return dispatch(NewPropertyActions.checked_location(value));
    },
    checked_landmark: (value) => {
      return dispatch(NewPropertyActions.checked_landmark(value));
    },
    //location focusd
    focused_house_no: (value) => {
      return dispatch(NewPropertyActions.focused_house_no(value));
    },
    focused_description_pg: (value) => {
      return dispatch(NewPropertyActions.focused_description_pg(value));
    },
    focused_landmark: (value) => {
      return dispatch(NewPropertyActions.focused_landmark(value));
    },
    focused_location: (value) => {
      return dispatch(NewPropertyActions.focused_location(value));
    },
    //update loaction
    update_house_no: (value) => {
      return dispatch(NewPropertyActions.update_house_no(value));
    },
    update_description_pg: (value) => {
      return dispatch(NewPropertyActions.update_description_pg(value));
    },
    update_landmark: (value) => {
      return dispatch(NewPropertyActions.update_landmark(value));
    },
    update_location: (value) => {
      return dispatch(NewPropertyActions.update_location(value));
    },

    checked_adhar_name: (value) => {
      return dispatch(AuthActions.adhar_name_checked(value));
    },
    focused_adhar_name: (value) => {
      return dispatch(AuthActions.adhar_name_focused(value));
    },
    update_adhar_name: (value) => {
      return dispatch(AuthActions.update_adhar_name(value));
    },
    update_phone: (value) => {
      return dispatch(AuthActions.update_phone(value));
    },
    updatelogin_email: (value) => {
      return dispatch(AuthActions.updatelogin_email(value));
    },
    updatelogin_pass: (value) => {
      return dispatch(AuthActions.updatelogin_pass(value));
    },
    updatesign_name: (value) => {
      return dispatch(AuthActions.updatesign_name(value));
    },
    updatesign_password: (value) => {
      return dispatch(AuthActions.updatesign_password(value));
    },
    updatesign_conf_password: (value) => {
      return dispatch(AuthActions.updatesign_conf_password(value));
    },
    updatesign_email: (value) => {
      return dispatch(AuthActions.updatesign_email(value));
    },
    sign_email_focused: (value) => {
      return dispatch(AuthActions.sign_email_focused(value));
    },
    phone_focused: (value) => {
      return dispatch(AuthActions.phone_focused(value));
    },
    sign_name_focused: (value) => {
      return dispatch(AuthActions.sign_name_focused(value));
    },
    sign_password_focused: (value) => {
      return dispatch(AuthActions.sign_password_focused(value));
    },
    sign_conf_pass_focused: (value) => {
      return dispatch(AuthActions.sign_conf_pass_focused(value));
    },
    sign_email_checked: (value) => {
      return dispatch(AuthActions.sign_email_checked(value));
    },
    sign_name_checked: (value) => {
      return dispatch(AuthActions.sign_name_checked(value));
    },
    phone_checked: (value) => {
      return dispatch(AuthActions.phone_checked(value));
    },
    sign_pass_checked: (value) => {
      return dispatch(AuthActions.sign_pass_checked(value));
    },
    sign_conf_pass_checked: (value) => {
      return dispatch(AuthActions.sign_conf_pass_checked(value));
    },
    gen_sign_err_method: (value) => {
      return dispatch(AuthActions.gen_sign_err(value));
    },
    login_pass_checked: (value) => {
      return dispatch(AuthActions.login_pass_checked(value));
    },
    login_email_checked: (value) => {
      return dispatch(AuthActions.login_email_checked(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InputField);
