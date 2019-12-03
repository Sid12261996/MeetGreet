import React,{lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';
import SplashScreen from './Components/SplashScreen/SplashScreen'
const App = lazy(()=> import('./App'));

ReactDOM.render(<Suspense fallback={<SplashScreen />}><App /></Suspense>, document.getElementById('root'));
