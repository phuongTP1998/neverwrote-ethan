const React = require("react");
const ReactRedux = require("react-redux");

const createActionDispatchers = require("../helpers/createActionDispatchers");
const notebooksActionCreators = require("../reducers/notebooks");

class Statistic extends React.Component {
  constructor(props) {
    super(props);
    console.log("Statistic");
  }

  render() {
    return (
      <div>
        <h1> Statistic </h1>
        <button className="btn btn-danger" style={{ marginBottom: "10px" }}>
          <i className="fa fa-refresh" style={{ marginRight: "4px" }}>
            {" "}
          </i>
          Refresh
        </button>
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th style={{ width: "200px" }} scope="col">
                Name
              </th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>noteCount</td>
              <td>{}</td>
            </tr>
            <tr>
              <td>notebookCount</td>
              <td>{}</td>
            </tr>
            <tr>
              <td>oldestNotebook</td>
              <td>{}</td>
            </tr>
            <tr>
              <td>recentlyUpdatedNote</td>
              <td>{}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

// const NotebookListContainer = ReactRedux.connect(
//   state => ({
//     notebooks: state.notebooks
//   }),
//   createActionDispatchers(notebooksActionCreators)
// )(NotebookList);

module.exports = Statistic;
