import {
    bgDrawerHeader,
    drawerInactiveItemColor,
    bgDrawerInactiveItem,
    drawerHeaderColor,
    colors
} from '../style'


export default {
    header: {
        flexDirection: "column",
        paddingTop: 40, // 24dp (Space for the translucent StatusBar) plus 16dp Android Header paddingTop
        paddingLeft: 16,
        marginBottom: 10,
        height: 170,
        backgroundColor: bgDrawerHeader
    },
    headerLogo: {
        width: 76,
        height: 76,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 38,
        overflow: "hidden",
        backgroundColor: "#fff"
    },
    subTitle: {
        height: 56,
        paddingTop: 8,
    },
    drawerTitle: {
        color: drawerHeaderColor,
        fontFamily: "Roboto",
        fontWeight: "600",
        fontSize: 14,
        color: colors.white,
    },
    drawerEmail: {
        color: drawerHeaderColor,
        fontFamily: "Roboto",
        fontWeight: "400",
        fontSize: 14,
        color: colors.white,
    },
    drawerItem: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: bgDrawerInactiveItem,
        color: drawerInactiveItemColor,
        height: 50,
        paddingLeft: 16,
        borderBottomWidth: 2,
        borderBottomColor: "#fff"
    },
    drawerItemLogo: {
        paddingRight: 16
    }
};