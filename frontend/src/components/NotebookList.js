const React = require("react");
const ReactRedux = require("react-redux");

const createActionDispatchers = require("../helpers/createActionDispatchers");
const notebooksActionCreators = require("../reducers/notebooks");

const NewNotebook = require("./NewNotebook");

/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/

class NotebookList extends React.Component {
  constructor(props) {
    super(props);

    this.props.getNotebooks();

    this.state = { newNote: false };
  }

  render() {
    const closeEdit = () => {
      this.setState({ newNote: false });
    };

    const saveNotebook = title => {
      this.props.addNotebooks(title , err => {
        if(!err) closeEdit();
      });
    }

    const createNotebookListItem = notebook => {
      return (
        <li key={notebook.id}>
          <button
            className="btn btn-warning"
            style={{ margin: "4px" }}
            onClick={() => this.props.deleteNotebook(notebook.id)}
          >
            <i className="fa fa-remove"></i>
          </button>
          {notebook.title}
        </li>
      );
    };

    let newNotebookButton;
    if (this.state.newNote) {
      newNotebookButton = <NewNotebook onCancel={closeEdit} onSave={saveNotebook}/>;
    } else {
      newNotebookButton = (
        <button
          className="btn btn-danger"
          style={{ margin: "4px" }}
          onClick={() => this.setState({ newNote: true })}
        >
          <i className="fa fa-plus" style={{ marginRight: "4px" }} />
          New notebook
        </button>
      );
    }

    return (
      <div>
        <h2>Notebooks</h2>
        {newNotebookButton}
        <ul>{this.props.notebooks.data.map(createNotebookListItem)}</ul>
      </div>
    );
  }
}

const NotebookListContainer = ReactRedux.connect(
  state => ({
    notebooks: state.notebooks
  }),
  createActionDispatchers(notebooksActionCreators)
)(NotebookList);

module.exports = NotebookListContainer;
