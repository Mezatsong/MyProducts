import React, {Component} from 'react';
import {View} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import {colors} from '../style';


export default class UpdateItemAlert extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
    }

    updateValue(value) {
        if(value < 0)
            return;
        this.setState({value});
        this.props.onChange(value);
    }

    render() {
        const btnColor = this.state.value > 5 ? colors.green : (this.state.value > 0 ? colors.orange : colors.secondary)
        return (
            <View style={{ alignItems:"center", paddingVertical: 10 }}>
                <NumericInput 
                    value={this.state.value} 
                    onChange={value => this.updateValue(value)}
                    totalWidth={240} 
                    totalHeight={50} 
                    iconSize={25}
                    rounded 
                    textColor={btnColor}
                    iconStyle={{ color: 'white' }} 
                    rightButtonBackgroundColor={btnColor}
                    leftButtonBackgroundColor={btnColor} />
            </View>
        );
    }
}