import React from 'react';

import './header-row.css';

function HeaderRow() {
  return (
    <table className="heading">
      <tbody>
        <tr>
          <td className="dishname" />
          <td>Кол-во</td>
          <td>Белки</td>
          <td>Жиры</td>
          <td>Угли</td>
          <td>ККал</td>
        </tr>
      </tbody>
    </table>
  );
}

export default HeaderRow;
