import React, {useCallback, useEffect} from 'react';
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
  const classes = useStyles1();
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
    style={{color:'white'}}
		onClick={handleFirstPageButtonClick}
		disabled={page === 0}
		aria-label="first page"
	  >
		{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
	  </IconButton>
	  <IconButton style={{color:'white'}} onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
		{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
	  </IconButton>
	  <IconButton
    style={{color:'white'}}
		onClick={handleNextButtonClick}
		disabled={page >= Math.ceil(count / rowsPerPage) - 1}
		aria-label="next page"
	  >
		{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
	  </IconButton>
	  <IconButton
    style={{color:'white'}}
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
	container : {
		boxShadow: '0 3px 5px rgba(0, 0, 0, 0.16), 0 3px 5px rgba(0, 0, 0, 0.23)',
		backgroundColor : 'rgba(255, 255, 255, 0.1)',
		borderRadius: '0.5rem',
		height: '100%'},
	text : {
		padding : '5px 0 5px 0',
		color : 'white !important',
		fontWeight : 'bold',
	},
	statusOn : {
		color : '#FFCB3A'
	},
	statusOff : {
		color : '#FF4F61'
	},
	table : {
		height: '100%'
	}
});

export default function CustomPaginationActionsTable() {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isLoading, setIsLoading] = React.useState(true);
  const [ rows, setRows ] = React.useState([]);
	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
	const [refresh , setRefresh] = React.useState();
	const {WordsTable} = require('../../client_property');

  const handleChangePage = (event, newPage) => {
		setPage(newPage);
  };

	store.subscribe(() => {
		setRefresh(store.getState()['controlSwitch']);
	})

  const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
  };

	const fetchSwitchHistory = useCallback(async () => {
		const {showHistoryNumber} = require('../../client_property');

		await axios.get('/api/getSwitchHistory', {
			params: {
				selects: ['machine', 'status', 'date'],
				num: showHistoryNumber
			}}).then(({data: switchHistory}) => {
			const rows = switchHistory.map((history) => {
				return {
					status: history['status'],
					machine: history['machine'],
					date: history['date']
				}})
			setRows(rows);
			setIsLoading(false);
		})
	}, [])

	useEffect(() => {
		fetchSwitchHistory();
	}, [fetchSwitchHistory, refresh]);

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
							  return (<TableRow key={index}>
								  <TableCell className={classes.text} align="center" component="th" scope="row">
									  {WordsTable[row.machine.toLowerCase()]}
								  </TableCell>
								  <TableCell className={row.status === 1? classes.statusOn: classes.statusOff} align="center">{row.status === 1? "ON":"OFF"}</TableCell>
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
			        className={classes.text}
						  rowsPerPageOptions={[5]}
						  colSpan={3}
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