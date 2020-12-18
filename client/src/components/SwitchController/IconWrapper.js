import React, {useEffect, useState} from 'react';
import AcUnitIcon from "@material-ui/icons/AcUnit";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import ToysIcon from "@material-ui/icons/Toys";
import OpacityIcon from "@material-ui/icons/Opacity";
import {store} from "../../redux/store";
import {ColorCircularProgress} from "../utils/ColorCircularProgress";
import './FanOut.css'
import {checkEmpty} from "../utils/CheckEmpty";
import socket from "../../socket";

const {colors} = require('root/values/colors.json');

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
  const [animation, setAnimation] = useState(false);
  const [icon ,setIcon] = useState(defaultIcons[machine]);
  const [isLoading, setIsLoading] = React.useState(true);

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

  const receiveSocket = () => {
    socket.on('receiveSwitchControl', (switchStatus) => {
      if(machine === switchStatus.machine){
        setAnimation(switchStatus.status);
      }})
  }

  const cleanup = () => {
    socket.disconnect();
  }

  useEffect(() => {
    receiveSocket();
    return () => cleanup();
  }, [machine]);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const activeSwitch = store.getState()['controlSwitch'][machine]
      if(!checkEmpty(activeSwitch)) { setAnimation(activeSwitch); }
    })
    return () => { unsubscribe(); }
  }, [])

  useEffect(() => {
    const activeSwitch = store.getState()['controlSwitch'][machine]
    if(!checkEmpty(activeSwitch)) {
      setAnimation(activeSwitch);
    }
  }, []);

  useEffect(() => {
    if(!checkEmpty(animation)){
      setIcon(getIcon(machine, animation))
      setIsLoading(false);
    }
  }, [animation])

  if(isLoading){ return <ColorCircularProgress /> }
  else {return icon}
}