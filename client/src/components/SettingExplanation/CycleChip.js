import React from 'react';
import Chip from "@material-ui/core/Chip";

export default function CycleChip({setting, icons, value}){
  const [icon] = icons;
  const {unitsTable} = require('root/init_setting');

  return(
    <div style={{width: '100%'}}>
      <Chip style={{width: '100%', color: 'white', backgroundColor: '#FFC421' }} icon={icon} label={`${value} ${unitsTable[setting]}`} />
    </div>
  )
}