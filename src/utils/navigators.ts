// import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  // DashboardDrawerParamList,
  RootStackParamList,
} from '../types/navigation';

export const RootStackNavigator =
  createNativeStackNavigator<RootStackParamList>();

// export const DashboardDrawerNavigator =
//   createDrawerNavigator<DashboardDrawerParamList>();
