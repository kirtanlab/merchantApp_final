import AsyncStorage from "@react-native-async-storage/async-storage";
import { value } from "react-native-extended-stylesheet";
import * as newproperty_actions from "./newproperty_action";
let initialState = {
  looking_form: {
    pg: false,
    // mess: false,
    rent: true,
    Hostel: false,
  },
  who: {
    landowner: false,
    Broker: false,
    owner: true,
  },
  gender: {
    male: true,
    female: false,
    both: false,
  },
  amneties: {
    wifi: false,
    AC: false,
    hotwater: false,
    cooler: false,
  },
  about_pg: "",
  terms_pg: [],
  propertyName: "",
  property_updating: {
    updating: false,
    property_id: "",
  },
  //Location Form
  house_no: "",

  Landmark: "",
  Description_pg: "",
  checked_propertyName: false,
  checked_house_no: false,
  adharcard: "",
  checked_adhar_card: false,
  checked_Landmark: false,
  checked_Description_pg: false,
  focused_house_no: false,

  focused_propertyName: false,
  focused_Landmark: false,
  focused_Description_pg: false,
};

const newproperty_reducer = (state = initialState, action) => {
  switch (action.type) {
    case newproperty_actions.UDPATE_PROPERTYID:
      return {
        ...state,
        property_updating: action.value,
      };
    case newproperty_actions.UPDATE_ALL:
      return {
        ...state,
      };

    case newproperty_actions.UPDATE_ADHAR_CARD:
      return {
        ...state,
        adharcard: action.value,
      };
    case newproperty_actions.CHECKED_ADHAR_CARD:
      return {
        ...state,
        checked_adhar_card: action.value,
      };
    case newproperty_actions.UPDATE_LOCATION_ADDRESS:
      return {
        Location_address: action.value,
      };
    case newproperty_actions.UPDATE_ELE_BILL:
      return {
        elebill: action.value,
      };
    case newproperty_actions.CHECKED_ELE_BILL:
      return {
        ...state,
        checked_ele_bill: action.value,
      };
    //Property vaue   bijlikabil, adhar name,location, outer vid,img
    case newproperty_actions.UPDATE_PROPERTY_VALUE:
      console.log("called all set fun");
      // PG, FAMILYROOMS, HOSTEL;
      let typeof_pg = action.value.typeofpg;
      let obj = {};
      let gender_obj = {};
      if (typeof_pg == "HOSTEL") {
        obj = {
          pg: false,
          // mess: false,
          rent: false,
          Hostel: true,
        };
      } else if (typeof_pg == "FAMILYROOMS") {
        obj = {
          pg: false,
          // mess: false,
          rent: true,
          Hostel: false,
        };
      } else {
        obj = {
          pg: true,
          // mess: false,
          rent: false,
          Hostel: false,
        };
      }
      let male = action.value.isMale;
      let female = action.value.isFemale;
      gender_obj = {
        male: male || (!male && !female),
        female: female,
        both: male && female ? true : false,
      };
      let isAc = action.value.isAC;
      let isCooler = action.value.isCooler;
      let isWIFI = action.value.isWIFI;
      let HotWater = action.value.HotWater;
      let amneties = {
        wifi: isWIFI,
        AC: isAc,
        hotwater: HotWater,
        cooler: isCooler,
      };
      let house_no = action.value.address.split("//")[0];
      let Landmark = action.value.address.split("//")[1];
      console.log("Landmark", Landmark, house_no);
      return {
        ...state,
        gender: gender_obj,
        amneties: amneties,
        looking_form: obj,
        about_pg: action.value.About,
        terms_pg: action.value.Rules,
        // about_pg: action.value.about_pg,
        propertyName: action.value.propertytitle,
        house_no: house_no,
        Landmark: Landmark,
        // adharcard: action.value.adharcard,
        checked_propertyName: true,
        checked_house_no: true,
        checked_Landmark: true,

        // adharcard: action.value.adharcard,
      };

    //PropertName

    case newproperty_actions.UPDATE_PROPERTY_NAME:
      return {
        ...state,
        propertyName: action.value,
      };
    case newproperty_actions.CHECKED_PROPERTY_NAME:
      return {
        ...state,
        checked_propertyName: action.value,
      };
    case newproperty_actions.FOCUSED_PROPERTY_NAME:
      return {
        ...state,
        focused_propertyName: action.value,
      };
    //about_pg
    case newproperty_actions.SET_ABOUT_PG:
      return {
        ...state,
        about_pg: action.value,
      };
    //terms_pg
    case newproperty_actions.SET_TERMS_PG:
      return {
        ...state,
        terms_pg: action.value,
      };
    //amneties
    case newproperty_actions.SET_AMNETIES:
      return {
        ...state,
        amneties: action.value,
      };
    //gender
    case newproperty_actions.SET_GENDER:
      return {
        ...state,
        gender: action.value,
      };
    //Location Form
    case newproperty_actions.CHECKED_DESCRIPTION_PG:
      return {
        ...state,
        checked_Description_pg: action.value,
      };
    case newproperty_actions.CHECKED_HOUSE_NO:
      return {
        ...state,
        checked_house_no: action.value,
      };
    case newproperty_actions.CHECKED_LANDMARK:
      return {
        ...state,
        checked_Landmark: action.value,
      };

    case newproperty_actions.FOCUSED_DESCRIPTION_PG:
      return {
        ...state,
        focused_Description_pg: action.value,
      };
    case newproperty_actions.FOCUSED_HOUSE_NO:
      return {
        ...state,
        focused_house_no: action.value,
      };
    case newproperty_actions.FOCUSED_LANDMARK:
      return {
        ...state,
        focused_Landmark: action.value,
      };
    // case newproperty_actions.FOCUSED_LOCATION:
    //   return {
    //     ...state,
    //     focused_Location: action.value,
    //   };
    case newproperty_actions.UPDATE_DESCRIPTION_PG:
      return {
        ...state,
        Description_pg: action.value,
      };
    case newproperty_actions.UPDATE_HOUSE_NO:
      return {
        ...state,
        house_no: action.value,
      };
    case newproperty_actions.UPDATE_LANDMARK:
      return {
        ...state,
        Landmark: action.value,
      };

    case newproperty_actions.SET_LOOKING:
      console.log("called", action.looking_form);
      return {
        ...state,
        looking_form: action.looking_form,
      };
    case newproperty_actions.SET_WHOYOU:
      return {
        ...state,
        who: action.whoyou,
      };

    case newproperty_actions.SET_TEST:
      return {
        ...state,
        new_test: action.test,
      };
    default:
      return state;
  }
};
export default newproperty_reducer;
