export const checkValidData = (email, password, name) => {
  const isValidEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isValidPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  const isNameValid = name !== "";
  if (!isNameValid) return "Please enter name";

  if (!isValidEmail) return "Email is not valid";
  if (!isValidPassword) return "Password is not valid";

  return null;
};
