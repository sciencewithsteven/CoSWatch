import React from 'react';
import NewlyAdded from './NewlyAdded.js';

class AddPoliceForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      fullName: '',
      state: '',
      agency: '',
      link: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleVerify = this.handleVerify.bind(this);
    this.trigger = this.trigger.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    let policeForm = this.state;

    this.props.addPolice(policeForm);
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  handleVerify(event){
    const { fullName, state, agency, link } = this.state;
    if (fullName.length > 0) {
      if (state.length > 0) {
        if (agency.length > 0) {
          this.handleSubmit(event);
        }
      }
    }
  }
trigger() {
  if (this.props.trigger) {
    return true;
  }
  return false;
}

  render(){
    const { fullName, state, agency, link } = this.state;
    return (
      <React.Fragment>

        <form
          onSubmit={this.handleVerify}>

          <h2>Officer Submission Form</h2>

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

          <label
            htmlFor="link">
            (Optional) Links Of Misconduct:
          </label>

          <input
            name="link"
            id="linkss"
            value={link}
            onChange={this.handleChange} />

          <button
            type="submit">
            Submit Officer
          </button>
        </form>

        <NewlyAdded
          newlyAdded={this.props.initialData}/>

      </React.Fragment>
    )
  }
}
  //   {
  //   (this.trigger())
  //   ? <NewlyAdded
  //   newlyAdded={this.props.policeData}/>
  //   : <NewlyAdded
  //       newlyAdded={this.props.searchData}/>
  // }

export default AddPoliceForm;