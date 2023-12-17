/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
const HomePageView = () => {
  // Render Home page view
  return (
    <div>
      <h1>Campus Database</h1>
      <p> Add, Delete, or edit students and campuses!</p>
      <img
        src="https://urge.org/wp-content/uploads/2021/09/college-folk.jpg"
        width="500"
      ></img>
    </div>
  );
};

export default HomePageView;
