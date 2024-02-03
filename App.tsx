/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import TE from 'text-encoding';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert
} from 'react-native';

window.TextEncoder = TE.TextEncoder;
window.TextDecoder = TE.TextDecoder;

window.encoder = new TextEncoder('utf-8');
window.decoder = new TextDecoder('utf-8');

import {convertToMobileDisplay} from './mobileResponsive';

import {testVal, intArr} from './data';
window.testVal = testVal;
window.intArr = intArr;
function testEncode() {
  const startTime = Date.now();
  window.encoded = window.encoder.encode(testVal);
  const execTime = "ExecutionTime = " + (Date.now() - startTime);
  console.error(execTime);
  Alert.alert('alert',execTime);
}

function testDecode() {
  const startTime = Date.now();
  window.decoder.decode(window.encoded);
  const execTime = "ExecutionTime = " + (Date.now() - startTime);
  console.error(execTime);
  Alert.alert('alert',execTime);
}

function testConvert() {
  // let a = {};
  const startTime = Date.now();


  // new Uint8Array(intArr);


  const byteArray = new Uint8Array(10000000);
  for (let n = 0; n < byteArray.length; n++) {
    let a = 1;
  }


  const execTime = "ExecutionTime = " + (Date.now() - startTime);
  console.error(execTime);
  Alert.alert('alert',execTime);
}

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Button title="Test" onPress={() => {
          const startTime = Date.now();
          convertToMobileDisplay(testVal)
          const execTime = "ExecutionTime = " + (Date.now() - startTime);
          console.error(execTime);
          Alert.alert('alert',execTime);
        }}></Button>
          <Button title="Test Encode" onPress={() => {
            testEncode()
        }}></Button>
          <Button title="Test Decode " onPress={() => {
            testDecode()
        }}></Button>
          <Button title="Test Convert " onPress={() => {
            testConvert()
        }}></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
