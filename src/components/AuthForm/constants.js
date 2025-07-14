export const defaultsFormValues = {
  email: "",
  password: "",
}

const btnLabels = {
  login: 'Login',
  signup: 'Sign up',
}

const passwordAutoCompleteProps = {
  login: 'current-password',
  signup: 'new-password',
}

const passwordDescriptionLabels = {
  login: 'Enter your password like a pro: no peeking, no typos, no regrets. Hackers love sloppy logins. Don’t be a gift.',
  signup: 'Password must be at least 8 characters and contain an uppercase letter, a lowercase letter, and a number.',
}

const changeAuthTypeLabel = {
  login: 'Sign up',
  signup: 'Login',
}

const changeAuthTypeDescription = {
  login: 'Do not have an account?',
  signup: 'Already have an account?'
}

export function getOptionsByAuthType(type) {
  return {
    btnLabel: btnLabels[type],
    passwordDescriptionLabel: passwordDescriptionLabels[type],
    passwordAutoCompleteProp: passwordAutoCompleteProps[type],
    changeAuthTypeLabel: changeAuthTypeLabel[type],
    changeAuthTypeDescription: changeAuthTypeDescription[type],
  };
};