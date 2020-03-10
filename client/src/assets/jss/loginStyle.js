import {  makeStyles } from '@material-ui/core/styles'

const loginStyle = makeStyles(theme => ({
    loginForm : {
        borderRadius : '10px',
        backgroundColor: 'white',
        width:'300px',
        height:'300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    login : {
        border:  'none', 
        borderBottom:  'solid 1px rgba(0,0,0,.1)',
        margin: '5px 0 5px 0',
        '&:focus' : {
            borderBottom:  'solid 1px $primary',
            outline: '0',
            boxShadow: '0 2px 6px -8px rgba($primary, .45)',
        },
    },
    loginButton : {
        backgroundColor: 'black',
        width:  'auto',
        minWidth:  '100px',
        borderRadius:  '24px', 
        textAlign:  'center', 
        padding:  '15px 40px',
        marginTop:  '25px', 
        color:  '#fff', 
        fontSize:  '14px',
        marginLeft:  'auto', 
        fontWeight:  '500', 
        boxShadow:  '0px 2px 6px -1px rgba(0,0,0,.13)', 
        border:  'none',
        transition:  'all .3s ease', 
        outline: '0', 
    }

})
)

export default loginStyle