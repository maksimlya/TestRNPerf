import {AppRegistry, NativeModules} from 'react-native';

const {DMInterface} = NativeModules;
window.DMInterface = DMInterface;

const App = require('./App').default;
const appName = 'testRN';
AppRegistry.registerComponent(appName, () => App);

