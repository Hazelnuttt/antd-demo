import React from 'react';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home/home';
import Layout from './components/layout/index';
import LoginPage from './components/LoginPage';
import LoginForm from './components/LoginForm/LoginForm';
import Register from './components/register';
import Man_user from './components/user/manage_user';
import Man_ter from './components/terminal/manage_terminal';
import Man_info from './components/terminal/terminal_info';
import Newter from './components/terminal/newterminal';
import Single_edit from './components/terminal/single_edit';
import Batch_edit from './components/terminal/batch_edit';
import Media from './components/media';
import Newuser from './components/user/newuser';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import './App.scss';

moment.locale('zh-cn');

class App extends React.Component {
  render() {
    let LayoutRouter = (
      <Layout>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/home/index" component={Home} />
          <Route path="/user/index" component={Man_user} />
          <Route path="/user/update" component={Newuser} />
          <Route path="/ter/index" component={Man_ter} />
          <Route path="/ter/ter_info" component={Man_info} />
          <Route path="/ter/add" component={Newter} />
          <Route path="/ter/edit_single" component={Single_edit} />
          <Route path="/ter/edit_batch" component={Batch_edit} />
          <Route path="/media/index" component={Media} />
          <Redirect exact from="/home" to="/home/index" />
          <Redirect exact from="/user" to="/user/index" />
          <Redirect exact from="/ter" to="/ter/index" />
        </Switch>
      </Layout>
    );
    return (
      <Router>
        <div className="App">
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={Register} />
          <Route path="/" render={props => LayoutRouter} />
        </div>
      </Router>
    );
  }
}

export default App;
