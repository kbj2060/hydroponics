import React from 'react';

export default function Background (props) {
    const {children, image } = props;

    return(
        <div style={{
            width: 'auto',
            height: '100%',
            backgroundposition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundImage: `url(${image})`,
            backgroundPosition: 'center center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {children}
        </div>
    )
}