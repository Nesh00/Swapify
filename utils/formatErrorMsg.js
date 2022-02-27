export const formatErrorMsg = (errMsg) => {
  const message = errMsg
    .replace(/-/g, ' ')
    .slice(errMsg.lastIndexOf('/') + 1, -2);

  return message[0].toUpperCase() + message.slice(1);
};
