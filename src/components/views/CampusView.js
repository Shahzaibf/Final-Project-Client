/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import { deleteCampus } from "../../store/actions/actionCreators";

// Take in props data to construct the component
const CampusView = (props) => {
  const { campus, deleteCampus } = props;

  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <img
        src={campus.imageURL}
        alt={campus.name}
        style={{ width: 500, height: 300 }}
      ></img>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      {campus.students.length ? (
        campus.students.map((student) => {
          let name = student.firstname + " " + student.lastname;
          return (
            <div>
              <div key={student.id}>
                <Link to={`/student/${student.id}`}>
                  <h2>{name}</h2>
                </Link>
              </div>
              <hr />
            </div>
          );
        })
      ) : (
        <p>No students are currently enrolled.</p>
      )}
      <Link to={`/editcampuses/${campus.id}`}>
        <button>Edit.</button>
      </Link>
      <Link to={`./campuses`}>
        <button onClick={() => deleteCampus(campus.id)}>Delete</button>
      </Link>
    </div>
  );
};

export default CampusView;
