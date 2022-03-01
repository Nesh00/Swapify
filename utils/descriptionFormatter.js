export const descriptionFormatter = (description) => {
  if (description) {
    const descArr = description.split(' ').slice(0, 7).join(' ').trimStart();
    return `${descArr}...`;
  }
  return '';
};
