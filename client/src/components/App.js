import React from 'react';
import axios from 'axios';
import AddPoliceForm from './AddPoliceForm.js';
import SearchPolice from './SearchPolice.js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'search',
      policeData: [],
      searchResults: [],
      newlyAddedTrigger: false,
      newlyAdded: []
    };
    this.addPolice = this.addPolice.bind(this);
    this.pageView = this.pageView.bind(this);
    this.searchPolice = this.searchPolice.bind(this);
  }

  pageView(page) {
    this.setState({
      view: page
    });
  }

  componentDidMount() {
    this.initialData();
  }

  initialData() {
    axios.get('/police')
    .then(initialData => {
      console.log(`Initial Data: `, initialData);
      this.setState({policeData: initialData.data});
    })
    .catch(error => console.error(error))
  }

  addPolice(info) {
    console.log(`Add Police Info: `, info);
    let newlyAddedArray = this.state.policeData;
    newlyAddedArray.push(info)
    // this.setState({newlyAddedTrigger: true})
    this.setState({policeData: newlyAddedArray})

    axios.post('/addPolice', info)
    .then(data => console.log(`${info.name} has been added to database`))
    .catch(error => console.error(error))
  }

  addPoliceReview(review) {
    axios.post('/addReview', review)
    .then(data => console.log(`Thank you for your input`))
    .catch(error => console.error(error))
  }

  searchPolice(searchInfo) {
    console.log(`SearchInfo: `, searchInfo);


    axios('/search', {params: searchInfo})
    .then(policeSearch => {
      // console.log(`Searching: `, policeSearch.data)
      // var policeArray = this.state.policeData;
      // for (var i = 0; i < policeSearch.data.length; i++) {
      //   policeArray.push(policeSearch[i])
      // }
      this.setState({policeData: policeSearch.data});
    })
    .catch(error => console.error(error))
  }

  render () {
    const {policeData, searchData, newlyAdded, newlyAddedTrigger} = this.state
    return (
      <React.Fragment>
      <div className="nav">
        <h1 className="logo">Angry Orchard</h1>
        <span className={this.state.view === 'search'
          ? 'nav-selected'
          : 'nav-unselected'}
          onClick={() => this.pageView('search')}>
          Add Officer
        </span>
        <span className={this.state.view === 'addOfficer'
          ? 'nav-selected'
          : 'nav-unselected'}
          onClick={() => this.pageView('addOfficer')}>
          Search
        </span>

      </div>
      <div className="main">
        {this.state.view === 'search'
          ? <AddPoliceForm
            addPolice={this.addPolice}
            newlyAdded={newlyAdded}
            initialData={policeData}
            trigger={newlyAddedTrigger}/>
          : <SearchPolice
              policeData={policeData}
              searchData={searchData}
              searchPolice={this.searchPolice} />}
      </div>
      </React.Fragment>
    )
  }
}


export default App;