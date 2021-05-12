import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, flex } from 'react-native';
import ButtonType from '../Components/Button';
import { Alert } from 'react-native';
import axios from 'axios';

/** 
 *page where associate enters his login credentials 
*/
export default function Login({ navigation }) {

    // Hooks to store Associate ID and Password
    [AssociateId, setAssociateId] = useState();
    [Password, setPassword] = useState();

    // AssociateID and password handlers 
    handleAssociateId = (value) => {
        setAssociateId(value);
    }

    handlePassword = (value) => {
        setPassword(value);
    }

    const handleLogin = (userEnteredId, userEnteredPassword) => {
        axios.get(`http://192.168.43.110:8088/api/VacationTracker/getProfileData/${userEnteredId}`)
            .then(res => {
                if (res.data == null) {
                    Alert.alert(
                        'Incorrect AssociateID. Please enter proper credentials',
                    )
                }
                else if (res.data.associateID !== userEnteredId) {
                    Alert.alert(
                        'Incorrect AssociateID. Please enter proper credentials',
                    )
                }
                else if (res.data.password !== userEnteredPassword) {
                    Alert.alert(
                        'Incorrect password. Please enter proper credentials',
                    )
                }
                else {
                    navigation.navigate('Home', { id: { AssociateId } });
                    setPassword(null);
                }
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    return (
        <View style={Styles.main}>
            {/* View to hold the logo */}
            <View style={Styles.logo}>
                <Image
                    source={require('../Images/OfficialLogo.png')}
                    style={{ width: 300, height: 80, marginLeft: 0 }}
                />
            </View>

            {/* View to read Associate Id and password */}
            <View style={StyleSheet.Input}>
                <View style={Styles.inputLayout}>
                    <TextInput style={Styles.input}
                        placeholder='Enter Associate ID'
                        type='email'
                        value={AssociateId}
                        onChangeText={handleAssociateId}
                    ></TextInput>
                    <TextInput style={Styles.input}
                        placeholder='Enter Password'
                        secureTextEntry
                        onChangeText={handlePassword}
                        value={Password}></TextInput>
                </View>
            </View>

            {/**
             * View to hold Login button
             * passing AssociateId as a parameter to 'Home' component
             */}
            <View style={Styles.loginButton}>
                <ButtonType name='Login' onPress={() => handleLogin(AssociateId, Password)} />
            </View>
        </View>

    );
}

const Styles = StyleSheet.create(
    {
        main: {
            flex: 1,
            padding: 30,
            width: '100%',
            height: '100%',
            backgroundColor: 'white'
        },
        inputLayout: {
            marginLeft: 12
        },
        logo: {
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: '30%',
        },
        Input: {
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            marginLeft: 10
        },
        loginButton: {
            marginTop: 10,
            marginLeft: 95,
            width: '50%'
        },
        input: {
            height: 40,
            width: '90%',
            borderRadius: 20,
            borderColor: 'black',
            borderWidth: 2,
            padding: 10,
            margin: 10
        }
    }
);