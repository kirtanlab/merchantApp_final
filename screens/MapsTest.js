import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  PermissionsAndroid,
} from "react-native";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

import * as newproperty_actions from "../store/Newproperty/newproperty_action";
import * as Newproperty_ext_actions from "../store/Newproperty_ext/Newproperty_ext_actions";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { REACT_APP_MAPS_API_KEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Geolocation from "@react-native-community/geolocation";
import { Searchbar } from "react-native-paper";
import { COLORS, SIZES } from "../constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import NAVHeader_BLOB from "../components/NavHeader_BLOB";
import NavHeader_Maps from "../components/NavHeader_Maps";
import { connect } from "react-redux";
import * as Location_actions from "../store/Location/Location_actions";

const MapTest = ({
  updateLocationAddress,
  checked_location,
  update_location,
  navigation,
  Location,
}) => {
  const [granted, setgranted] = React.useState("");
  const [origin, setOrigin] = React.useState({
    latitude: Number(Location.latitude.$numberDecimal),
    longitude: Number(Location.longitude.$numberDecimal),
  });
  console.log("grantedVal", granted);
  function locationservice() {
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message:
        "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/>",
      ok: "YES",
      cancel: "NO",
      enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
      showDialog: true, // false => Opens the Location access page directly
      openLocationServices: true, // false => Directly catch method is called if location services are turned off
      preventOutSideTouch: true, // true => To prevent the location services window from closing when it is clicked outside
      preventBackClick: true, // true => To prevent the location services popup from closing when it is clicked back button
      providerListener: false, // true ==> Trigger locationProviderStatusChange listener when the location state changes
    })
      .then(function (success) {
        console.log(success); // success => {alreadyEnabled: false, enabled: true, status: "enabled"}
      })
      .catch((error) => {
        console.log(error.message); // error.message => "disabled"
        // setgranted("dinied");
      });
  }
  const checkPermission = async () => {
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === "ios") {
      //  downloadVideo();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission Required",
            message:
              "App needs access to your Location to fetch current location",
          }
        );
        const granted_ciors = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          {
            title: "Location Permission Required",
            message:
              "App needs access to your Location to fetch current location",
          }
        );
        if (
          granted === PermissionsAndroid.RESULTS.GRANTED &&
          granted_ciors === PermissionsAndroid.RESULTS.GRANTED
        ) {
          // Once user grant the permission start downloading
          console.log(" Permission Granted.");
          setgranted("granted");
          locationservice();
          //  downloadVideo();
        } else {
          // If permission denied then show alert
          alert("Location Permission Required");
        }
      } catch (err) {
        // To handle permission related exception
        console.warn("god", err);
      }
    }
  };

  const [value, setValue] = React.useState(null);
  const [location, setLoaction] = React.useState({});
  const [current, setCurrent] = React.useState({});
  const [dyn_positions, setDynPositions] = React.useState("");
  const mapRef = React.useRef(null);
  function getAddressFromCoordinates({ latitude, longitude }) {
    return new Promise((resolve, reject) => {
      fetch(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          latitude +
          "," +
          longitude +
          "&key=" +
          REACT_APP_MAPS_API_KEY
      )
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === "OK") {
            resolve(responseJson?.results?.[0]?.formatted_address);
            let address = responseJson?.results?.[0]?.formatted_address;
            // setLocationAddress(address);
            updateLocationAddress(address);
          } else {
            reject("not found");
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  navigator.geolocation = require("@react-native-community/geolocation");

  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };
  const onPlaceSelected = (details) => {
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    moveTo(position);
    setOrigin(position);
  };
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const INTIAL_POSITION = {
    latitude: Number(Location.latitude.$numberDecimal),
    longitude: Number(Location.longitude.$numberDecimal),
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  console.log("INTIAL_POSITION", INTIAL_POSITION);
  function region() {
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.02;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const INTIAL_POSITION = {
      latitude: Number(Location.latitude.$numberDecimal),
      longitude: Number(Location.longitude.$numberDecimal),
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    // console.log(typeof INTIAL_POSITION);
    return INTIAL_POSITION;
  }
  const google_ref = React.useRef();

  const onChangeSearch = (e) => {
    console.log("onChangeSearch", e.nativeEvent.text);
    setValue(e.nativeEvent.text);
  };
  //   setInitialCordinates({latitude: INTIAL_POSITION.latitude,longitude : INTIAL_POSITION.longitude})
  React.useEffect(() => {
    checkPermission();
  }, []);
  return (
    <KeyboardAvoidingView>
      <ScrollView keyboardShouldPersistTaps="handled">
        {/* Header */}

        {/* <HeaderBar title="Change Profile" /> */}
        {/* <Nav_Header /> */}
        <StatusBar
          animated={true}
          backgroundColor={COLORS.mobile_theme_back}
          barStyle={"light-content"}
        />
        <NavHeader_Maps
          screen_name={"Select Location"}
          onPress_back={() => {
            // navigation.navigate('Newproperty', {
            //   screen: 'Location',
            // });
          }}
          onPress_forward={async () => {
            console.log("location", location);
            if (location) {
              checked_location(true);
              //
              // console.log("Location", location);
              await getAddressFromCoordinates({
                latitude: location.latitude,
                longitude: location.longitude,
              });
              let latitude = { $numberDecimal: location.latitude };
              let longitude = { $numberDecimal: location.longitude };

              await update_location({ latitude, longitude });
            } else {
              checked_location(true);
              update_location(origin);
              // console.log("origin", origin);
              await getAddressFromCoordinates({
                latitude: origin.latitude,
                longitude: origin.longitude,
              });
            }
            navigation.navigate("Newproperty", {
              screen: "Location",
            });
          }}
        />

        <View style={styles.container}>
          <Ionicons
            name="location"
            size={50}
            style={{
              zIndex: 3,
              position: "absolute",
              marginTop: -37,
              marginLeft: -11,
              left: "50%",
              top: "50%",
              color: COLORS.mobile_theme_back,
            }}
          />
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={INTIAL_POSITION}
            region={region()}
            onRegionChangeComplete={(e) => {
              console.log("region changed", e);
              const dyn_position = {
                latitude: e.latitude,
                longitude: e.longitude,
              };
              setLoaction(e);
              // moveTo(dyn_position);
              // setOrigin(dyn_position);
            }}
            ref={mapRef}
          ></MapView>
          <View style={styles.searchContainer}>
            <View style={{ flex: 8 }}>
              <GooglePlacesAutocomplete
                placeholder="Search .."
                minLength={2}
                keepResultsAfterBlur={false}
                listViewDisplayed={false}
                returnKeyType={"search"}
                enablePoweredByContainer={false}
                renderDescription={(row) => row.description}
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
                    // fontWeight: "bold",
                  },
                  textInput: {
                    // fontWeight: "bold",
                    fontSize: 15,
                  },

                  row: {
                    // display: 'none',
                    backgroundColor: "#FFFFFF",
                    padding: 13,
                    height: 44,
                    flexDirection: "row",
                    fontSize: 15,
                    // fontSize: 20,
                  },

                  predefinedPlacesDescription: {
                    color: "#1faadb",
                  },
                }}
                onPress={(data, details = null) => {
                  onPlaceSelected(details);
                }}
                query={{
                  key: REACT_APP_MAPS_API_KEY,
                  language: "en",
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                console.log("clicked");
                setValue(null);
                google_ref.current.blur();
              }}
            >
              <Ionicons
                name="close-circle-outline"
                size={33}
                style={{ left: -5, color: COLORS.mobile_theme_back, top: 5 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        {granted == "granted" && (
          <TouchableOpacity
            onPress={async () => {
              locationservice();
              if (Platform.OS == "android") {
                const permissionAndroid = await PermissionsAndroid.check(
                  "android.permission.ACCESS_FINE_LOCATION"
                );
                if (permissionAndroid != PermissionsAndroid.RESULTS.granted) {
                  const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                      title: "Location Permission Required",
                      message:
                        "App needs access to your Location to fetch current location",
                    }
                  );
                  console.log(granted);
                  setgranted(granted);
                  if (granted == "granted") {
                    Geolocation.getCurrentPosition((info) => {
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
                    });
                  }
                }
              } else {
                Geolocation.getCurrentPosition((info) => {
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
                });
              }

              // console.log(
              //   typeof info.coords.latitude,
              //   typeof info.coords.longitude,
              // );
            }}
            style={{
              position: "absolute",
              top: "80%",
              left: "34%",
              paddingHorizontal: 7,
              paddingVertical: 5,
              width: 140,
              // maxWidth: 200,
              // paddingHorizontal: 12,
              justifyContent: "space-between",
              backgroundColor: COLORS.mobile_theme_back,
              // justifyContent: 'center',
              alignItems: "center",
              //   padding: 10,
              borderRadius: 10,
              flexDirection: "row",
            }}
          >
            <Ionicons
              name="compass-outline"
              size={25}
              style={{ color: COLORS.white, top: 2 }}
            />
            <Text
              style={{
                fontSize: SIZES.form_button_text_fontSize,
                color: COLORS.white,
                fontWeight: "bold",

                // marginHorizontal: 3,
              }}
            >
              current location
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

function mapStateToProps(state) {
  return {
    checked_Location: state.Location_reducer.checked_Location,
    Location: state.Location_reducer.Location,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    update_location: (value) => {
      dispatch(Location_actions.update_location(value));
    },
    checked_location: (value) => {
      dispatch(Location_actions.checked_location(value));
    },
    updateLocationAddress: (value) => {
      dispatch(Newproperty_ext_actions.updateLocationAddress(value));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MapTest);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    top: "0%",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchContainer: {
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 0,
    borderRadius: 8,
    position: "absolute",
    width: "90%",
    flexDirection: "row",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    top: 40,
  },
  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
});
