import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <HomePage />
      </View>
    
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
