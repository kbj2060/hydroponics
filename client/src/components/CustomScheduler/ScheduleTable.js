import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import ScheduleDetail from "./ScheduleDetail";
import {checkEmpty} from "../utils/CheckEmpty";
import axios from "axios";
import moment from "moment";
import {shallowEqual, useSelector} from "react-redux";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'date', numeric: true, disablePadding: false, label: '날짜' },
  { id: 'title', numeric: true, disablePadding: false, label: '제목' },
  { id: 'binding', numeric: true, disablePadding: false, label: '중복' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, setIsLoading } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

/*
  useEffect(() => {
    setIsLoading(true)
  }, [rowCount])
*/

  return (
    <TableHead>
      <TableRow>
        {console.log("Header Rendering",order, orderBy,numSelected,rowCount)}
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            style ={{color :"#595957"}}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: '#595957',
          backgroundColor: '#D9D8D2',
        }
      : {
          color: '#595957',
          backgroundColor: '#D9D8D2',
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, selected:selectedIds, removeRows } = props;

  const postRemoveSchedule = async () => {
    await axios.post('/api/post/remove/schedule', {
      params: {
        ids : selectedIds
      }}).then(() => {
        removeRows(selectedIds);
    })
  }

  const handleDeleteSchedule = () => {
    postRemoveSchedule();
  }

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
      variant="dense"
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} 선택됨
        </Typography>
      ) : (
        <Typography className={classes.title} variant="subtitle1" id="tableTitle" component="div">
          세부 일정
        </Typography>
      )}

      {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={handleDeleteSchedule} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
      ) : (
          <>
          </>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  tableWrapper: {
    height: '100%',
    width: '100%',
    boxShadow : props => props.neumOutShadow,
    backgroundColor : props => props.customTheme,
    borderRadius: "1em",
  },
  root : {
    '&.MuiTableRow-root': {
      '&.Mui-selected': { backgroundColor: "rgba(140,138,122,0.5)"}
    },
    "&.MuiSvgIcon-root" : {color: "#8C8A7A"}
  },
  paper: {
    height: '100%',
    borderRadius: "1em",
    width: '100%',
    background : 'transparent',
  },
  table: {
    width: '100%',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function ScheduleTable({selectedDay}) {
  const {colors} = require('root/values/colors.json')
  const classes = useStyles({
    customTheme : colors.customTheme,
    neumOutShadow : colors.neumOutShadow,
    fontColor : colors.fontColor
  });
  // set ordering : by date and through asc
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('date');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([])
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedRow, setSelectedRow] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(true);
  const [drawer, setDrawer] = React.useState(false);
  const date = useSelector(state => state.date, shallowEqual)

  const toggleDrawer = () => {
    setDrawer(!drawer);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleRowClick = (event, row) => {
    toggleDrawer();
    setSelectedRow(row);
  }

  const handleCheckboxClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleMomentFormat = (date) => {
    return moment(new Date(date.year, date.month-1, date.day)).format("YYYY-MM-DD")
  }

  const removeRows = (ids) => {
    setRows(rows.filter((row) => !ids.includes(row.id)))
  }

  const reviseRow = (id, date, title, content, binding) => {
    setRows(rows.map((row) => id === row.id ? {id, date, title, content, binding} : row))
  }

  const getDaySchedule = async () => {
    const date = `${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`
    await axios.get("/api/get/schedules", {
        params: {
          date : date,
          month : false
        }}).then(({data}) => {
          if(!checkEmpty(data)) {
            let temp = []
            data.forEach((row) => { temp.push(row) })
            setRows(temp);
          } else { setRows([]) }
          setIsLoading(false);
    })
  }

  const getMonthSchedule = async () => {
    await axios.get("/api/get/schedules", {
        params: {
          date: `${date.year}-${date.month}`,
          month : true
        }}).then(({data}) => {
          if(!checkEmpty(data)) {
            let temp = []
            data.forEach((row) => {
              temp.push(row)
            })
            setRows(temp);
          } else {
            setRows([])
          }
          setIsLoading(false);
    })
  }

  const cleanup = () => {
    setRows([]);
    setPage(0)
    setSelected([])
    setIsLoading(true);
  }

  useEffect(() => {
    selectedDay ? getDaySchedule() : getMonthSchedule();
    return () => { cleanup();}
  }, [selectedDay, date])

  return (
    isLoading ||
    <div className={classes.tableWrapper}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} selected={selected} removeRows={removeRows} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              setIsLoading={setIsLoading}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      classes={{
                        root : classes.root}}
                    >
                      <TableCell  padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleCheckboxClick(event, row.id)}
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          style ={{color :"#595957"}}
                        />
                      </TableCell>
                      <TableCell onClick={(event) => handleRowClick(event, row)} align="center">
                        {selectedDay?handleMomentFormat(selectedDay):row.date[0]}
                      </TableCell>
                      <TableCell onClick={(event) => handleRowClick(event, row)} align="center">{row.title}</TableCell>
                      <TableCell onClick={(event) => handleRowClick(event, row)} align="center">{!row.binding?'':row.binding+'회'}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height:  53 * emptyRows }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
                  {console.log("Table Rendering", rows, order, orderBy, rowsPerPage, isLoading, date, drawer, selectedDay, selectedRow)}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        {drawer && <ScheduleDetail
          toggleDrawer={toggleDrawer}
          selectedRow={selectedRow}
          reviseRow={reviseRow}
        />}
      </Paper>
    </div>
  );
}
