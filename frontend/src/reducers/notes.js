const _ = require("lodash");
const api = require("../helpers/api");

const GET_NOTE = "neverwrote-ethan/notes/GET_NOTE";
const INSERT_NOTE = "neverwrote-ethan/notes/INSERT";
const CHANGE = "neverwrote-ethan/notes/CHANGE";
const REMOVE = "neverwrote-ethan/notes/REMOVE";

const initialState = {
  data: []
};

function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch (action.type) {
    case GET_NOTE: {
      const unsortedNotes = _.concat(state.data, action.notes);
      console.log(action.notes);

      const data = _.orderBy(unsortedNotes, "createdAt", "desc");

      return _.assign({}, state, { data });
    }

    case INSERT_NOTE: {
      const unsortedNotes = _.concat(state.data, action.note);

      const data = _.orderBy(unsortedNotes, "createdAt", "desc");

      return _.assign({}, state, { data });
    }

    case CHANGE: {
    }

    case REMOVE: {
      const data = _.reject(state.data, { id: action.id });

      return _.assign({}, state, { data });
    }

    default:
      return state;
  }
}

// Action creators
/* *** TODO: Put action creators here *** */
reducer.insertNotes = note => {
  return { type: INSERT_NOTE, note };
};

reducer.removeNotes = id => {
  return { type: REMOVE, id };
};

reducer.changeNotes = notes => {
  return { type: CHANGE, notes };
};

reducer.loadNotes = notes => {
  return { type: GET_NOTE, notes };
};

reducer.getNotes = () => {
  return dispatch => {
    api
      .get("/notes")
      .then(notes => {
        dispatch(reducer.loadNotes(notes));
      })
      .catch(() => {
        alert("Failed to get notes from api!");
      });
  };
};

reducer.deleteNote = id => {
  return dispatch => {
    api
      .delete("/notes/" + id)
      .then(dispatch(reducer.removeNotes(id)))
      .catch(() => {
        alert("Failed to delete note!");
      });
  };
};

reducer.addNotes = (note) => {
  return dispatch => {
    api
      .post("/notes", note)
      .then(note => {
        dispatch(reducer.insertNotes([note]));
      })
      .catch(() => {
        alert("Failed to add new note!");
      });
  };
};

module.exports = reducer;
