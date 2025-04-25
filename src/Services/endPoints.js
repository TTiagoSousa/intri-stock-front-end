export const End_Points = {
  Sing_Up_Endpoint: () => `auth-user/sign-up`,
  Activate_Account_Endpoint: (token) => `auth-user/activate-user/${token}`,
  Sing_In_Endpoint: () => 'auth-user/sign-in',
  User_Endpoint: () => 'user/me',
  CompoundInterestCalculator_Endpoint: () => 'compound-interest/simulater',
};