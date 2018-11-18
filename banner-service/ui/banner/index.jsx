import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const getUrl = 'http://localhost:4000/banners?category=prostate_cancer,testicular_cancer,mental_health'

const styles = theme => ({
  text: {
    fontSize: "5em",
  }
});

class Banner extends Component {

  constructor(props){

    super(props)
    this.state = {
      banner: {
        category: null,
        content: null
      }
    }
  }

  componentDidMount() {
    fetch(getUrl)
    .then(result=>result.json())
    .then(json=>{
      this.setState({
        banner: json.data.isEmpty? {
          category: null,
          content: null
        }: json.data[0]
      })
    })
  }

  render() {

    const { classes } = this.props

    return (



          <Paper>
            <Typography className={classes.text} variant="h2" component="h2">
              {this.state.banner.category} has news!
            </Typography>
            <Typography className={classes.text} variant="h3" component="h3">
              {this.state.banner.content}
            </Typography>
          </Paper>
      )
  }
}

const BannerPage = withStyles(styles)(Banner)

ReactDOM.render(
  <BannerPage />,
  document.getElementById('banner')
);
