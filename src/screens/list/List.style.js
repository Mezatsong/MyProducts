import { Dimensions } from 'react-native';
import { colors } from '../../style';

export const styles = {
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    tabsContainer: {
        alignSelf: 'stretch',
        marginTop: 30,
    },
    itemOneContainer: {
        flex: 1,
        width: Dimensions.get('window').width / 2 - 40,
    },
    itemOneImageContainer: {
        borderRadius: 3,
        overflow: 'hidden',
    },
    itemOneImage: {
        height: 200,
        width: Dimensions.get('window').width / 2 - 40,
    },
    itemOneTitle: {
        fontSize: 15,
    },
    itemOneSubTitle: {
        fontSize: 13,
        color: '#B2B2B2',
        marginVertical: 3,
    },
    itemOnePrice: {
        fontSize: 15,
    },
    itemOneRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    itemOneContent: {
        marginTop: 5,
        marginBottom: 10,
    },
    itemTwoContainer: {
        paddingBottom: 10,
        backgroundColor: 'white',
        marginVertical: 5,
    },
    itemTwoContent: {
        padding: 20,
        position: 'relative',
        marginHorizontal: Platform.OS === 'ios' ? -15 : 0,
        height: 150,
    },
    itemTwoTitle: {
        color: colors.white,
        fontSize: 20,
    },
    itemTwoSubTitle: {
        color: colors.white,
        fontSize: 15,
        marginVertical: 5,
    },
    itemTwoPrice: {
        color: colors.white,
        fontSize: 20,
    },
    itemTwoImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    itemTwoOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '#6271da',
        opacity: 0.5,
    },
    itemThreeContainer: {
        backgroundColor: 'white',
    },
    itemThreeSubContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    itemThreeImage: {
        height: 100,
        width: 100,
    },
    itemThreeContent: {
        flex: 1,
        paddingLeft: 15,
        justifyContent: 'space-between',
    },
    itemThreeBrand: {
        fontSize: 14,
        color: '#617ae1',
    },
    itemThreeTitle: {
        fontSize: 16,
        color: '#5F5F5F',
    },
    itemThreeSubtitle: {
        fontSize: 12,
        color: '#a4a4a4',
    },
    itemThreeMetaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemThreePrice: {
        fontSize: 15,
        color: '#5f5f5f',
        textAlign: 'right',
    },
    itemThreeHr: {
        flex: 1,
        height: 1,
        backgroundColor: '#e3e3e3',
        marginRight: -15,
    },
    badge: {
        backgroundColor: colors.secondary,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    emptyListContainer: {
        justifyContent: 'center',
        flex: 1,
        marginVertical: '40%',
    },
    emptyListText: {
        textAlign: 'center',
        fontSize: 20
    }
};