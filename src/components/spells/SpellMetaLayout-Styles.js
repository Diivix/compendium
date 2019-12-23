import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'stretch',
    boxSizing: 'border-box',
    width: '100%',
    margin: 0,
    padding: 0,
    '& celled-internally & row': {
      boxShadow: '0 -1px 0 0 $colourAltGrey'
    },

    '& celled-internally & row & col': {
      boxShadow: '-1px 0 0 0 $colourAltGrey'
    },

    '& > row': {
      position: 'relative',
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'inherit',
      boxSizing: 'border-box',
      width: '100% !important',
      boxSizing: 'inherit',
      boxShadow: 'inherit',
      alignSelf: 'inherit',
      margin: 0,
      padding: 0,

      '&:first-child': {
        boxShadow: 'none'
      },

      '& > col': {
        position: 'relative',
        display: 'inline-block',
        boxSizing: 'inherit',
        boxShadow: 'inherit',
        margin: 0,
        padding: '1em',
        alignSelf: 'inherit',

        '&:first-child': {
          boxShadow: 'none'
        },

        '&:first-child:nth-last-child(1), &:first-child:nth-last-child(1) ~ div': {
          width: '100%'
        },

        '&:first-child:nth-last-child(2), &:first-child:nth-last-child(2) ~ div': {
          width: '50%'
        },

        '& > h1': {
          paddingLeft: 0,
          paddingBottom: '10px'
        },

        '& > h2, > h3, > h4': {
          margin: 0,
          padding: 0
        }
      }
    }
  },
  
  'center-text': {
    textAlign: 'center!important',
    width: '100%'
  },

  'center-h': {
    justifyContent: 'center!important'
  },
  
  'center-v': {
    alignItems: 'center!important'
  }
}));
