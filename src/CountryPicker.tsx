import React, { Component } from 'react'; // eslint-disable-line import/no-extraneous-dependencies, no-use-before-define
import {
    Text, TouchableOpacity, View, Modal,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import Country from './country';
import styles from './styles';
import { ReactNativeCountryPickerProps, ReactNativeCountryPickerState } from './typings';

const PickerItem = Picker.Item;

export default class CountryPicker extends Component<ReactNativeCountryPickerProps, ReactNativeCountryPickerState> {
    private picker: any;

    constructor(props) {
        super(props);

        const { buttonColor = '#007AFF', selectedCountry = Country.getAll()[0] } = this.props;
        this.state = {
            buttonColor,
            modalVisible: false,
            selectedCountry,
        };
    }

    selectCountry(selectedCountry) {
        this.setState({
            selectedCountry,
        });
    }

    onPressCancel = () => {
        const { onPressCancel } = this.props;
        if (onPressCancel) {
            onPressCancel();
        }

        this.setState({
            modalVisible: false,
        });
    }

    onPressSubmit = () => {
        const { onPressConfirm, onSubmit } = this.props;
        if (onPressConfirm) {
            onPressConfirm();
        }

        if (onSubmit) {
            onSubmit(this.state.selectedCountry);
        }

        this.setState({
            modalVisible: false,
        });
    }

    onValueChange = (selectedCountry) => {
        this.setState({
            selectedCountry,
        });
    }

    show() {
        this.setState({
            modalVisible: true,
        });
    }

    // eslint-disable-next-line class-methods-use-this
    renderItem(country, index) {
        return (
            <PickerItem
                key={`${country.iso2}-${index}`} // Use the index as part of the key
                value={country.iso2}
                label={country.name}
            />
        );
    }

    render() {
        const {
            cancelText = 'Cancel',
            confirmText = 'Confirm',
            pickerBackgroundColor = 'white',
            cancelTextStyle = {},
            confirmTextStyle = {},
            itemStyle = {}
        } = this.props;

        const { buttonColor } = this.state;
        return (
            <Modal
                animationType="slide"
                transparent
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    // eslint-disable-next-line no-console
                    console.log('Country picker has been closed.');
                }}
            >
                <View style={styles.basicContainer}>
                    <View
                        style={[
                            styles.modalContainer,
                            { backgroundColor: pickerBackgroundColor },
                        ]}
                    >
                        <View style={styles.buttonView}>
                            <TouchableOpacity onPress={this.onPressCancel}>
                                <Text style={[{ color: buttonColor }, cancelTextStyle]}>
                                    {cancelText}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.onPressSubmit}>
                                <Text style={[{ color: buttonColor }, confirmTextStyle]}>
                                    {confirmText}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.mainBox}>
                            <Picker
                                ref={(ref) => {
                                    this.picker = ref;
                                }}
                                style={styles.bottomPicker}
                                selectedValue={this.state.selectedCountry}
                                onValueChange={(country) => this.onValueChange(country)}
                                itemStyle={itemStyle}
                                mode="dialog"
                            >
                                {Country.getAll().map((country, index) => this.renderItem(country, index))}
                            </Picker>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}
