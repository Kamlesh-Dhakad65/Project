export const styles: { [key: string]: React.CSSProperties } = {
    chatWithMeButton: {
        cursor: 'pointer',
        boxShadow: '0px 0px 16px 6px rgba(0, 0, 0, 0.33)',
        borderRadius: '50%',
        backgroundImage: `url(https://cdn.elextensions.com/wp-content/uploads/2022/04/istockphoto-1291353608-170667a.jpg)`, 
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '84px',
        width: '60px',
        height: '60px',
    },
    avatarHello: { 
        position: 'absolute', 
        left: 'calc(-100% - 44px - 28px)', 
        top: 'calc(50% - 24px)', 
        zIndex: 10000,
        boxShadow: '0px 0px 16px 6px rgba(0, 0, 0, 0.33)',
        padding: '6px 6px 6px 10px',
        borderRadius: '24px', 
        backgroundColor: '#f9f0ff',
        color: 'black',
    },
    supportWindow: {
        position: 'fixed',
        bottom: '50px', // Adjusted bottom position
        right: '50px', // Adjusted right position
        width: '320px', // Reduced width
        height: '400px', // Reduced height
        background: 'white', 
        opacity: '1',
        transition: 'opacity 0.5s ease',
        borderRadius: '12px',
        border: `2px solid white`,
        overflow: 'hidden',
        boxShadow: '0px 0px 16px 6px rgba(0, 0, 0, 0.33)',
    },
    // Other styles...
    emailFormWindow: {
        width: '100%',
        overflow: 'hidden',
        transition: "all 0.5s ease",
        WebkitTransition: "all 0.5s ease",
        MozTransition: "all 0.5s ease",
    },
    stripe: {
        position: 'relative',
        top: '-45px',
        width: '100%',
        height: '308px',
        backgroundColor: '#7a39e0',
        transform: 'skewY(-12deg)',
    },
    topText: {
        position: 'relative',
        width: '100%',
        top: '15%',
        color: 'white',
        fontSize: '24px',
        fontWeight: '600',
    },
    emailInput: {
        width: '66%',
        textAlign: 'center',
        outline: 'none',
        padding: '12px',
        borderRadius: '12px',
        border: '2px solid #7a39e0',
    },
    bottomText: {
        position: 'absolute',
        width: '100%',
        top: '60%',
        color: 'black',
        fontSize: '24px',
        fontWeight: '600'
    },
    loadingDiv: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        textAlign: 'center',
        backgroundColor: 'white',
    },
    loadingIcon: {
        color: '#7a39e0',
        position: 'absolute',
        top: 'calc(50% - 51px)',
        left: 'calc(50% - 51px)',
        fontWeight: '600',
    },
    chatEngineWindow: {
        width: '100%',
        backgroundColor: 'white',
    }
};
