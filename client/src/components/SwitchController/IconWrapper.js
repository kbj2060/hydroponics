import React from 'react';
import AcUnitIcon from "@material-ui/icons/AcUnit";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import ToysIcon from "@material-ui/icons/Toys";
import OpacityIcon from "@material-ui/icons/Opacity";
import './FanOut.css'
import {shallowEqual, useSelector} from "react-redux";

const {colors} = require('../../values/colors.json');

const IconStyleHelper = onColor => {
  let neum = {  }
  neum.color = onColor
  return neum
}

const CustomCoolerIcon = ({active}) => {
  return JSON.parse(active) ? <AcUnitIcon style={IconStyleHelper(colors['coolerIcon'])} />
    : <AcUnitIcon style={IconStyleHelper(colors.defaultIcon)}/>
};

const CustomWhatshotIcon = ({active}) => {
  return JSON.parse(active) ? <WhatshotIcon style={IconStyleHelper(colors['heaterIcon'])} />
  : <WhatshotIcon style={IconStyleHelper(colors['defaultIcon'])}/>
};

const CustomWbSunnyIcon = ({active}) => {
  return JSON.parse(active) ? <WbSunnyIcon style={IconStyleHelper(colors['ledIcon'])} /> :
    <WbSunnyIcon  style={IconStyleHelper(colors.defaultIcon)}/>
};

const CustomOpacityIcon = ({active}) => {
  return JSON.parse(active) ? <OpacityIcon style={IconStyleHelper(colors['waterpumpIcon'])}  />
  : <OpacityIcon style={IconStyleHelper(colors.defaultIcon)} />
};

const CustomToysIcon = ({active}) => {
  return JSON.parse(active) ? <ToysIcon style={IconStyleHelper(colors.defaultIcon)} className="spin" />
  : <ToysIcon  style={IconStyleHelper(colors.defaultIcon)}/>
};

const defaultIcons = {
  "cooler" : <AcUnitIcon />,
  "heater" : <WhatshotIcon />,
  "led" : <WbSunnyIcon  />,
  "fan" : <ToysIcon />,
  "waterpump": <OpacityIcon />
}

export default function IconWrapper({machine}) {
  const animation = useSelector(state => state.switches[machine], shallowEqual)
  const getIcon = (machine, active) => {
    const icons = {
      "cooler" : <CustomCoolerIcon active={active.toString()} />,
      "heater" : <CustomWhatshotIcon active={active.toString()} />,
      "led" : <CustomWbSunnyIcon active={active.toString()} />,
      "fan" : <CustomToysIcon active={active.toString()} />,
      "waterpump": <CustomOpacityIcon active={active.toString()} />
    }
    return icons[machine]
  }
  return animation === undefined ? getIcon(machine, false) : getIcon(machine, animation)
}