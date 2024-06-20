import './App.css';
import AuthPage from './auth/authentication';
import MainPage from './mainPage/mainPage';
import SplashScreen from './splashScreen/splashScreen';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


function App() {
  const router = createBrowserRouter([{
    path: '/',
    element: <SplashScreen />
  }, {
    path: '/auth',
    element: <AuthPage />
  }, {
    path: '/main',
    element: <MainPage />
  }
  ]);
  
  return (
    <div className="App">
      {/* <AuthPage/> */}
      {/* <MainPage/> */}
      {/* <SplashScreen /> */}
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
