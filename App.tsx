import React from 'react';
import Viro from './Viro';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function App() {
  const [showAR, setShowAR] = React.useState<boolean>(false);
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {showAR ? (
        <Viro />
      ) : (
        <View style={styles.innerContainer}>
          <Text style={styles.text}>
            Other Component Will be displayed here
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowAR(!showAR)}
      >
        <Text style={styles.text}>Toggle AR</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    width: '80%',
    color: 'black',
    fontFamily: 'Arial',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  button: {
    height: 80,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'teal',
    justifyContent: 'center',
  },
});

export default App;
