export default function reducer (state, action) {
    switch (action.type) {
      case "SET_GROUP": return { /* unchanged */ }
      case "SET_BOOKABLE": return { /* unchanged */ }
      case "TOGGLE_HAS_DETAILS": return { /* unchanged */ }
      case "NEXT_BOOKABLE": return { /* unchanged */ }
   
      case "FETCH_BOOKABLES_REQUEST":
        return {
          ...state,
          isLoading: true,
          error: false,
          bookables: []
        };
   
      case "FETCH_BOOKABLES_SUCCESS":
        return {
          ...state,
          isLoading: false,
          bookables: action.payload
        };
   
      case "FETCH_BOOKABLES_ERROR":
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };
   
      default:
        return state;
    }
  }