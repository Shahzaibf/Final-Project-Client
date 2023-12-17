import Header from "./Header";
import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import NewCampusView from "../views/NewCampusView";
import { addCampusThunk } from "../../store/thunks";

class NewCampusContainer extends Component {
  //Initialize state
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      description: null,
      imageUrl: null,
      redirect: false,
      redirectId: null,
    };
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = async (event) => {
    event.preventDefault(); // Prevent browser reload/refresh after submit.

    const name = event.target.name.value;
    const address = event.target.address.value;

    if (name === "" || address === "") {
      alert("Make sure the name and address are filled.");
      return;
    }

    let campus = {
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
      imageUrl: this.state.imageUrl,
    };

    // Add new campus in back-end database
    let NewCampus = await this.props.addCampus(campus);

    // Update state, and trigger redirect to show the new campus
    this.setState({
      name: "",
      address: "",
      description: null,
      imageUrl: null,
      redirect: true,
      redirectId: NewCampus.id,
    });
  };
  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={`/campus/${this.state.redirectId}`} />;
    }
    return (
      <div>
        <Header />
        <NewCampusView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    addCampus: (campus) => dispatch(addCampusThunk(campus)),
  };
};

export default connect(null, mapDispatch)(NewCampusContainer);
