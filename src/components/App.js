import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuContainer from './menu-container';
import Header from './header';
import getInitialData from '../middleware/getdata';
import Modal from '../components/modal';
import LineChart from './chart';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.getInitialData();
  }
  render() {
    const { typeUI } = this.props;
    return (
      <div className="App">
        <Modal typeUI={typeUI} />
        <Header />
        {typeUI !== 'loader' && <MenuContainer />}
        {typeUI !== 'loader' && <LineChart />}
      </div>
    );
  }
}

export default connect(
  state => ({
    typeUI: state.showUI.typeUI
  }),
  dispatch => ({
    getInitialData: () => dispatch(getInitialData(dispatch))
  })
)(App);
