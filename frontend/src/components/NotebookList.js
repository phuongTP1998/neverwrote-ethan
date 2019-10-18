const React = require("react");
const ReactRedux = require("react-redux");

const createActionDispatchers = require("../helpers/createActionDispatchers");
const notebooksActionCreators = require("../reducers/notebooks");
const notesActionCreators = require("../reducers/notes");

const NewNotebook = require("./NewNotebook");
const NewNotes = require("./NewNotes");

/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/

class NotebookList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newNotebook: false,
      newNote: false,
      notebookId: -1,
      term: ""
    };

    this.searchHandler = this.searchHandler.bind(this);
  }

  searchHandler(event) {
    this.setState({ term: event.target.value });
  }

  render() {
    const closeEdit = () => {
      this.setState({ newNotebook: false });
    };

    const saveNotebook = title => {
      this.props.addNotebooks(title, err => {
        if (!err) closeEdit();
      });
    };

    const getNote = id => {
      this.setState({ newNote: true });
      this.setState({ notebookId: id });
    };

    const saveNote = data => {
      const note = {
        notebookId: this.state.notebookId,
        title: data.title,
        content: data.content
      };
      this.props.addNotes(note);
    };

    const createNotebookListItem = notebook => {
      return (
        <li key={notebook.id}>
          <button
            className="btn btn-warning"
            style={{ margin: "4px" }}
            onClick={() => {
              this.props.deleteNotebook(notebook.id);
            }}
          >
            <i className="fa fa-remove"></i>
          </button>
          <a
            onClick={() => {
              getNote(notebook.id);
              window.scrollTo(0, document.body.scrollHeight);
            }}
            style={{ cursor: "pointer" }}
          >
            {notebook.title}
          </a>
        </li>
      );
    };

    const createNoteListItem = note => {
      return (
        <li key={note.id}>
          <button
            className="btn btn-info"
            style={{ margin: "4px" }}
            onClick={() => {
              this.props.deleteNote(note.id);
            }}
          >
            <i className="fa fa-remove"></i>
          </button>
          <a>{note.title}</a>
          <span> ----{note.content}</span>
        </li>
      );
    };

    let newNotebookButton;
    if (this.state.newNotebook) {
      newNotebookButton = (
        <NewNotebook onCancel={closeEdit} onSave={saveNotebook} />
      );
    } else {
      newNotebookButton = (
        <button
          className="btn btn-danger"
          style={{ margin: "4px" }}
          onClick={() => this.setState({ newNotebook: true })}
        >
          <i className="fa fa-plus" style={{ marginRight: "4px" }} />
          New notebook
        </button>
      );
    }

    let newNoteSection;
    if (this.state.newNote) {
      newNoteSection = <NewNotes onSave={saveNote} />;
    } else {
    }

    function searchingFor(term) {
      return function(x) {
        return x.title.toLowerCase().includes(term.toLowerCase()) || !term;
      };
    }

    return (
      <div>
        <h2>Notebooks</h2>
        <form style={{marginBottom: "5px"}}>
          <label>Searching Notebook Title: </label>
          <input
            type="text"
            onChange={this.searchHandler}
            value={this.state.term}
            className="form-control"
            placeholder="Searching Title"
          />
        </form>
        <label>Adding new notebook</label>
        <br></br>
        {newNotebookButton}
        <ul>
          {this.props.notebooks.data
            .filter(searchingFor(this.state.term))
            .map(createNotebookListItem)}
        </ul>
        {newNoteSection}
        <ul>
          {this.props.notes.data
            .filter(note => note.notebookId === this.state.notebookId)
            .map(createNoteListItem)}
        </ul>
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
)(NotebookList);

module.exports = NotebookListContainer;
