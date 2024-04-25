import React, {FC} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import Login from '../components/Login';
import Header from '../components/Header';

const dimensions = Dimensions.get('window');
const screen = dimensions.height;

//Components

const LoginScreen: FC = () => {
  return (
    <View style={styles.container}>
      <Header title="Login" />
      <Login />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    minHeight: screen,
  },
});

export default LoginScreen;
