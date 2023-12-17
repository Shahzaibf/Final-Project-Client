import Header from "./Header";
import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { fetchStudentThunk, editStudentThunk } from "../../store/thunks";
import EditStudentView from "../views/EditStudentView";

class EditStudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      firstname: "",
      lastname: "",
      email: "",
      imageUrl: null,
      gpa: null,
      campusId: null,
      redirect: false,
      redirectId: null,
    };
  }
  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.id);
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = async (event) => {
    event.preventDefault(); // Prevent browser reload/refresh after submit

    let student = {
      id: this.props.student.id,
      firstname:
        this.state.firstname === ""
          ? this.props.student.firstname
          : this.state.firstname,
      lastname:
        this.state.lastname === ""
          ? this.props.student.lastname
          : this.state.lastname,
      email:
        this.state.email === "" ? this.props.student.email : this.state.email,
      imageUrl:
        this.state.imageUrl == null
          ? this.props.student.imageUrl
          : this.state.imageUrl,
      gpa: this.state.gpa == null ? this.props.student.gpa : this.state.gpa,
      campusId:
        this.state.campusId === null
          ? this.props.student.campusId
          : this.state.campusId,
    };

    // Edit student in back-end database
    console.log(student);
    await this.props.editStudent(student);

    // Update state, and trigger redirect to show new student
    this.setState({
      firstname: "",
      lastname: "",
      email: "",
      imageUrl: null,
      gpa: null,
      campusId: null,
      redirect: true,
      redirectId: this.props.student.id,
    });
  };
  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={`/student/${this.state.redirectId}`} />;
    }
    return (
      <div>
        <Header />
        <EditStudentView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          student={this.props.student}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    student: state.student,
  };
};

const mapDispatch = (dispatch) => {
  return {
    editStudent: (student) => dispatch(editStudentThunk(student)),
    fetchStudent: (studentId) => dispatch(fetchStudentThunk(studentId)),
  };
};

export default connect(mapState, mapDispatch)(EditStudentContainer);
