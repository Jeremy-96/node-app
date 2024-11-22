const filterObject = (obj, ...properties) => {
  const newObject = {};
  Object.keys(obj).forEach((el) => {
    if (properties.includes(el)) newObject[el] = obj[el];
  });

  return newObject;
};

export default filterObject;
