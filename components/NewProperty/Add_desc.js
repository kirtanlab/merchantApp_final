import React, {useState, useCallback, useEffect} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  LogBox,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {COLORS, SIZES} from '../../constants/theme';
import InputField from '../InputField';
import {connect} from 'react-redux';
import * as newproperty_actions from '../../store/Newproperty/newproperty_action';

const Add_desc = ({terms_pg, setTerms_pg}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [terms_pg_copy, setTerms_pg_copy] = useState(terms_pg);
  const [term, setTerms] = useState();
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // fetchDishess();
    // setTimeout(() => {
    //   setRefreshing(false);
    // }, 2000);

    console.log('setRefreshing');
  }, []);
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  const render_modeal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
            <TextInput keyboardType="default" /> */}
            <View style={{padding: 20, display: 'flex', flexDirection: 'row'}}>
              <View
                style={{
                  left: 5,
                }}>
                <TouchableOpacity
                  onPress={async () => {
                    setModalVisible(false);
                  }}>
                  <Text
                    style={{
                      fontSize: SIZES.h2,
                      color: COLORS.mobile_theme_back,
                      fontWeight: 'bold',
                      textDecorationLine: 'underline',
                      //   alignContent: 'flex-start',
                    }}>
                    CANCEL
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  left: 165,
                }}>
                <TouchableOpacity
                  onPress={async () => {
                    terms_pg_copy.push({text: term});
                    setTerms_pg_copy(terms_pg_copy);
                    await setTerms_pg(terms_pg_copy);
                    setModalVisible(false);
                  }}>
                  <Text
                    style={{
                      fontSize: SIZES.h2,
                      color: COLORS.mobile_theme_back,
                      fontWeight: 'bold',
                      textDecorationLine: 'underline',
                      alignContent: 'flex-end',
                    }}>
                    DONE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* TextBox */}
            <View
              style={{
                marginBottom: 60,
                height: '100%',
                borderRadius: SIZES.form_button_borderRadius,
              }}>
              <InputField
                label={'Add Terms Here'}
                type={'Terms_pg'}
                keyboardType={'default'}
                value={term}
                onChange={e => {
                  setTerms(e.nativeEvent.text);
                  console.log('hey', e.nativeEvent.text);
                }}
                multiline
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const RenderBox = item => {
    console.log(item);
    return (
      //   <View>
      //     <Text>hello {item?.title}</Text>
      //   </View>
      // );

      <View
        style={{
          //   justifyContent: 'center',
          //   alignItems: 'center',
          marginTop: 3,
          //   paddingVertical: -2,
          // borderBottomColor: COLORS.lightGray4,
          // borderBottomWidth: 1,s
          // paddingBottom: 4,
          fontSize: 19,
          // paddingRight: 10,
          lineHeight: 23,
          //   flex: 2,
          // textAlignVertical: 'top',
          //   minHeight: 3s0,
          maxHeight: 100,
          width: SIZES.width * 0.82,
          //   borderRadius: SIZES.form_button_borderRadius,
          backgroundColor: COLORS.white,
          //   borderTopWidth: 0.5,
          borderWidth: 1,
          borderColor: COLORS.mobile_theme_back,
        }}>
        <TouchableOpacity
          style={{
            // borderColor: COLORS.mobile_theme_back,s
            // borderWidth: SIZES.form_button_borderWidth,
            marginTop: 0,
            // borderRadius: SIZES.form_button_borderRadius,
            //   minWidth: 24,
            //   maxWidth: SIZES.form_button_maxWidth,
            width: SIZES.width * 0.9,
            // minHeight: 20,
            maxHeight: SIZES.form_button_maxHeight,
            // padding: 2,
            //   padding: SIZES.form_button_padding,
            // alignItems: SIZES.form_button_alignItems,
            // justifyContent: SIZES.form_button_justifyContent,
            //   backgroundColor: true ? COLORS.mobile_theme_back : 'white',
            // flex: 2,
          }}
          onPress={async () => {
            setModalVisible(true);
            console.log('Pressed0');
          }}>
          <Text
            style={{
              fontSize: SIZES.custom1,
              fontWeight: SIZES.form_button_text_fontWeight,
              color: COLORS.black,
              left: 4,
            }}>
            {item.itemTitle.text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const headerComponent = () => (
    <View style={{height: 0}}>
      <Text style={{fontSize: 0}}></Text>
    </View>
  );
  const footerComponent = () => (
    <View style={{height: 0}}>
      <Text></Text>
    </View>
  );
  const emptyComponent = () => (
    <View style={{left: 150}}>
      <Text style={{fontSize: SIZES.custom1, fontWeight: 'bold'}}>Empty</Text>
    </View>
  );
  return (
    // <ScrollView style={{backgroundColor: 'white'}}>
    <View style={{marginTop: 30}}>
      <View style={{flexDirection: 'row'}}>
        {/* <View
            style={{
              marginTop: 20,
              paddingVertical: -2,
              // borderBottomColor: COLORS.lightGray4,
              // borderBottomWidth: 1,s
              // paddingBottom: 4,
              fontSize: 19,
              // paddingRight: 10,
              lineHeight: 23,
              flex: 2,
              // textAlignVertical: 'top',
              minHeight: 50,
              maxHeight: 100,
              width: SIZES.width * 0.88,
              borderRadius: SIZES.form_button_borderRadius,
              backgroundColor: COLORS.lightGray4,
              borderWidth: 2,
              borderColor: COLORS.mobile_theme_back,
            }}>
            <Text></Text>
          </View> */}
        <View style={{flex: 1}}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: SIZES.custom1,
              fontWeight: 'bold',
            }}>
            Terms
          </Text>
        </View>
        <View style={{flex: 0.35}}>
          <TouchableOpacity
            style={{
              borderColor: COLORS.mobile_theme_back,
              borderWidth: SIZES.form_button_borderWidth,
              borderRadius: SIZES.form_button_borderRadius,
              minWidth: 24,
              maxWidth: SIZES.form_button_maxWidth,
              width: 80,
              maxHeight: SIZES.form_button_maxHeight,
              paddingVertical: 4,
              padding: SIZES.form_button_padding,
              alignItems: SIZES.form_button_alignItems,
              justifyContent: SIZES.form_button_justifyContent,
              backgroundColor: true ? COLORS.mobile_theme_back : 'white',
              //   flex: 2,
            }}
            onPress={async () => {
              setModalVisible(true);
              console.log('Pressed0');
            }}>
            <Text
              style={{
                fontSize: SIZES.h3,
                fontWeight: SIZES.form_button_text_fontWeight,
                color: COLORS.font_color,
              }}>
              + ADD
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* List View */}
      <View
        style={{
          width: SIZES.width * 0.88,
          minHeight: 10,
          marginTop: 5,
          maxHeight: 200,
          borderColor: COLORS.lightGray4,
          borderWidth: 7,
          padding: 5,
        }}>
        <ScrollView
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }>
          style={{
            minHeight: 10,
            maxHeight: 200,
            // borderColor: COLORS.gray,
            // borderWidth: 1,
            // padding: 5,
            //   backgroundColor: true ? COLORS.mobile_theme_back : 'white',
          }}>
          <FlatList
            data={terms_pg_copy}
            renderItem={({item}) => (
              <RenderBox itemTitle={item} />
              // <Text>kirtan{item.title}</Text>
            )}
            ListHeaderComponent={headerComponent}
            ListFooterComponent={footerComponent}
            //   contentContainerStyle={{padding: 2}}
            ListEmptyComponent={emptyComponent}
            // keyExtractor={item => item.id}
            //   horizontal={true}
          />
        </ScrollView>
      </View>
      {render_modeal()}
    </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    // margin: 29,
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 35,
    width: '80%',
    height: '50%',
    // alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.mobile_theme_back,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

function mapStateToProps(state) {
  return {
    test: state.newproperty_reducer.new_test,

    terms_pg: state.newproperty_reducer.terms_pg,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTerms_pg: value => {
      dispatch(newproperty_actions.setTerms_pg(value));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Add_desc);
