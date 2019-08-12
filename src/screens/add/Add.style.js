import {StyleSheet} from 'react-native';
import { colors } from '../../style';

export default styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 10,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    imageBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        marginRight: 10,
        flex: 2,
        borderWidth: 1,
        borderColor: "#BBCCBB",
        alignContent: "center"
    },
    takeImageContainer: {
        flex: 1,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center',
    },
    button: {
        height: 36,
        backgroundColor: colors.green,
        borderColor: colors.green,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});
