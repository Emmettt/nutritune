import React from 'react';

import HeaderRow from './header-row';
import Menu from './menu-table';
import Totals from './totals';

import './menu-container.css';

function MenuContainer() {
  return (
    <div className="menuContainer" onContextMenu={e => e.preventDefault()}>
      <HeaderRow />
      <Menu />
      <Totals />
    </div>
  );
}

export default MenuContainer;
