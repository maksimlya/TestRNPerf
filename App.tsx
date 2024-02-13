/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {TextEncoder} from '@int/rn-native-utils';
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

window.encoder = new TE.TextEncoder('utf-8');
window.decoder = new TE.TextDecoder('utf-8');
window.fastEncoder = new TextEncoder();

import {convertToMobileDisplay} from './mobileResponsive';

import {testVal, intArr} from './data';
window.testVal = testVal;
window.intArr = intArr;
function testEncode() {
  const startTime = Date.now();
  window.encoded = window.encoder.encode(testVal);
  const execTime = "ExecutionTime = " + (Date.now() - startTime);
  Alert.alert('alert',execTime);
}


function testEncode100() {
  const startTime = Date.now()
  for(let i = 0 ; i < 100 ; i ++) {
    window.encoded = window.encoder.encode(testVal);
  }
  const execTime = "ExecutionTime = " + (Date.now() - startTime);
  Alert.alert('alert',execTime);
}

function testEncodeSmall10k() {
  const startTime = Date.now()
  for(let i = 0 ; i < 10000 ; i ++) {
    window.encoder.encode('Mommy here');
  }
  const execTime = "ExecutionTime = " + (Date.now() - startTime);
  Alert.alert('alert',execTime);
}


function testFastEncode() {
  const startTime = Date.now();
  window.encoded = fastEncoder.encode(testVal);
  const execTime = "ExecutionTime = " + (Date.now() - startTime);
  Alert.alert('alert',execTime);
}

function testFastEncode100() {
  const startTime = Date.now();
  for(let i = 0 ; i < 100 ; i ++) {
    window.encoded = fastEncoder.encode(testVal);
  }
  const execTime = "ExecutionTime = " + (Date.now() - startTime);
  Alert.alert('alert',execTime);
}

function testFastEncodeSmall10k() {
  const startTime = Date.now();
  for(let i = 0 ; i < 10000 ; i ++) {
    fastEncoder.encode('Mommy here');
  }
  const execTime = "ExecutionTime = " + (Date.now() - startTime);
  Alert.alert('alert',execTime);
}

function testDecode() {
  const startTime = Date.now();
  window.decoder.decode(window.encoded);
  const execTime = "ExecutionTime = " + (Date.now() - startTime);
  Alert.alert('alert',execTime);
}
function testDecode100() {
  const startTime = Date.now();
  for(let i = 0 ; i < 100 ; i ++) {
    window.decoder.decode(window.encoded);
  }
  const execTime = "ExecutionTime = " + (Date.now() - startTime);
  Alert.alert('alert',execTime);
}
function testDecodeSmall10k() {
  const startTime = Date.now();
  for(let i = 0 ; i < 10000 ; i ++) {
    window.decoder.decode(new Uint8Array([1,2,3,4,5]));
  }
  const execTime = "ExecutionTime = " + (Date.now() - startTime);
  Alert.alert('alert',execTime);
}
function testFastDecode() {
  const startTime = Date.now();
  fastEncoder.decode(window.encoded);
  const execTime = "ExecutionTime = " + (Date.now() - startTime);
  Alert.alert('alert',execTime);
}
function testFastDecode100() {
  const startTime = Date.now();
  for(let i = 0 ; i < 100 ; i ++) {
    fastEncoder.decode(window.encoded);
  }
  const execTime = "ExecutionTime = " + (Date.now() - startTime);
  Alert.alert('alert',execTime);
}
function testFastDecodeSmall10k() {
  const startTime = Date.now();
  for(let i = 0 ; i < 10000 ; i ++) {
    fastEncoder.decode(new Uint8Array([1,2,3,4,5]));
  }
  const execTime = "ExecutionTime = " + (Date.now() - startTime);
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
      {/* <Button title="Test" onPress={() => {
          const startTime = Date.now();
          convertToMobileDisplay(testVal)
          const execTime = "ExecutionTime = " + (Date.now() - startTime);
          console.error(execTime);
          Alert.alert('alert',execTime);
        }}></Button> */}
          <Button title="Test Encode" onPress={() => {
            testEncode()
          }}></Button>
            <Button title="Test Encode 100" onPress={() => {
              testEncode100()
          }}></Button>
          <Button title="Test Encode 10k small strings" onPress={() => {
              testEncodeSmall10k()
          }}></Button>
          <Button title="Test Decode " onPress={() => {
              testDecode()
          }}></Button>
              <Button title="Test Decode 100 " onPress={() => {
              testDecode100()
          }}></Button>
          <Button title="Test Decode 10k small strings" onPress={() => {
              testDecodeSmall10k()
          }}></Button>

          <View style={{ height: 40 }} />

          <Button title="Test Fast Encode" onPress={() => {
              testFastEncode()
          }}></Button>
          <Button title="Test Fast Encode 100" onPress={() => {
              testFastEncode100()
          }}></Button>
          <Button title="Test Fast Encode 10k small strings" onPress={() => {
              testFastEncodeSmall10k()
          }}></Button>
         <Button title="Test Fast Decode " onPress={() => {
            testFastDecode()
        }}></Button>
        <Button title="Test Fast Decode 100" onPress={() => {
            testFastDecode100()
        }}></Button>
        <Button title="Test Fast Decode 10k small strings" onPress={() => {
            testFastDecodeSmall10k()
        }}></Button>
          {/* <Button title="Test Convert " onPress={() => {
            testConvert()
        }}></Button> */}
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
