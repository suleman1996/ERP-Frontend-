export const removeKey = (data: any) => {
  const keys = ['confirmEmail', 'confirmPassword', '_id'];

  for (const key in data) {
    (keys.includes(key) || !data[key]) && delete data[key];
  }
  return data;
};

export const convertBase64Image = (file: any) => {
  if (!file) return '';
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
