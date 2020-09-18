import React, {useEffect} from 'react';
import CircularTimespanpicker from "./TimeSpanPicker";
import {useDispatch} from "react-redux";
import {controlSetting} from "../../redux/modules/ControlSetting";
import useWindowDimensions from "../utils/useWindowDimensions";
import {store} from "../../redux/store";
import update from 'react-addons-update';
import TermControlButton from "./TermControlButton";

export default function TimeSpanWrapper({setting, outerSize}) {
  const dispatch = useDispatch();
  const reduxSetting = store.getState()['controlSetting'][setting]
  const { height, width } = useWindowDimensions();
  const customHeight = (height/2) + 5;
  const customWidth = (width/2) - 34;
  const [visible, setVisible] = React.useState(reduxSetting.enable);


  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setVisible(store.getState()['controlSetting'][setting]['enable']);
    })
    return () => { unsubscribe(); }
  }, [setting])

  const handleTimePicker = (time) => {
    const reduxSetting = store.getState()['controlSetting'][setting]
    let startList=[], endList=[];
    time.forEach((t) => {
      startList.push(t[0].format('HH:mm'))
      endList.push(t[1].format('HH:mm'))
    })
    dispatch(controlSetting({[setting]: update(reduxSetting, {
      start:{$set:startList}, end:{$set:endList}
    })}))
  };

  return(
    <div style={{flexDirection: 'row', display:'flex', justifyContent:'center'}}>
      {visible ? (
        <>
          <div style={{position: 'relative'}}>
            <CircularTimespanpicker subject={setting} onClick={handleTimePicker} outerRadius={outerSize}
                                    boundaryHour={0} showResults={false} />
          </div>
          <div style={{position: 'absolute', display:'flex', top: customHeight, left: customWidth, zIndex:'100', fontSize:'1.1rem'}}>
            <TermControlButton setting={setting} />
          </div>
        </>
      ): null }
    </div>
  )
}