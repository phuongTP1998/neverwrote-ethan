const React = require("react");
const ReactRedux = require("react-redux");

const createActionDispatchers = require("../helpers/createActionDispatchers");

class NewNotes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      content: "",
      addNote: false
    };
  }

  render() {
    const onTitleChange = event => {
      this.setState({ title: event.target.value });
    };

    const submitNoteAndStop = event => {
      event.preventDefault();

      this.props.onSave({
        title: this.state.title,
        content: this.state.content
      });
      this.setState({ addNote: false });
    };

    const onContentChange = event => {
      this.setState({ content: event.target.value });
    };

    let newNote;
    if (this.state.addNote) {
      newNote = (
        <div className="form-group" style={{ marginTop: "5px" }}>
          <h4>Note title</h4>
          <input
            type="text"
            className="form-control"
            placeholder="Note title..."
            value={this.state.title}
            onChange={onTitleChange}
          ></input>
          <h4>Note content</h4>
          <textarea
            className="form-control"
            placeholder="content"
            rows="5"
            value={this.state.content}
            onChange={onContentChange}
          ></textarea>
          <h4> </h4>
          <span className="form-group-btn">
            <button className="btn btn-success" onClick={submitNoteAndStop}>
              <i className="fa fa-check" />
              Submit
            </button>
            <button
              className="btn btn-default"
              onClick={() => this.setState({ addNote: false })}
            >
              Cancel
            </button>
          </span>
        </div>
      );
    } else {
      newNote = (
        <button
          className="btn btn-danger"
          onClick={() => {
            this.setState({ addNote: true });
          }}
        >
          <i className="fa fa-plus" style={{ marginRight: "5px" }} />
          New note
        </button>
      );
    }

    return (
      <div>
        <h2>Notes</h2>
        {newNote}
      </div>
    );
  }
}

module.exports = NewNotes;
