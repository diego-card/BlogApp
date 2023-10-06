const ErrorNotification = ({ message }) => {
    if (message === null) {
        return null
    }

    const errorStyle = {
        borderRadius: 10,
        padding: 10,
        marginBottom: 10
    }
    return (
        <div style={errorStyle} className="has-background-danger-dark has-text-white-ter has-text-weight-bold has-text-centered">
            {message}
        </div>
    )
}

export default ErrorNotification