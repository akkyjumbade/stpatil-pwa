import { session } from "../helpers";

export default async function FacebookSignin() {
   const tokenFromSession = await session.load({
      key: 'facebookAuthToken'
   })
   // if(tokenFromSession) {
   //    loginFacebook(tokenFromSession)
   //    return
   // }
   try {
      const {
         type,
         token,
         expires,
         permissions,
         declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('694032301048739', {
         permissions: [
            'public_profile',
            'email',
            'name',
            'first_name',
            'last_name',
         ],
      });
      if (type === 'success') {

      } else {
         // type === 'cancel'
      }
   } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
   }
}
