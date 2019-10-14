const _ = require("lodash");
const api = require("../helpers/api");

// Action type constants
/* *** TODO: Put action constants here *** */
const GET_NOTE = "neverwrote-ethan/notebooks/GET_NOTE";
const INSERT = "neverwrote-ethan/notebooks/INSERT";
const CHANGE = "neverwrote-ethan/notebooks/CHANGE";
const REMOVE = "neverwrote-ethan/notebooks/REMOVE";

const initialState = {
  data: []
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch (action.type) {
    case GET_NOTE: {
      const unsortedNotebooks = _.concat(state.data, action.notebooks);

      const data = _.orderBy(unsortedNotebooks, "createdAt", "desc");

      return _.assign({}, state, { data });
    }

    case INSERT: {
      const unsortedNotebooks = _.concat(state.data, action.notebook);

      const data = _.orderBy(unsortedNotebooks, "createdAt", "desc");

      return _.assign({}, state, { data });
    }

    case CHANGE: {

    }

    case REMOVE: {
      const data = _.reject(state.data, { id: action.id });

      return _.assign({}, state, {data})
    }

    default:
      return state;
  }
}

// Action creators
/* *** TODO: Put action creators here *** */
reducer.insertNotebooks = notebook => {
  return { type: INSERT, notebook };
};

reducer.removeNotebooks = id => {
  return { type: REMOVE, id };
};

reducer.changeNotebooks = notebooks => {
  return { type: CHANGE, notebooks };
};

reducer.loadNotebooks = notebooks => {
  return { type: GET_NOTE, notebooks };
};

reducer.getNotebooks = () => {
  return dispatch => {
    api
      .get("/notebooks")
      .then(notebooks => {
        //console.log(notebooks)
        dispatch(reducer.loadNotebooks(notebooks));
      })
      .catch(() => {
        alert("Failed to get notebooks from api!");
      });
  };
};

reducer.deleteNotebook = (id) => {
  return dispatch => {
    api.delete("/notebooks/" + id)
    .then(dispatch(reducer.removeNotebooks(id)))
    .catch(() => {
      alert("Failed to delete notebook!");
    })
  }
}

reducer.addNotebooks = (title, callback) => {
  return dispatch => {
    api.post("/notebooks", title)
      .then(notebook => {
          dispatch(reducer.insertNotebooks([notebook]))
          callback();
      }).catch(() => {
        alert(
          "Failed to add new note!"
        )
      })
  }
}

// Export the action creators and reducer
module.exports = reducer;
