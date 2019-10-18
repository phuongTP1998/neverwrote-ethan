const React = require("react");
const ReactRedux = require("react-redux");

const createActionDispatchers = require("../helpers/createActionDispatchers");

class NewNotebook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ""
    };
  }

  render() {
    const revertAgainNotebook = event => {
      event.preventDefault();

      this.props.onCancel();
    };

    const onTitleChange = event => {
      this.setState({ title: event.target.value });
    };

    const submitAndStopEditing = (event) => {
        event.preventDefault();

        this.props.onSave({title: this.state.title});
    }

    return (
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Add notebook"
          value={this.state.title}
          onChange={onTitleChange}
        ></input>
        <span className="input-group-btn">
          <button className="btn btn-success" onClick={submitAndStopEditing}>
            <i className="fa fa-check" />
          </button>
          <button className="btn btn-default" onClick={revertAgainNotebook}>
            Cancel
          </button>
        </span>
      </div>
    );
  }
}

module.exports = NewNotebook;
