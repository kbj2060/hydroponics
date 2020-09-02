import React from 'react';
import Chip from "@material-ui/core/Chip";

export default function RangeChip({setting, icons, min, max}){
  const [firstIcon, secondIcon] = icons;
  const {unitsTable} = require('root/init_setting');

  return(
    <div style={{width: '100%'}}>
      <Chip style={{ color: 'white',width: '50%', backgroundColor: '#2153FF'}}  icon={firstIcon} label={`${min} ${unitsTable[setting]}`} />
      <Chip style={{ color: 'white',width: '50%', backgroundColor: '#FF2E63'}}  icon={secondIcon} label={`${max} ${unitsTable[setting]}`} />
    </div>
  )
}