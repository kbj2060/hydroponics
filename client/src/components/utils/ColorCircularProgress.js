import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from "@material-ui/core/styles/withStyles";

export const ColorCircularProgress = withStyles({
	root: {
		color: '#dec11e',
		margin : 'auto',
		display : 'block'
	},
})(CircularProgress);