export const removeKeys = (data: any, keysToDelete: string[]) => {
  for (const key in data) {
    keysToDelete.includes(key) && delete data[key];
  }
  return data;
};

export const setFormError = (res: any, setError: any) => {
  console.log('api', res);
  if (res.status === 422) {
    const errorMessages = res.data.error;
    if (errorMessages)
      for (const msg of errorMessages) {
        setError(msg?.context?.label, {
          message: prepareMessage(msg),
        });
      }
  }
};

const prepareMessage = (error: any) => {
  const {
    context: { key, label, value },
  } = error;
  let newErrorMessage = '';
  newErrorMessage = error.message.replace(label, key);
  if (error?.context?.valids && error?.context.valids?.length) {
    if (value) {
      newErrorMessage = `Invalid value for ${key}`;
    }
  }
  newErrorMessage = newErrorMessage.replaceAll('"', '');
  newErrorMessage = newErrorMessage.charAt(0).toUpperCase() + newErrorMessage.slice(1);
  return newErrorMessage;
};

export const setErrors = (errors: any, setError: any) =>
  Object.keys(errors).forEach((key) => setError(key, { type: 'custom', message: errors[key] }));
