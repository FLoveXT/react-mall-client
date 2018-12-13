import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Main from './container/main/main'
import Admin from './container/admin/admin'

import { Provider } from 'react-redux'
import store from './redux/store'

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/admin' component={Admin} />
        <Route component={Main} />
      </Switch>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}