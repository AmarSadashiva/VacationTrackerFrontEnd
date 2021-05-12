import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import Header from '../Components/Header';
import ButtonType from '../Components/Button';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { Badge } from 'react-native-elements'

/**
 * Home page which contains buttons to Apply for leave, work from home, review requests and logout
 * Contains profile icon to view profile
 * Contains details about leaves taken and leaves left 
 */

export default function HomePage({ navigation, route }) {

    //Hooks to store Leaves taken and leaves left  
    [leavesTaken, setLeavesTaken] = useState();
    [leavesLeft, setLeavesleft] = useState();
    [isManager, setIsManager] = useState();
    [associateName, setAssociateName] = useState();
    [isReviewsPresent, setIsReviewsPresent] = useState(false);
    /**
     * callback function passed as a parameter to leave page 
     * Used to increment leaves taken when submit button is clicked in leave page
     */
    const incrementLeaves = () => {
        setLeavesTaken(leavesTaken + 1);
    }

    const handleLogout = () => {
        Alert.alert('Alert',
            'Are you sure, you want to logout?',
            [
                { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                { text: 'OK', onPress: () => { navigation.navigate('Login') } },
            ],
            { cancelable: false })
    }

    const associateId = route.params.id.AssociateId;
    useEffect(() => {
        axios.get(`http://192.168.43.110:8088/api/VacationTracker/getVacationCount/${associateId}`)
            .then(res => {
                setLeavesTaken(res.data);
                setLeavesleft(15 - res.data);
            })
            .catch(err => {
                console.log(err.message);
            })

        axios.get(`http://192.168.43.110:8088/api/VacationTracker/getProfileData/${associateId}`)
            .then(res => {
                setIsManager(res.data.isManager);
                setAssociateName(res.data.associateName);
            })
            .catch(err => {
                console.log(err.message);
            })
        const id = setInterval(() => axios.get(`http://192.168.43.110:8088/api/VacationTracker/getVacationDetailsForReview/${associateId}`)
            .then(res => {
                if (res.data.length !== 0) {
                    setIsReviewsPresent(true);
                }
                else {
                    setIsReviewsPresent(false);
                }
            })
            .catch(err => {
                console.log(err.message);
            }), 5000);
        return () => clearInterval(id);
    }, []);


    // Contains Header, Associate Name, different buttons to navigate,leaves taken and leaves left 
    return (

        <View style={Styles.layout}>
            {/* Header and Profile icon */}
            <View style={{ flexDirection: 'row', }}>
                <View style={Styles.Header}>
                    <Header title="Vacation Tracker" />
                    <TouchableOpacity >
                        <View style={{ backgroundColor: 'yellowgreen' }}>
                            <AntDesign name="profile" size={49} color="white" onPress={() => navigation.navigate('Profile', { id: { associateId } })} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>


            {/* To display the associate name */}
            <View style={Styles.sublayout}>
                <View Style={Styles.details}>
                    <View>
                        <Text>Associate Name</Text>
                    </View>
                    <View>
                        <Text Style={Styles.input}>{associateName}</Text>
                    </View>
                </View>


                {/* Buttons to navigate to the screen mentioned in the navigation prop */}
                <View style={Styles.buttontype}>
                    <ButtonType name='Apply for Leave' onPress={() => navigation.navigate('Vacation', { id: { associateId }, callbackFunction: { incrementLeaves } })} />
                </View>
                <View style={Styles.buttontype}>
                    <ButtonType name='Apply for work from home' onPress={() => navigation.navigate('Vacation', { id: { associateId }, callbackFunction: { incrementLeaves }, workFromHome: true })} />
                </View>
                <View style={Styles.badging}>
                    <View style={{ flex: 11 }}>
                        {/* ternary statement to display review requests button only if the logged in associate is a manager */}
                        {isManager == true ? <ButtonType name='Review requests' onPress={() => navigation.navigate('ReviewRequests', { id: { associateId } })} /> : null}
                    </View>
                    {(isManager == true && isReviewsPresent == true) ? <View style={{ position: 'relative', top: 12, right: 1, flex: 1 }}>
                        <Badge style={Styles.badgeStyle} status='warning' />
                    </View> : null}
                </View>
                <View style={Styles.buttontype}>
                    <ButtonType name='Leave/Work From Home History' onPress={() => navigation.navigate('LeaveHistory', { id: { associateId }, allAssociateRequests: false })} />
                </View>
                <View style={Styles.buttontype}>
                    {/* ternary statement to display All associate history button only if the logged in associate is a manager */}
                    {isManager == true ? <ButtonType name='All Associate History' onPress={() => navigation.navigate('LeaveHistory', { id: { associateId }, allAssociateRequests: true })} /> : null}
                </View>
                <View style={Styles.buttontype}>
                    <ButtonType name='logout' onPress={handleLogout} />
                </View>


                {/* Details about leaves taken and leaves left */}
                <View style={Styles.leavelayout}>
                    <View >
                        <Text style={Styles.leaveLabel}>Leaves taken</Text>
                    </View>
                    <View>
                        <Text style={Styles.leaveValue}>{leavesTaken}</Text>
                    </View>
                </View>

                <View style={Styles.leavelayout}>
                    <View >
                        <Text style={Styles.leaveLabel}>Leaves Left</Text>
                    </View>

                    <View>
                        <Text style={Styles.leaveLeftValue}>{leavesLeft}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const Styles = StyleSheet.create(
    {
        layout: {
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'stretch',
        },
        sublayout: {
            flex: 12,
        },
        details: {
            flexDirection: "row",
            flex: 1,
        },
        Header: {
            flexDirection: 'row',
            width: '88%',
        },
        input: {
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 26,
        },
        leaveLabel: {
            fontSize: 30,
            fontWeight: 'bold',
            fontFamily: 'Roboto',
            marginLeft: 50,
            color: 'maroon',
            marginTop: 20,
            marginBottom: 10
        },
        leaveValue: {
            fontSize: 80,
            marginLeft: 115,
            color: 'red'
        },
        leaveLeftValue: {
            fontSize: 80,
            marginLeft: 115,
            color: 'green'
        },
        leavelayout: {
            flex: 1,
            borderColor: 'skyblue',
            borderWidth: 4,
            borderRadius: 60,
            width: '70%',
            marginLeft: 60,
            marginTop: 20,
            marginBottom: 10,
            justifyContent: 'center',
            backgroundColor: 'lightgray'
        },
        buttontype: {
            alignItems: 'stretch',
            width: '100%',
            borderColor: 'blue'
        },
        badging: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            backgroundColor: '#1e90ff',
            borderColor: 'blue'
        },
    }
);