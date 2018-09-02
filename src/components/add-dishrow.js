import React from 'react';

import './add-dishrow.css';

function DishRow(props) {
  const { name, values, addChangeDish } = props;
  const { proteins, fats, carbohydrates, caloricity } = values;

  return (
    <tr
      className="dish_select"
      onClick={e => {
        e.stopPropagation();
        addChangeDish(name);
      }}
    >
      <td className="chooseDish_namecell">{name}</td>
      <td className="chooseDish_cell">{proteins}</td>
      <td className="chooseDish_cell">{fats}</td>
      <td className="chooseDish_cell">{carbohydrates}</td>
      <td className="chooseDish_cell">{caloricity}</td>
    </tr>
  );
}

export default DishRow;
