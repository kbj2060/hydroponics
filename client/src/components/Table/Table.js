import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
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
import { useQuery } from '@apollo/react-hooks';
import {SWITCH_FEED} from 'resolvers/resolvers';

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
		onClick={handleFirstPageButtonClick}
		disabled={page === 0}
		aria-label="first page"
	  >
		{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
	  </IconButton>
	  <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
		{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
	  </IconButton>
	  <IconButton
		onClick={handleNextButtonClick}
		disabled={page >= Math.ceil(count / rowsPerPage) - 1}
		aria-label="next page"
	  >
		{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
	  </IconButton>
	  <IconButton
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
  table: {
	height:'300px'
  },
});

export default function CustomPaginationActionsTable() {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { loading, error, data } = useQuery(SWITCH_FEED, { variables : { last : 60}});
  const [ rows, setRows ] = React.useState([]);

  useEffect(() => {
    if(loading || error ) { return }
    if(data) {
      setRows(createData(data));
    }}, [data]);

  function createData(data) {  
    var rows = data.switchFeed.switches.map((obj)=> {
      console.log(obj)
      var machine = obj.machine;
      var status = obj.status.toString();
      var name = obj.controledBy.name
      var updatedAt = obj.updatedAt;
      return {machine, status, name, updatedAt} 
    })
    return rows.sort((a, b) => (a.calories < b.calories ? -1 : 1));
  }
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
	setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
	setRowsPerPage(parseInt(event.target.value, 10));
	setPage(0);
  };

  return (
	<TableContainer component={Paper}>
	  <Table className={classes.table} aria-label="custom pagination table">
		<TableBody>
		  {(rowsPerPage > 0
			? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
			: rows
		  ).map((row, index) => (
			<TableRow key={row.index}>
			  <TableCell component="th" scope="row">
				{row.machine}
			  </TableCell>
			  <TableCell align="right">{row.status}</TableCell>
			  <TableCell align="right">{row.name}</TableCell>
        <TableCell align="right">{row.updatedAt}</TableCell>
			</TableRow>
		  ))}

		  {emptyRows > 0 && (
			<TableRow style={{ height: 53 * emptyRows }}>
			  <TableCell colSpan={6} />
			</TableRow>
		  )}
		</TableBody>
		<TableFooter>
		  <TableRow>
			<TablePagination
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
  );
}