import React from 'react';
import useStyles from 'assets/jss/loginStyle';
import backgroundImage from 'assets/img/background1.jpg'

const Background = ({children}) => {
    return(
        <div style={{
            width: 'auto',
            height: '100%',
            backgroundposition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {children}
        </div>
    )
}

export default function Login() {
    const classes = useStyles();
    const [name, setName] = React.useState(null);
    const [password, setPassword] = React.useState(null)

    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleSubmit = (event) => {
        alert('A name was submitted: ' + name);
        event.preventDefault();
    }

    return(
    <Background>
        <div className={classes.loginForm}>
            <form onSubmit={handleSubmit}>
            <p style={{color:'black',marginTop:'0px'}}>HYDROPONICS</p>
                <input className={classes.login} placeholder="Name"  type="text" value={name} onChange={handleNameChange} />
                <input className={classes.login} placeholder="Password" type="password" value={password} onChange={handlePasswordChange} />
                <div>
                    <button className={classes.loginButton} type="submit">Log in</button>
                </div>
            </form>
        </div>
    </Background>
    )
    
}