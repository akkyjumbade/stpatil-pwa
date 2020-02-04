import { INFO_COLOR, SUCCESS_COLOR, DANGER_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from "./config/colors";

export const colors = {
   primary: PRIMARY_COLOR,
   secondary: SECONDARY_COLOR,
   danger: DANGER_COLOR,
   info: INFO_COLOR,
   success: SUCCESS_COLOR,
   grey: '#45454d',
}

export const fontFace = 'Karla-Regular';
const style = {
   Text: {
      fontFamily: fontFace,
      letterSpacing: 0,
      style: {
         fontFamily: fontFace,
         color: '#696773',
         letterSpacing: 0,
      },
      h1Style: {
         fontFamily: 'Karla-Bold',
      },
      h2Style: {
         fontFamily: 'Karla-Bold',
      },
      h3Style: {
         fontFamily: 'Karla-Bold',
      },
      h4Style: {
         fontFamily: fontFace,
         fontSize: 18,
         fontWeight: 'normal'
      },
      h5Style: {
         fontFamily: fontFace,
         fontSize: 16,
         fontWeight: 'normal'
      },
   },
   Card: {
      titleStyle: {
         fontFamily: fontFace,
         fontWeight: 'normal',
         fontSize: 18,
      }
   },
   Button: {
      rounded: true,
      borderRadius: 6,
      buttonStyle: {
         borderRadius: 6,
         marginTop: 5,
         marginBottom: 5,
         paddingVertical: 12,
      },
      titleStyle: {
         fontFamily: fontFace,
         fontSize: 18,
      }
   },
   SocialIcon: {
      style: {
         fontSize: 18,
      }
   },
   Overlay: {
      // windowBackgroundColor: '#000',
      containerStyle: {
         backgroundColor: 'transparent',
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center',
         // flexDirection: 'row',
         padding: 10,
      }
   },
   Input: {
      marginBottom: 0,
      selectionColor: colors.grey,
      containerStyle: {
         paddingLeft: 0,
         paddingRight: 0,
         marginBottom: 10,
      },
      inputStyle: {
         fontFamily: fontFace,
         fontSize: 18,
         marginBottom: 0,
         marginTop: 0,
         color: colors.grey
      },
      labelStyle: {
         marginBottom: 0,
         fontSize: 14,
         fontWeight: 'normal',
         fontFamily: 'Karla-Regular',
      },
      errorStyle: {
         marginBottom: 0,
         fontFamily: fontFace,
      },
   },
   ListItem: {
      containerStyle: {

      }
   },
   Checkbox: {
      containerStyle: {
         backgroundColor: 'transparent',
         border: 0,
      },
      textStyle: {
         marginBottom: 0,
         fontSize: 14,
         fontWeight: 'normal',
         fontFamily: 'Karla-Regular',
      },
      fontFamily: 'Karla-Regular',
      fontSize: 14,
      fontWeight: 'normal',
   }
}

export default style;
