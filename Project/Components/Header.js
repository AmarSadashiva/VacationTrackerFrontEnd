import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';



/**
 * Header component which is imported in every screen
 */
const Header = props => {
    return(
        <View style ={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 50,
        paddingTop: 1,
        backgroundColor: 'yellowgreen',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        color: 'black',
        fontSize: 18
    }
});

export default Header;