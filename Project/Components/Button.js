import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

/**
 * Button component which is imported in all other screens where buttons are used.
 */
export default function ButtonType(props) {
    return (
        <Button title={props.name} color='#1e90ff' onPress={props.onPress} />
    );
}
