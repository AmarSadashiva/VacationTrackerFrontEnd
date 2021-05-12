import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';


import Login from './Pages/Login';
import HomePage from './Pages/HomePage';
import LeavePage from './Pages/LeavePage';
import Requestspage from './Pages/RequestsPage';
import Profile from './Pages/Profile';
import LeaveHistory from './Pages/LeaveHistory';


export default function App() {

  const Stack = createStackNavigator();
  
/* To navigate between different screens */
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Profile" component={Profile} />
         <Stack.Screen name="Vacation" component={LeavePage} />
        <Stack.Screen name="ReviewRequests" component={Requestspage} />   
        <Stack.Screen name="LeaveHistory" component={LeaveHistory}/>
      </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create();
