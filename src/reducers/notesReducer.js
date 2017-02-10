export default function(state=[], action){
  switch (action.type) {
    case 'FETCH_NOTES':
      return action.payload
    case 'ADD_NOTE':
      return [...state, action.payload ]
    case 'UPDATE_NOTE':
      return state.map((note) => {
        if (note.id !== action.payload.id ) {
          return note
        } else {
          return action.payload
        }
      })
    case 'DELETE_NOTE':
      return state.filter((note) => {
        return note.id !== action.payload
      })
    default:
      return state
  }

}
