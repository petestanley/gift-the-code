import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const getUrl = 'http://localhost:4000/banners?category=prostate_cancer,testicular_cancer,mental_health'

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

    return (

          <Paper>
            <Typography variant="h5" component="h3">
              {this.state.banner.category} has news!
            </Typography>
            <Typography component="p">
              {this.state.banner.content}
            </Typography>
          </Paper>

      )
  }

}

ReactDOM.render(
  <Banner />,
  document.getElementById('banner')
);
