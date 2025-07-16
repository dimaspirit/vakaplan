export const defaultFormValues = {
  email: "",
  password: "",
}

export const AUTH_TYPES = {
  LOGIN: "login",
  SIGNUP: "signup",
}

export const authViewConfig = {
  [AUTH_TYPES.LOGIN]: {
    welcomeLabel: 'Welcome again',
    welcomeDescription: 'Your journey continues here',
    btnLabel: "Login",
    passwordAutoComplete: "current-password",
    passwordDescription: "Enter your password like a pro: no peeking, no typos, no regrets. Hackers love sloppy logins. Don’t be a gift.",
    changeAuthTypeLabel: "Sign up",
    changeAuthTypeDescription: "Do not have an account?",
  },
  [AUTH_TYPES.SIGNUP]: {
    welcomeLabel: 'Welcome',
    welcomeDescription: 'Your journey starts here',
    btnLabel: "Sign up",
    passwordAutoComplete: "new-password",
    passwordDescription: "Password must be at least 8 characters and contain an uppercase letter, a lowercase letter, and a number.",
    changeAuthTypeLabel: "Login",
    changeAuthTypeDescription: "Already have an account?",
  },
};

export const getAuthViewConfigByAuthType = (type) => {
  const safeType = Object.values(AUTH_TYPES).includes(type) ? type : AUTH_TYPES.LOGIN;
  return authViewConfig[safeType];
};