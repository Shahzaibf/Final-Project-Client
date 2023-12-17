/*==================================================
EditCampusContainer.js

================================================== */
import Header from "./Header";
import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { fetchCampusThunk, editCampusThunk } from "../../store/thunks";
import EditCampusView from "../views/EditCampusView";

class EditCampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      description: null,
      imageURL: null,
      redirect: false,
      redirectId: null,
    };
  }
  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.id);
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

    if (name.trim() !== name || address.trim() !== address) {
      alert(
        "Fill it in so that there are no blank spaces when trimming the name and address."
      );
      return;
    }

    let campus = {
      name: this.state.name === "" ? this.props.campus.name : this.state.name,
      address:
        this.state.address === ""
          ? this.props.campus.address
          : this.state.address,
      description:
        this.state.description == null
          ? this.props.campus.description
          : this.state.description,
      imageUrl:
        this.state.imageUrl === null
          ? this.props.campus.imageUrl
          : this.state.imageUrl,
      id: this.props.campus.id,
    };

    // Edit campus in back-end database
    await this.props.editCampus(campus);

    // Update state, and trigger redirect to show the new campus
    this.setState({
      name: "",
      address: "",
      description: null,
      imageUrl: null,
      redirect: true,
      redirectId: this.props.campus.id,
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
        <EditCampusView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          campus={this.props.campus}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    campus: state.campus,
  };
};

const mapDispatch = (dispatch) => {
  return {
    editCampus: (campus) => dispatch(editCampusThunk(campus)),
    fetchCampus: (campusId) => dispatch(fetchCampusThunk(campusId)),
  };
};

export default connect(mapState, mapDispatch)(EditCampusContainer);
