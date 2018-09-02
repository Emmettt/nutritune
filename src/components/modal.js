import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BackDrop from '../components/backdrop';
import Loader from '../components/loader';
import ModalMsg from '../components/modal-msg';
import Range from './range';
import IntakeMenu from './intakemenu-context';
import DishMenu from './dishmenu-context';
import IntakeNameForm from './intake-nameform';
import DishTable from './add-dishtable';
import ParametersTab from './param-tab';

import showUI from '../actions/showUI';
import hideUI from '../actions/hideUI';

import './modal.css';

function Modal({ typeUI, hideUI }) {
  switch (typeUI) {
    case 'loader':
      return (
        <BackDrop>
          <Loader />
          <p>Loading data ...</p>
        </BackDrop>
      );
    case 'paramwarning':
      return (
        <BackDrop>
          <ModalMsg hideUI={hideUI} msg={'Введите числа больше нуля !!!'} />
        </BackDrop>
      );
    case 'range':
      return <Range />;
    case 'dishmenu':
      return <DishMenu />;
    case 'intakemenu':
      return <IntakeMenu />;
    case 'intakename':
      return <IntakeNameForm />;
    case 'intakerename':
      return <IntakeNameForm />;
    case 'adddish':
      return <DishTable />;
    case 'changedish':
      return <DishTable />;
    case 'addproduct':
      return <DishTable typeUI={typeUI} />;
    case 'paramtab':
      return <ParametersTab />;
    default:
      return null;
  }
}

export default connect(
  null,
  dispatch => bindActionCreators({ showUI, hideUI }, dispatch)
)(Modal);
