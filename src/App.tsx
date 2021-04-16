import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { Provider } from 'react-redux';
import store from './store/index';


import Global from './styles/global'
import AppProvider from './hooks';


const App: React.FC = () => {

  

  return (
    <Provider store={store}>
      <AppProvider>
        <BrowserRouter>
          <Routes />
          <Global />
        </BrowserRouter>
      </AppProvider>
    </Provider>
  )
}


export default App;