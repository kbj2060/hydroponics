import React from 'react';
import {makeStyles, withStyles} from "@material-ui/core/styles";
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
	const {colors} = require('../../values/colors.json')
	const classes = useStyles({
		fontColor : colors.fontColor
	});
	const auto = useSelector(state => state.auto[machine].enable, shallowEqual)

	return (auto && <AllInclusiveIcon className={classes.icon}/> );
}
