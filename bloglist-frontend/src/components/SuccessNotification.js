const SuccessNotification = ({ message }) => {
    if (message === null) {
        return null
    }

    const successStyle = {
        borderRadius: 10,
        padding: 10,
        marginBottom: 10
    }
    return (
        <div style={successStyle} className="has-background-success-dark has-text-white-ter has-text-weight-bold has-text-centered">
            {message}
        </div>
    )
}

export default SuccessNotification