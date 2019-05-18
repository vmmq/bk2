import React, {Component} from 'react';
import { PushNotificationIOS,Alert,AsyncStorage} from 'react-native';
import PushNotification from 'react-native-push-notification';


export default class PushController extends Component {
    
    
    constructor(){
        super();
        let thisObj = this;
    }



    componentDidMount(){
        PushNotification.configure({
            onRegister: function(token) {
                console.log( 'TOKEN:', token );
                AsyncStorage.setItem('push_token', token.token);
                AsyncStorage.setItem('push_os', token.os);
            },

           // (required) Called when a remote or local notification is opened or received
            onNotification: function(notification) {
                console.log( 'NOTIFICATION:', notification );
                // process the notification
                Alert.alert(notification.message);
                // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },



        });
    }
    render(){
        return null;
    }
}