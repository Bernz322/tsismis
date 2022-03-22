/**
 * Higher-order function for async-await error handling instead of putting try catch over and over again
 * @param {function} func as an async function
 * @returns {function}
 */

export const catchErrors = func => {
    return function (...args) {
        return func(...args).catch((err) => {
            console.error(err)
        })
    }
}

/**
 * Format milliseconds to time duration
 * @param {number} ms number of milliseconds
 * @returns {string} formatted duration string
 * @example 216699 -> '3:36'
 */
export const formatDuration = ms => {
    let seconds = Math.floor((ms / 1000) % 60)
    let minutes = Math.floor((ms / (1000 * 60)) % 60)
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return `${hours}:${minutes}:${seconds}`;
}

export const getSenderName = (currentUser, chatUsers) => {
    // Return the chat name/ sender name
    // Get the current user logged in
    // Check if the 1st chat user has similar id of the current logged in user, if yes then return the 2nd chat user's username
    if (chatUsers[0] === undefined) { return }
    return chatUsers[0]?._id === currentUser?._id ? chatUsers[1]?.username : chatUsers[0]?.username
}

export const getSenderImg = (currentUser, chatUsers) => {
    // Return the chat img/ sender's img
    // Get the current user logged in
    // Check if the 1st chat user has similar id of the current logged in user, if yes then return the 2nd chat user's img
    if (chatUsers[0] === undefined) { return }
    return chatUsers[0]?._id === currentUser?._id ? chatUsers[1]?.profileImg : chatUsers[0]?.profileImg
}

export const getSenderAbout = (currentUser, chatUsers) => {
    // Return the chat img/ sender's img
    // Get the current user logged in
    // Check if the 1st chat user has similar id of the current logged in user, if yes then return the 2nd chat user's img
    if (chatUsers[0] === undefined) { return }
    return chatUsers[0]?._id === currentUser?._id ? chatUsers[1]?.about : chatUsers[0]?.about
}

// export const sameSender = (allMessages, currentMessage, indexCurrentMessage, currentUser) => {
//     return (
//         // If the index of the message is less than the length of the array, then proceed
//         indexCurrentMessage < allMessages.length - 1 &&
//         // If the next message's sender is not the same to the current message sender or is undefined, then return true
//         (allMessages[indexCurrentMessage + 1].sender._id !== currentMessage.sender._id || allMessages[indexCurrentMessage + 1].sender._id === undefined)
//         && (allMessages[indexCurrentMessage].sender._id !== currentUser._id)    // If the current message's sender is not the same to the current user, then return true
//     )
// }

// export const lastMessage = (allMessages, indexCurrentMessage, currentUser) => {
//     return (
//         // Check if the current message is the last one in the array
//         indexCurrentMessage === allMessages.length - 1 &&
//         // If the last message's sender is not the same to the current user, then return true
//         allMessages[allMessages.length - 1].sender._id !== currentUser._id &&
//         allMessages[allMessages.length - 1].sender._id    // Ensure that the message exists
//     )
// }