/**
 * This file defines the types used for navigation in the application.
 * Developers can refer to the official React Navigation TypeScript documentation for more information:
 * {@link https://reactnavigation.org/docs/typescript}
 */

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  // RegisterVerify: {email: string; verificationToken: string; expiresIn: string};
  // Onboarding: undefined;
  // Dashboard: NavigatorScreenParams<DashboardDrawerParamList>;
  // Profile: {userId: string} | undefined;
  // CreateOrganization: undefined;
  // OrganizationSettings: undefined;
  // Note: {noteId: string};
  // Feed: {sort: 'latest' | 'top'} | undefined;
};

export type DashboardDrawerParamList = {
  DashboardScreen: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
