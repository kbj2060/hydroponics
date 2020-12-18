import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import axios from "axios";
import {store} from "../../redux/store";
import {ColorCircularProgress} from "../utils/ColorCircularProgress";
import socket from "../../socket";
import {controlSwitch} from "../../redux/modules/ControlSwitch";

const theme = createMuiTheme({
  overrides: {
    MuiTableCell : {
      root : {
        borderBottom : 'none',
      }
    }
  },
});

const useStyles1 = makeStyles({
  root: {
    flexShrink: 0,
  },
});

function TablePaginationActions(props) {
	const {colors} = require('root/values/colors.json');
	const classes = useStyles1({
		fontColor : colors.fontColor
	});
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
	onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
	onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
	onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
	onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
	<div className={classes.root}>
	  <IconButton
    style={{color: colors.fontColor}}
		onClick={handleFirstPageButtonClick}
		disabled={page === 0}
		aria-label="first page"
	  >
		{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
	  </IconButton>
	  <IconButton style={{color: colors.fontColor}} onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
		{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
	  </IconButton>
	  <IconButton style={{color: colors.fontColor}}
		onClick={handleNextButtonClick}
		disabled={page >= Math.ceil(count / rowsPerPage) - 1}
		aria-label="next page"
	  >
		{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
	  </IconButton>
	  <IconButton style={{color: colors.fontColor}}
		onClick={handleLastPageButtonClick}
		disabled={page >= Math.ceil(count / rowsPerPage) - 1}
		aria-label="last page"
	  >
		{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
	  </IconButton>
	</div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
	root: {
		flexShrink: 0,
	},
	container : {
		borderRadius: '20px',
		boxShadow: props => props.neumOutShadow,
		background : props => props.customTheme,
		height: '100%'
	},
	text : {
		padding: '0 !important',
		color : props => props.fontColor,
		fontWeight : 'bold',
	},
	statusOn : {
		color : props => props.colorOn
	},
	statusOff : {
		color : props => props.colorOff
	},
	table : {
		height: '100%'
	},
	footer: {
		padding: '0',
		width : '100%',
		color : props => props.fontColor,
	}
});

export default function MachineHistory() {
	const {colors} = require('root/values/colors.json');
	const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isLoading, setIsLoading] = React.useState(false);
  const [ rows, setRows ] = React.useState([]);
	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
	const [refresh , setRefresh] = React.useState(true);
	const {WordsTable} = require('root/values/strings.json');
	const classes = useStyles2({
		customTheme : colors.customTheme,
		colorOn : colors['buttonOn'],
		colorOff : colors['buttonOff'],
		neumOutShadow : colors.neumOutShadow,
		fontColor : colors.fontColor,
	})
  const handleChangePage = (event, newPage) => {
		setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
  };

  const handleStatus = row => {
  	if(row.machine === 'airconditioner'){
  		if(row.status === 3){ return 'HEATER' }
  		else if(row.status === 2){ return 'COOLER' }
  		else if(row.status === 0){ return 'OFF' }
  		else{ return 'None' }
		}
  	else{
  		return row.status !== 0? 'ON':'OFF'
		}
	}

	const receiveSocket = () => {
		socket.on('receiveSwitchControl', (switchStatus) => {
			setRefresh(false)
			})
	}

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setRefresh(store.getState()['controlSwitch'])
		})
		return () => { unsubscribe(); }
	}, [])

	useEffect(() => {
		let mounted = true;
		const {showHistoryNumber} = require('root/values/defaults.json');

		axios.get('/api/get/switch/history', {
			params: {
				selects: ['machine', 'status', 'created', 'controlledBy'],
				section : 's1',
				num: showHistoryNumber
			}}).then(({data: switchHistory}) => {
				if(mounted) {
					const rows = switchHistory.map((history) => {
						return {
							status: history['status'],
							machine: history['machine'],
							date: history['created'],
							user : history['controlledBy']
						}
					})
					setRows(rows);
					setIsLoading(false);
				}
		})

		return () => {
			mounted = false;
			setRefresh(true)
		}
	}, [refresh]);

	if(isLoading){
		return <ColorCircularProgress />
	}

  return (
    <MuiThemeProvider theme={theme}>
		<TableContainer component={Paper} className={classes.container}>
			  <Table className={classes.table} aria-label="custom pagination table">
					<TableBody>
					  {
					  	(rowsPerPage > 0
						? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						: rows
					  ).map((row, index, arr) => {
							  return (
							  	<TableRow key={index}>
										<TableCell className={classes.text} align="center" component="th" scope="row">
											{WordsTable[row.machine.toLowerCase()]}
										</TableCell>
										<TableCell className={row.status !== 0? classes.statusOn: classes.statusOff} align="center">{handleStatus(row)}</TableCell>
										<TableCell className={classes.text} align="center">{row.user}</TableCell>
										<TableCell className={classes.text} align="center">{row.date}</TableCell>
								</TableRow>)
						  })}

					  {emptyRows > 0 && (
						<TableRow style={{ height: 53 * emptyRows }}>
						  <TableCell colSpan={6} />
						</TableRow>
					  )}
					</TableBody>
					<TableFooter>
						<TableRow>
						<TablePagination
			        className={classes.footer}
						  rowsPerPageOptions={[5]}
						  colSpan={5}
						  count={rows.length}
						  rowsPerPage={rowsPerPage}
						  page={page}
						  SelectProps={{
							inputProps: { 'aria-label': 'rows per page' },
							native: true,
						  }}
						  onChangePage={handleChangePage}
						  onChangeRowsPerPage={handleChangeRowsPerPage}
						  ActionsComponent={TablePaginationActions}
						/>
						</TableRow>
					</TableFooter>
			  </Table>
			</TableContainer>
	  </MuiThemeProvider>
  );
}