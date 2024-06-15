// src/components/CustomTextInput.tsx
import React from 'react';
import {View, TextInput, StyleSheet, TextInputProps} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {generatedDarkScheme} from '../../../utils/color-scheme';
import ProfileIcon from '../../../assets/icons/ProfileIcon.svg';

interface CustomTextInputProps extends TextInputProps {
  iconType: 'email' | 'password' | 'name';
}

interface InputIconProps {
  iconType: 'email' | 'password' | 'name';
}

const InputIcon = ({iconType}: InputIconProps) => {
  switch (iconType) {
    case 'email':
      return <ProfileIcon width={22} height={22} />;
    case 'password':
      return <ProfileIcon width={22} height={22} />;
    case 'name':
      return <ProfileIcon width={22} height={22} />;
    default:
      return <ProfileIcon width={22} height={22} />;
  }
};

const CustomTextInput = ({iconType, style, ...rest}: CustomTextInputProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconBox}>
        <InputIcon iconType={iconType} />
      </View>
      <TextInput style={styles.textInput} {...rest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
  },
  icon: {
    marginRight: 10,
    fontSize: 22,
  },
  iconBox: {
    padding: 10,
    backgroundColor: generatedDarkScheme.colors.background,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    padding: 10,
  },
});

export default CustomTextInput;
