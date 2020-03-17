import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const accountStyle = makeStyles(theme =>({
    root: {
    overflow: 'hidden',
    flexGrow: 1,
    backgroundColor: '#ABBFBE',
    [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        }
    ,
    }
}))

export default accountStyle;
