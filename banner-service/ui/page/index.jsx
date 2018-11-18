import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


class Page extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data : []
    }
  }

  componentDidMount() {
    fetch('http://localhost:4000/banners?category=prostate_cancer,testicular_cancer,mental_health')
    .then(result=>result.json())
    .then(json=>{
      console.log(json)
      this.setState({
        data: json.data
      })
    })
  }

  render(){
  return (
    <Paper >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Category Id</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Contents</TableCell>
            <TableCell>CreatedAt</TableCell>
            <TableCell>UpdatedAt</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.data.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.content}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>{row.updatedAt}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  )
}
}

export default Page;
