export const removeKeys = (data: any, keysToDelete: string[]) => {
  for (const key in data) {
    keysToDelete.includes(key) && delete data[key];
  }
  return data;
};
