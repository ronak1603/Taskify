import React from 'react';
import {View, StyleSheet, Image, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {generatedDarkScheme} from '../../utils/color-scheme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomTextInput from '../../components/shared/CustomTextInput';
import {handleRegister} from '../../services/auth';
// import {Controller} from 'react-hook-form';

// TODO: Implement ProfileScreen @ronak1603
const RegisterScreen = () => {
  const register = handleRegister();
  console.log(register, 'register');
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView bounces={false}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../../assets/logos/taskify.png')}
            style={styles.headerImage}
          />
        </View>

        <View style={styles.formContainer}>
          <CustomTextInput
            placeholder="Enter name"
            secureTextEntry
            autoComplete="name"
            autoCapitalize="none"
            iconType="name"
          />
          <View style={styles.px20Height} />
          <CustomTextInput
            placeholder="Enter username or email"
            autoComplete="email"
            autoCapitalize="none"
            iconType="name"
          />
          <View style={styles.px20Height} />
          <CustomTextInput
            placeholder="Enter password"
            secureTextEntry
            autoComplete="current-password"
            autoCapitalize="none"
            iconType="password"
          />
          <View style={styles.px20Height} />
          <CustomTextInput
            placeholder="Enter age"
            secureTextEntry
            autoComplete="cc-number"
            autoCapitalize="none"
            iconType="password"
          />

          <View style={styles.actionButtonContainer}>
            <Button title="Login" />
          </View>

          <View style={styles.subActionButtonContainer}>
            <Button title="Create Account" />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 350,
    backgroundColor: generatedDarkScheme.colors.primary,
  },
  headerImage: {height: 420, objectFit: 'fill'},
  headerText: {
    paddingTop: 32,
    fontSize: 32,
    color: generatedDarkScheme.colors.onSecondary,
  },
  formContainer: {
    paddingLeft: 40,
    paddingTop: 48,
    paddingRight: 40,
    paddingBottom: 40,
  },
  actionButtonContainer: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  actionButton: {
    height: 62,
  },
  subActionButtonContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  px20Height: {
    height: 20,
  },
});

export default RegisterScreen;
