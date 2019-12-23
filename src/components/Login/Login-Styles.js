import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  containerLeft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    zIndex: 5
  },
  circle: {
    zIndex: 1,
    position: "absolute"
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    zIndex: 1
  },
  headerMargin: {
    marginTop: '150px'
  },
  button: {
    marginTop: theme.spacing(2),
    width: '100%'
  }
}));