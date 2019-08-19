import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';
import DeviceInfo from '../DeviceInfo';

const ROW_PADDING = 20 * DeviceInfo.displayScale;

class AppModalMenu extends Component {
    state = { visible: false }

    show() { this.setState({visible: true})}
    hide() { this.setState({visible: false})}

    render() {
        const { children, title } = this.props;

        return (
            <Modal
                { ...this.props }
                backdropColor={'green'}
                backdropOpacity= {1}
                animationType='fade'
                transparent={true}
                visible={this.state.visible} 
                onRequestClose={() => null} //Disable Warning
            >
                <TouchableWithoutFeedback style={MenuStyles.container_background} onPress={()=>this.hide()}>
                    <View
                        style={MenuStyles.background} 
                        onPress={()=>this.hide()}>
                    </View>
                </TouchableWithoutFeedback>

                <View style={MenuStyles.container} >
                    <Text style={[MenuStyles.title]}>
                        {title}
                    </Text>
                    <ScrollView style={MenuStyles.container_item}>
                        <View style={{paddingVertical: ROW_PADDING / 2}}>
                            {children}
                        </View>
                    </ScrollView>
                    <TouchableOpacity onPress={()=>this.hide()}>
                        <Text style={[MenuStyles.cancel]}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
}

const MenuStyles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0, 0.5)',
    },
    container_background: {
        
    },
    container: {
        maxHeight: '50%',
        backgroundColor: '#fff',
    },
    container_item: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.25)',
        paddingTop: 0,
        paddingBottom: 0,
    },
    title: {
        color: 'rgb(166,166,166)',
        paddingVertical: ROW_PADDING / 1.5,
        paddingHorizontal: ROW_PADDING,
    },
    cancel: {
        color: '#000',
        paddingVertical: ROW_PADDING / 1.5,
        paddingHorizontal: ROW_PADDING,
    },
    child_row: {
        flex: 1,
        paddingVertical: ROW_PADDING / 2,
        paddingHorizontal: ROW_PADDING,
    }
});

export {AppModalMenu, MenuStyles};