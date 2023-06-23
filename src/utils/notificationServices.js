import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {showError} from './helperFunctions';
// import {PermissionsAndroid} from 'react-native';
 

export async function requestUserPermission() {
  // await  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('<==OLD TOKEN==>', fcmToken);
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      console.log('<==NEW GENERATED TOKEN==>', fcmToken);
      await AsyncStorage.setItem('fcmToken', fcmToken);
    } catch (error) {
      console.log('<==ERROR IN fcmTOKEN==>', error);
      showError(error.message);
    }
  }
};

export const notificationListener = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging().onMessage(async remoteMessage=>{
    console.log("Notification received in forground",remoteMessage);
  })

  messaging()
  .getInitialNotification()
  .then(remoteMessage => {
    if (remoteMessage) {
      console.log(
        'Notification caused app to open from quit state:',
        remoteMessage.notification,
      );
    }
  });
};
