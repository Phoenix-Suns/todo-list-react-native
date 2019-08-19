import React, { Component } from 'react';
import { Text, View, Modal, StyleSheet } from "react-native";
import { AppCardSection } from "./AppCardSection";
import { CMButton } from "./CMButton";

const AppConfirm = ({ children, visible, onYes, onNo}) => {
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={visible}
            onRequestClose={()=>{}} >
            <View style={styles.container}>
                <AppCardSection style={styles.card_section}>
                    <Text style={styles.text}>
                        {children}
                    </Text>
                </AppCardSection>

                <AppCardSection>
                    <CMButton onClick={onYes}>Yes</CMButton>
                    <CMButton onClick={onNo}>No</CMButton>
                </AppCardSection>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    card_section: {
        justifyContent: 'center'
    },
    text: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    }
});

export {AppConfirm};