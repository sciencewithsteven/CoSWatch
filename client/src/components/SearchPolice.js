import React from 'react';
import SearchList from './SearchList.js';
import {debounce} from 'lodash';

class SearchPolice extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      fullName: '',
      state: '',
      agency: ''
    }
    // this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.listDisplayed = this.listDisplayed.bind(this);
  }

  clearFields(){
    this.setState({
      fullName: '',
      state: '',
      agency: ''
    })
  }

  //onKeyPress={this.handleSearch}
  // handleSearch(event){
  //   event.preventDefault();
  //   if (event.key === "Enter") {
  //     this.props.searchPolice(this.state);
  //     this.clearFields();
  //   }
  // }

  handleSubmit(event){
    event.preventDefault();
    let searchForm = this.state;
    this.props.searchPolice(searchForm);
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  listDisplayed(){
    var initial = this.props.policeData;
    var searched = this.props.searchData;

    if (searched.length > 0) {
      return searched;
    }
    return initial;
  }

  render() {
    const { fullName, state, agency } = this.state;
    return (
      <React.Fragment>
        <form
        onSubmit={this.handleSubmit}>

        <h2>Search Officer Database</h2>

        <label
          htmlFor="fullName">
          Full Name:
        </label>

        <input
          id="fullName"
          value={fullName}
          onChange={this.handleChange} />

        <label
          htmlFor="state">
          Select State:
        </label>

        <input
          name="state"
          id="state"
          value={state}
          onChange={this.handleChange} />

        <label
          htmlFor="agency">
          Agency/Department:
        </label>

        <input
          name="agency"
          id="agency"
          value={agency}
          onChange={this.handleChange} />

        <button
          type="submit">
          Submit Search
        </button>
      </form>

      <SearchList
        initialList={this.props.policeData}/>


      </React.Fragment>
    )
  }
}

export default SearchPolice