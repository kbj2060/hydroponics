import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from "@material-ui/core/styles/withStyles";

export const ColorCircularProgress = withStyles({
	root: {
		color: '#FFCB3A',
		margin : 'auto',
		display : 'block'
	},
})(CircularProgress);