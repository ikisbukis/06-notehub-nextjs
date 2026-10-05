'use client'

interface ErrorProp {
    error: Error
}

 const Error = ({error} : ErrorProp) => {
    return (
        <p>Could not fetch the list of notes. {error.message}</p>
    )
}

export default Error