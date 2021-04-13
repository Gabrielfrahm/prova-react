import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { Provider } from 'react-redux';
import store from './store/index';


import Global from './styles/global'

const App: React.FC = () => {
  return (
    <Provider store={store}>

        <BrowserRouter>
          <Routes />
          <Global />
        </BrowserRouter>

    </Provider>
  )
}


export default App;