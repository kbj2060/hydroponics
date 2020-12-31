import React, {useEffect} from 'react';
import Box from "@material-ui/core/Box";
import axios from "axios";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {ColorCircularProgress} from "../utils/ColorCircularProgress";
import {checkEmpty} from "../utils/CheckEmpty";
import {store} from "../../redux/store";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import {shallowEqual, useSelector} from "react-redux";

const useStyles = makeStyles({
	icon:{
		height : '1.1em',
		width : '1.3em',
		margin : 'auto',
		verticalAlign: 'middle',
		textAlign:'center',
		color: props => props.fontColor,
		padding: '1px'
	}
})

export default function AutoChecker({machine}) {
	const {colors} = require('root/values/colors.json')
	const {sections} = require('root/values/preferences.json')
	//const [auto, setAuto] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);
	const {WordsTable} = require('root/values/strings.json')
	const han_current_page = decodeURI(window.location.pathname.replace('/',''))
	const current_page = WordsTable[han_current_page]
	const classes = useStyles({
		fontColor : colors.fontColor
	});
	const auto = useSelector(state => state.auto[machine].enable, shallowEqual)


/*	useEffect(() => {
		setAuto(store.getState()['auto'][machine]['enable']);
		setIsLoading(false)
	}, []);

	if(isLoading){
		return <ColorCircularProgress />
	}*/


	return (auto && <AllInclusiveIcon className={classes.icon}/> );
}
