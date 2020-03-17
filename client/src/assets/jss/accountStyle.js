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
    },
    controlCard: {
    position: 'relative',
    top: '-4em',
    zIndex : '1',
    padding: theme.spacing(2),
    textAlign: 'center',
    margin : '0 10px 0 10px',
    height : '20em',
    }
}))

export default accountStyle;
