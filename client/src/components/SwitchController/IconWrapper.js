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

const CustomCoolerIcon = ({active}) => {
  return JSON.parse(active) ? <AcUnitIcon style={{color: '#425DFF'}} /> : <AcUnitIcon />
};

const CustomWhatshotIcon = ({active}) => {
  return JSON.parse(active) ? <WhatshotIcon style={{color: '#FF5C6F'}} /> : <WhatshotIcon />
};

const CustomWbSunnyIcon = ({active}) => {
  return JSON.parse(active) ? <WbSunnyIcon style={{color: '#FFCC29'}} /> : <WbSunnyIcon />
};

const CustomOpacityIcon = ({active}) => {
  return JSON.parse(active) ? <OpacityIcon style={{color: '#36BEFF'}} /> : <OpacityIcon />
};

const CustomToysIcon = ({active}) => {
  return JSON.parse(active) ? <ToysIcon className="spin" /> : <ToysIcon />
};

const defaultIcons = {
  "cooler" : <AcUnitIcon />,
  "heater" : <WhatshotIcon />,
  "led" : <WbSunnyIcon  />,
  "fan" : <ToysIcon />,
  "waterpump": <OpacityIcon />
}

export default function IconWrapper({machine}) {
  const reduxSwitch = store.getState()['controlSwitch'][machine]
  const [animation, setAnimation] = useState(reduxSwitch);
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

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      console.log(store.getState()['controlSwitch'][machine])
      setAnimation(store.getState()['controlSwitch'][machine]);
    })
    return () => { unsubscribe(); }
  }, [])

  useEffect(() => {
    if(!checkEmpty(animation)){
      setIcon(getIcon(machine, animation))
      setIsLoading(false);
    }
  }, [animation])

  if(isLoading){ return <ColorCircularProgress /> }
  else { return icon }
}