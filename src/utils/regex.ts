const validateString = (regex: RegExp, text: string) => {
  return text ? regex.test(text) : true;
};

export { validateString };
