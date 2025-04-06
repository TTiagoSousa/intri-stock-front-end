export const End_Points = {
  Sing_Up_Endpoint: () => `auth-user/sign-up`,
  Activate_Account_Endpoint: (token) => `auth-user/activate-user/${token}`,
};