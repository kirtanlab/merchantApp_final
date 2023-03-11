import React from 'react';
import {View, Text} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import EStyleSheet from 'react-native-extended-stylesheet';

const NotificationBox = ({name, room_type, email, phone_number, time}) => {
  let relative_time = '';
  let time_obj = new Date(time);
  let year = time_obj.getFullYear();
  let month = time_obj.getMonth() + 1;
  let date = time_obj.getUTCDate();
  let Hours = time_obj.getHours();
  let Minutes = time_obj.getMinutes();
  let Seconds = time_obj.getSeconds();
  let ms = time_obj.getMilliseconds();

  var current_obj = new Date();
  let cur_year = current_obj.getFullYear();
  let cur_month = current_obj.getMonth() + 1;
  let cur_date = current_obj.getUTCDate();
  let cur_Hours = current_obj.getHours();
  let cur_Minutes = current_obj.getMinutes();
  let cur_Seconds = current_obj.getSeconds();
  let cur_ms = current_obj.getMilliseconds();

  var test_curr = new Date(
    cur_year,
    cur_month,
    cur_date,
    cur_Hours,
    cur_Minutes,
    cur_Seconds,
    cur_ms,
  );
  var test_time_obj = new Date(year, month, date, Hours, Minutes, Seconds, ms);

  function timeDifference(current, previous) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + ' months ago';
    } else {
      return Math.round(elapsed / msPerYear) + ' years ago';
    }
  }

  relative_time = timeDifference(test_curr, test_time_obj);

  return (
    <View
      style={{
        flexDirection: 'column',
        borderColor: COLORS.lightGray6,
        borderWidth: 1,
        marginTop: 6,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
      }}>
      <View>
        <Text style={{color: COLORS.black, fontSize: 20}}>
          <Text style={{color: COLORS.mobile_theme_back, fontWeight: 'bold'}}>
            {name}
          </Text>{' '}
          has shown intrest in your
          <Text style={{color: COLORS.mobile_theme_back, fontWeight: 'bold'}}>
            {' '}
            {room_type}
          </Text>
        </Text>
      </View>
      <View>
        <View>
          <Text style={{color: COLORS.black, fontSize: 20}}>
            Email:{' '}
            <Text style={{color: COLORS.mobile_theme_back, fontWeight: 'bold'}}>
              {email}
            </Text>
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text style={{color: COLORS.black, fontSize: 20}}>
              Number:{' '}
              <Text
                style={{color: COLORS.mobile_theme_back, fontWeight: 'bold'}}>
                +91{phone_number}
              </Text>
            </Text>
          </View>
          <View
            style={{
              top: 5,
            }}>
            <Text
              style={{
                flex: 1,
                fontSize: 15,
                color: COLORS.mobile_theme_back,
                fontWeight: 'bold',
              }}>
              {relative_time}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default NotificationBox;

const styles = EStyleSheet.create({
  ago_time: {},
});
