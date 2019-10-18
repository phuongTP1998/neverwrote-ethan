const React = require("react");
const ReactRedux = require("react-redux");

const _ = require("lodash");

const createActionDispatchers = require("../helpers/createActionDispatchers");
const notebooksActionCreators = require("../reducers/notebooks");
const notesActionCreators = require("../reducers/notes");

class Statistic extends React.Component {
  constructor(props) {
    super(props);
    this.props.getNotebooks();
    this.props.getNotes();
  }

  render() {
    function getOldestNotebook(data) {
      const last = _.maxBy(data, notebook => notebook.id);
      if (last) {
        return last.title;
      }
    }

    function getRecentlyUpdatedNote(notes) {
      const recentlyUpdatedNote = _.maxBy(notes, note => note.id);
      if(recentlyUpdatedNote) {
        return recentlyUpdatedNote.title;
      }
    }

    return (
      <div>
        <h1> Realtime Statistic </h1>
        {/* <button className="btn btn-danger" style={{ marginBottom: "10px" }}>
          <i className="fa fa-refresh" style={{ marginRight: "4px" }}>
            {" "}
          </i>
          Refresh
        </button> */}
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
              <td>{this.props.notes.data.length}</td>
            </tr>
            <tr>
              <td>notebookCount</td>
              <td>{this.props.notebooks.data.length}</td>
            </tr>
            <tr>
              <td>oldestNotebook</td>
              <td>{getOldestNotebook(this.props.notebooks.data)}</td>
            </tr>
            <tr>
              <td>recentlyUpdatedNote</td>
              <td>{getRecentlyUpdatedNote(this.props.notes.data)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const NotebookListContainer = ReactRedux.connect(
  state => ({
    notebooks: state.notebooks,
    notes: state.notes
  }),
  createActionDispatchers(notebooksActionCreators, notesActionCreators)
)(Statistic);

module.exports = NotebookListContainer;
