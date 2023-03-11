import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import * as newproperty_actions from '../store/Newproperty/newproperty_action';
import * as Newproperty_ext_actions from '../store/Newproperty_ext/Newproperty_ext_actions';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {REACT_APP_MAPS_API_KEY} from '@env';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';
import {Searchbar} from 'react-native-paper';
import {COLORS, SIZES} from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NAVHeader_BLOB from '../components/NavHeader_BLOB';
import NavHeader_Maps from '../components/NavHeader_Maps';
import {connect} from 'react-redux';
const MapTest = ({
  updateLocationAddress,
  checked_location,
  update_location,
  navigation,
}) => {
  const [origin, setOrigin] = React.useState({
    latitude: 25.2138,
    longitude: 75.8648,
  });
  const [value, setValue] = React.useState(null);
  const [location, setLoaction] = React.useState({});
  const [current, setCurrent] = React.useState({});
  const [dyn_positions, setDynPositions] = React.useState('');
  const mapRef = React.useRef(null);
  function getAddressFromCoordinates({latitude, longitude}) {
    return new Promise((resolve, reject) => {
      fetch(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
          latitude +
          ',' +
          longitude +
          '&key=' +
          REACT_APP_MAPS_API_KEY,
      )
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.status === 'OK') {
            resolve(responseJson?.results?.[0]?.formatted_address);
            let address = responseJson?.results?.[0]?.formatted_address;
            // setLocationAddress(address);
            updateLocationAddress(address);
          } else {
            reject('not found');
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  navigator.geolocation = require('@react-native-community/geolocation');
  const moveTo = async position => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, {duration: 1000});
    }
  };
  const onPlaceSelected = details => {
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    moveTo(position);
    setOrigin(position);
  };
  const {width, height} = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const INTIAL_POSITION = {
    latitude: 25.2138,
    longitude: 75.8648,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  function region() {
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.02;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const INTIAL_POSITION = {
      latitude: 22.554029,
      longitude: 72.948936,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    // console.log(typeof INTIAL_POSITION);
    return INTIAL_POSITION;
  }
  const google_ref = React.useRef();

  const onChangeSearch = e => {
    console.log('onChangeSearch', e.nativeEvent.text);
    setValue(e.nativeEvent.text);
  };
  //   setInitialCordinates({latitude: INTIAL_POSITION.latitude,longitude : INTIAL_POSITION.longitude})

  return (
    <KeyboardAvoidingView>
      <View>
        {/* Header */}

        {/* <HeaderBar title="Change Profile" /> */}
        {/* <Nav_Header /> */}
        <StatusBar
          animated={true}
          backgroundColor={COLORS.mobile_theme_back}
          barStyle={'light-content'}
        />
        <NavHeader_Maps
          screen_name={'Select Location'}
          onPress_back={() => {
            // navigation.navigate('Newproperty', {
            //   screen: 'Location',
            // });
          }}
          onPress_forward={async () => {
            if (location) {
              checked_location(true);
              update_location(location);
              console.log('Location', location);
              await getAddressFromCoordinates({
                latitude: location.latitude,
                longitude: location.longitude,
              });
            } else {
              checked_location(true);
              update_location(origin);
              console.log('origin', origin);
              await getAddressFromCoordinates({
                latitude: origin.latitude,
                longitude: origin.longitude,
              });
            }
            navigation.navigate('Newproperty', {
              screen: 'Location',
            });
          }}
        />

        <View style={styles.container}>
          <Ionicons
            name="location"
            size={50}
            style={{
              zIndex: 3,
              position: 'absolute',
              marginTop: -37,
              marginLeft: -11,
              left: '50%',
              top: '50%',
              color: COLORS.mobile_theme_back,
            }}
          />
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={INTIAL_POSITION}
            region={region()}
            onRegionChangeComplete={e => {
              console.log('region changed', e);
              const dyn_position = {
                latitude: e.latitude,
                longitude: e.longitude,
              };
              setLoaction(e);
              // moveTo(dyn_position);
              // setOrigin(dyn_position);
            }}
            ref={mapRef}></MapView>
          <View style={styles.searchContainer}>
            <View style={{flex: 8}}>
              <GooglePlacesAutocomplete
                placeholder="Search .."
                minLength={2}
                keepResultsAfterBlur={false}
                listViewDisplayed={false}
                returnKeyType={'search'}
                enablePoweredByContainer={false}
                renderDescription={row => row.description}
                autoFocus={false}
                textInputProps={{
                  onChange: onChangeSearch,
                  value: value,
                  blurOnSubmit: false,
                }}
                ref={google_ref}
                fetchDetails
                styles={{
                  description: {
                    fontWeight: 'bold',
                  },
                  textInput: {
                    fontWeight: 'bold',
                    fontSize: SIZES.h2,
                  },

                  row: {
                    // display: 'none',
                    backgroundColor: '#FFFFFF',
                    padding: 13,
                    height: 44,
                    flexDirection: 'row',

                    // fontSize: 20,
                  },

                  predefinedPlacesDescription: {
                    color: '#1faadb',
                  },
                }}
                onPress={(data, details = null) => {
                  onPlaceSelected(details);
                }}
                query={{
                  key: REACT_APP_MAPS_API_KEY,
                  language: 'en',
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                console.log('clicked');
                setValue(null);
                google_ref.current.blur();
              }}>
              <Ionicons
                name="close-circle-outline"
                size={35}
                style={{flex: 1, color: COLORS.mobile_theme_back, top: 3}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            Geolocation.getCurrentPosition(info => {
              const ASPECT_RATIO = width / height;
              const LATITUDE_DELTA = 0.02;
              const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
              const CURRENT_POSITION = {
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              };
              position = {
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
              };
              setCurrent(CURRENT_POSITION);
              moveTo(position);
              setOrigin(position);
              // console.log(
              //   typeof info.coords.latitude,
              //   typeof info.coords.longitude,
              // );
            });
          }}
          style={{
            position: 'absolute',
            top: '80%',
            left: '25%',
            minWidth: '45%',
            maxWidth: 200,
            paddingLeft: 12,

            // width: 180,
            // maxWidth: 200,
            // paddingHorizontal: 12,
            height: 40,
            backgroundColor: COLORS.mobile_theme_back,
            // justifyContent: 'center',
            alignItems: 'center',
            //   padding: 10,
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <Ionicons
            name="compass-outline"
            size={25}
            style={{flex: 1, color: COLORS.white, top: 2}}
          />
          <Text
            style={{
              fontSize: SIZES.form_button_text_fontSize,
              color: COLORS.white,
              fontWeight: 'bold',
              flex: 4,
            }}>
            current location
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

function mapStateToProps(state) {
  return {
    checked_Location: state.Newproperty_ext_reducer.checked_Location,
    Location: state.Newproperty_ext_reducer.Location,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    update_location: value => {
      dispatch(Newproperty_ext_actions.update_location(value));
    },
    checked_location: value => {
      dispatch(Newproperty_ext_actions.checked_location(value));
    },
    updateLocationAddress: value => {
      dispatch(Newproperty_ext_actions.updateLocationAddress(value));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MapTest);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    top: '0%',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  searchContainer: {
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    position: 'absolute',
    width: '90%',
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    top: 40,
  },
  input: {
    borderColor: '#888',
    borderWidth: 1,
  },
});
