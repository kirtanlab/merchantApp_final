import React from 'react';
import {COLORS, SIZES} from '../../constants';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Nav_Header = ({
  color,
  onPress_forward,
  onPress_back,
  icon_color,
  back,
}) => {
  return (
    <View
      style={
        {
          // top: ,
          // alignItems: 'space-betwe',
        }
      }>
      {back ? (
        <View
          style={{
            flexDirection: 'row',
            top: '6%',
            // paddingBottom: 7,
            borderBottomColor: COLORS.lightGray4,
            borderBottomWidth: 1,
            alignItems: 'center',
            // justifyContent: 'space-evenly',
          }}>
          <View
            style={{
              left: SIZES.width * 0.05,
              width: SIZES.width * 0.22,
              top: 2,
              height: 45,
              // width: 100,
            }}>
            <TouchableOpacity onPress={onPress_back} style={{height: 100}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{}}>
                  <Ionicons
                    name="arrow-back-outline"
                    size={30}
                    color={COLORS.mobile_theme_back}
                    style={{}}
                  />
                </View>
                <View style={{}}>
                  <Text
                    style={{
                      color: COLORS.mobile_theme_back,
                      fontSize: 23,
                    }}>
                    Back
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          {/* Forward */}
          <View
            style={{
              left: SIZES.width * 0.53,
              width: 80,
              height: 45,
            }}>
            <TouchableOpacity onPress={onPress_forward}>
              <View
                style={{
                  height: 37,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{}}>
                  <Text
                    style={{
                      color: color,
                      fontSize: 23,
                    }}>
                    Next
                  </Text>
                </View>
                <View style={{leftL: 1, top: 1}}>
                  <Ionicons
                    name="arrow-forward-outline"
                    size={30}
                    color={icon_color}
                    style={{}}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            // position: 'relative',
            top: '6%',
            // paddingBottom: 7,
            borderBottomColor: COLORS.lightGray4,
            borderBottomWidth: 1,
            // bottom: -20,
            // top: ,
          }}>
          <View
            style={{
              left: SIZES.width * 0.75,
              width: SIZES.width * 0.37,
              height: 40,
              // backgroundColor: COLORS.mobile_theme_back,
            }}>
            <TouchableOpacity onPress={onPress_forward}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{bottom: 2}}>
                  <Text
                    style={{
                      color: color,
                      fontSize: 23,
                    }}>
                    Next
                  </Text>
                </View>
                {/* <View style={{marginLeft: 10}}>

              </View> */}

                <View style={{}}>
                  <Ionicons
                    name="arrow-forward-outline"
                    size={30}
                    color={icon_color}
                    style={{}}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

function mapStateToProps(state) {
  return {
    Landmark: state.newproperty_reducer.Landmark,
    focused_Landmark: state.newproperty_reducer.focused_Landmark,
    focused_Description_pg: state.newproperty_reducer.focused_Description_pg,
    focused_Location: state.newproperty_reducer.focused_Location,
    focused_house_no: state.newproperty_reducer.focused_house_no,
    checked_house_no: state.newproperty_reducer.checked_house_no,
    checked_Location: state.newproperty_reducer.checked_Location,
    checked_Landmark: state.newproperty_reducer.checked_Landmark,
    checked_Description_pg: state.newproperty_reducer.checked_Description_pg,
    Description_pg: state.newproperty_reducer.Description_pg,
    house_no: state.newproperty_reducer.house_no,
    Location: state.newproperty_reducer.Location,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}
export default Nav_Header;
