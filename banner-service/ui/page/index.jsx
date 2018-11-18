import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const categorySelections = [
  'prostate_cancer',
  'testicular_cancer',
  'mental_health'
]

const getUrl = 'http://localhost:4000/banners?category=prostate_cancer,testicular_cancer,mental_health'
const postUrl = 'http://localhost:4000/banners'

class Page extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data : [],
      content: "",
      category:'prostate_cancer'
    }
  }



  componentDidMount() {
    fetch(getUrl)
    .then(result=>result.json())
    .then(json=>{
      this.setState({
        data: json.data
      })
    })
  }

  onSubmit() {

    fetch(postUrl,{
      method: 'POST',
      headers: {
              "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        content: this.state.content,
        category: this.state.category
      })
    })
    .then((response)=>{
      if(response.ok){
        return Promise.resolve()
      }
      return Promise.reject()
    })
    .then(()=>fetch(getUrl))
    .then(result=>result.json())
    .then(json=>{
      this.setState({
        data: json.data
      })
    })

  }

  onCategoryChange(value) {
    this.setState({
      category: value
    })
  }

  onContentChange (value) {
    this.setState({
      content: value
    })
  }

  render(){
  return (
    <div>
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

    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>Contents</TableCell>
            <TableCell>Submit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow >
              <TableCell component="th" scope="row">
                <TextField
                    select
                    variant="filled"
                    value={this.state.category}
                    onChange={(event)=>{this.onCategoryChange(event.target.value)}}
                  >
                    {categorySelections.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
              </TableCell>
              <TableCell>
                <Input
                  onChange = {(event)=>this.onContentChange(event.target.value)}
                />
              </TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={this.onSubmit.bind(this)}>
                  Submit
                </Button>
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </Paper>

    </div>
  )
}
}

export default Page;
