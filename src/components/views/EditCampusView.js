import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  formContainer: {
    width: "500px",
    backgroundColor: "#d8d8dc",
    borderRadius: "3px",
    margin: "auto",
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
    textDecoration: "none",
  },
  customizeAppBar: {
    backgroundColor: "#282c51",
    shadows: ["none"],
  },
  formTitle: {
    backgroundColor: "#b1b4c0",
    marginBottom: "15px",
    textAlign: "center",
    borderRadius: "5px 5px 0px 0px",
    padding: "3px",
  },
}));

const EditCampusView = (props) => {
  const { handleChange, handleSubmit, campus } = props;
  const classes = useStyles();
  return (
    <div>
      <h1>Edit Campus </h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography
              style={{
                fontWeight: "bold",
                fontFamily: "Courier, sans-serif",
                fontSize: "20px",
                color: "#11153e",
              }}
            >
              {campus.name}
            </Typography>
          </div>
          <form
            style={{ textAlign: "center" }}
            onSubmit={(e) => handleSubmit(e)}
          >
            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              Campus Name:{" "}
            </label>
            <input
              type="text"
              name="name"
              placeholder={campus.name}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <br />

            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              Campus Address:{" "}
            </label>
            <input
              type="text"
              name="address"
              placeholder={campus.address}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <br />

            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              Campus Description:{" "}
            </label>
            <input
              type="text"
              name="description"
              placeholder={campus.description}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <br />

            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              Image URL:{" "}
            </label>
            <input
              type="text"
              name="imageUrl"
              placeholder={campus.imageUrl}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <br />

            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <br />
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCampusView;
