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
  KeyboardAvoidingView,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ShowDialog from '../ShowDialog';
import {COLORS, SIZES} from '../../constants/theme';
import InputField from '../InputField';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as newproperty_actions from '../../store/Newproperty/newproperty_action';
import {Button, Dialog, Portal, Provider} from 'react-native-paper';
import {white} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const AddText = ({terms_pg, setTerms_pg, about_pg, setAbout_pg}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [terms_pg_copy, setTerms_pg_copy] = useState(terms_pg);
  const [term, setTerms] = useState();
  const [about, setAbout] = useState('');
  const [selected_term, setSelected_term] = useState('');
  const [selected_term_id, setSelected_term_id] = useState('');
  const [aboutpg, setaboutpg] = useState('sd');
  let [focused, setonfocused] = useState(false);
  const generateID = () => {
    return Math.random().toString(36).slice(2);
  };
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
      <Provider>
        <Portal>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View
                style={{
                  height: focused ? '25.4%' : '15.6%',
                  backgroundColor: 'white',
                  borderRadius: 20,
                  width: '80%',

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
                }}>
                {/* <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
            <TextInput keyboardType="default" /> */}
                <View
                  style={{padding: 20, display: 'flex', flexDirection: 'row'}}>
                  <View
                    style={{
                      left: 5,
                    }}>
                    <TouchableOpacity
                      onPress={async () => {
                        setModalVisible(false);
                        setTerms('');
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
                        if (term !== '') {
                          console.log('selected_term_id', selected_term_id);
                          const id = generateID();
                          terms_pg_copy.push({id: id, text: term});
                          console.log('terms_pg_copy', terms_pg_copy);
                          setTerms('');
                          setTerms_pg_copy(terms_pg_copy);
                          await setTerms_pg(terms_pg_copy);
                          setModalVisible(false);
                        } else {
                          setModalVisible(false);
                        }
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
                    marginBottom: 0,
                    height: '50%',
                    borderRadius: SIZES.form_button_borderRadius,
                  }}>
                  {/* <KeyboardAvoidingView>
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
                      onChange={async e => {
                        setTerms(e.nativeEvent.text);

                        console.log('hey', e.nativeEvent.text);
                      }}
                      multiline
                    />
                  </KeyboardAvoidingView> */}
                </View>
              </View>
            </View>
          </Modal>
        </Portal>
      </Provider>
    );
  };
  const RenderBox = item => {
    console.log('isthis', item);
    return (
      <ScrollView>
        <View
          style={{
            marginTop: 3,
            fontSize: 19,
            // paddingRight: 10,
            lineHeight: 23,
            maxHeight: 200,
            width: SIZES.width * 0.849,
            //   borderRadius: SIZES.form_button_borderRadius,
            backgroundColor: COLORS.white,
            //   borderTopWidth: 0.5,
            borderWidth: 1,
            borderColor: COLORS.mobile_theme_back,
            flexDirection: 'row',
          }}>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={true}>
            <TouchableOpacity
              style={{
                marginTop: 3,
                // padding: 2,
                width: SIZES.width * 0.7,

                maxHeight: 200,
              }}
              onPress={async () => {
                console.log('temselected');
                // setSelected_term(item.itemTitle.text);
                // setSelected_term_id(item.itemTitle.id);
                // setModalVisible(true);
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
              {/* <Ionicons
              name="trash"
              size={20}
              color={COLORS.mobile_theme_back}
              style={{marginTop: 18}}
            /> */}
            </TouchableOpacity>
          </ScrollView>
          <View style={{flex: 0.1}}>
            <TouchableOpacity
              onPress={async () => {
                //  let obj = terms_pg_copy.find(
                //   o => o.id === item.id,
                // );
                // obj.text = term;
                console.log('clicked', item.itemTitle.id);
                let copy_temp = terms_pg_copy;
                copy_temp = copy_temp.filter(
                  obj => obj.id !== item.itemTitle.id,
                );

                await setTerms_pg(copy_temp);
                // setTerms_pg_copy(copy_temp);
                console.log('terms_pg_copy', copy_temp);
                setTerms_pg_copy(copy_temp);
              }}>
              <Ionicons
                name="trash-outline"
                size={25}
                color={COLORS.mobile_theme_back}
                style={{}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  };

  const headerComponent = () => (
    <View style={{height: 0}}>
      <Text style={{fontSize: 0}} />
    </View>
  );
  const footerComponent = () => (
    <View style={{height: 0}}>
      <Text />
    </View>
  );
  const emptyComponent = () => (
    <View style={{left: 150}}>
      <Text style={{fontSize: SIZES.custom1, fontWeight: 'bold'}}>Empty</Text>
    </View>
  );

  return (
    // <ScrollView style={{backgroundColor: 'white'}}>

    <ScrollView keyboardShouldPersistTaps="handled" style={{marginTop: 30}}>
      {/* <Portal> */}
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, marginTop: 8}}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: SIZES.h2,
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
              //   marginBottom: 2,
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
              setSelected_term('');
              // setModalVisible(true);
              setVisible(true);
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
          marginTop: 10,
          maxHeight: 200,
          borderColor: COLORS.lightGray4,
          borderWidth: 1,
          padding: 5,
        }}>
        <ScrollView
          style={{
            minHeight: 10,
            maxHeight: 200,
          }}>
          <FlatList
            data={terms_pg_copy}
            renderItem={({item}) => <RenderBox itemTitle={item} />}
            ListHeaderComponent={headerComponent}
            ListFooterComponent={footerComponent}
            ListEmptyComponent={emptyComponent}
          />
        </ScrollView>
      </View>
      {/* {render_modeal()} */}
      {/* <View>
          
        </View> */}
      {/* Add ABout */}

      <ShowDialog
        visible={visible}
        onChange={async e => {
          setTerms(e.nativeEvent.text);
          console.log('hey', e.nativeEvent.text);
        }}
        setonfocused={setonfocused}
        term={term}
        _showDialog={() => setVisible(true)}
        _hideDialog={async () => {
          if (term !== '') {
            console.log('selected_term_id', selected_term_id);
            const id = generateID();
            terms_pg_copy.push({id: id, text: term});
            console.log('terms_pg_copy', terms_pg_copy);
            setTerms('');
            setTerms_pg_copy(terms_pg_copy);
            await setTerms_pg(terms_pg_copy);
            setVisible(false);
          } else {
            setVisible(false);
          }
        }}
      />

      <View style={{marginTop: 30}}>
        <View style={{marginTop: 0}}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: SIZES.h2,
              fontWeight: 'bold',
            }}>
            About PG
          </Text>
        </View>
        <ScrollView keyboardShouldPersistTaps="handled" style={{marginTop: 15}}>
          <InputField
            label={'Add More About PG Here'}
            type={'About_pg'}
            keyboardType={'default'}
            // value={aboutpg}
            defaultValue={aboutpg}
            onChange={e => {
              setAbout_pg(e.nativeEvent.text);
              console.log('hey', e.nativeEvent.text);
            }}
            multiline
          />
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    about_pg: state.newproperty_reducer.about_pg,
    terms_pg: state.newproperty_reducer.terms_pg,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTerms_pg: value => {
      dispatch(newproperty_actions.setTerms_pg(value));
    },
    setAbout_pg: value => {
      dispatch(newproperty_actions.setAbout_pg(value));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddText);
