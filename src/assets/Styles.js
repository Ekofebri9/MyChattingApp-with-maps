import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    button: {
        width: 300,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerMap: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerRegister : {
        backgroundColor:'#455a64',
        flex: 1,
        alignItems:'center',
        justifyContent :'center'
    },
    inputBox: {
        width: 300,
        backgroundColor: 'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 7,
    },
    itemMap: {
        flex: 1,
        width: 120,
        height: 120,
        backgroundColor: 'rgba(255,255,255, 0.3)',
        marginVertical: 5,
        marginHorizontal: 5
    },
    listMap: {
        top: '75%',
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        width: '100%',
        height: '25%',
        backgroundColor: 'rgba(255,255,255, 0.3)'
    },
    signupButton: {
        color:'#ffffff',
        fontSize:16,
        fontWeight:'500'
    },
    signupText: {
        color:'rgba(255,255,255,0.6)',
        fontSize:16
    },
    signupTextCont : {
        flexGrow: 1,
        alignItems:'flex-end',
        justifyContent :'center',
        paddingVertical:16,
        flexDirection:'row'
    },
    textStatusMap: {
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'white',
    }
});
export default styles;