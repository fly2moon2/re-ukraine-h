import reducer from "./reducer";
import {useState, useReducer, Fragment} from 'react';
import {FaArrowRight,FaArrowLeft} from "react-icons/fa";

// webpack 5 deprecated named export approach, only supports default exxport approach for json file
// compile error "Should not import the named export..."
// https://community.developer.atlassian.com/t/error-should-not-import-the-named-export-in-editor-core/54982/5
// i. named export de-supported:
// import {bookables} from "../../static.json";
// ii. default export (in 2 lines) is the only approach supported
import datafile from "../../static.json";
const { bookables, sessions, days } = datafile;



const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  hasDetails: true,
  bookables
};







export default function BookablersList () {
  // 0207 - multiple levels of useState for group, then filter for bookableIndex

  // 0302 alternative w/ destructured states 
  const [{group, bookableIndex, bookables, hasDetails}, dispatch] = useReducer(reducer, initialState);
  // const [state, dispatch] = useReducer(reducer, initialState);
  //const {group, bookableIndex, bookables, hasDetails} = state;


  //const [group, setGroup] = useState("Kit");
  //const group = "Rooms";
  const bookablesInGroup = bookables.filter(b => b.group === group);

  // w/o managing the state, the click event won't work
  // useState - setBookableIndex as the update function when clicked
  //const [bookableIndex, setBookableIndex] = useState(0);
  // 0207 - assigns an array of unique groupname to groups variable
  const groups = [...new Set(bookables.map(b=>b.group))];  

  const bookable = bookablesInGroup[bookableIndex];
  //const [hasDetails, setHasDetails] = useState(false);

  function changeGroup (e) {
    dispatch({
      type: "SET_GROUP",
      payload: e.target.value
    });
  }

  function changeBookable (selectedIndex) {
    dispatch({
      type: "SET_BOOKABLE",
      payload: selectedIndex
    });
  }


  function toggleDetails () {
    dispatch({type: "TOGGLE_HAS_DETAILS"});
  }

  function nextBookable () {
    dispatch({type: "NEXT_BOOKABLE"});
    //setBookableIndex(i => (i + 1) % bookablesInGroup.length);
  }
  function prevBookable () {
    dispatch({type: "PREV_BOOKABLE"});
    // rotate back to the last item after reaching the first item
    //setBookableIndex(i => i<=0 ? bookablesInGroup.length-1: (i - 1) % bookablesInGroup.length);
    //setBookableIndex(i => (i - 1) % bookablesInGroup.length);
  }

/*   let bookableIndex = 1;
  function changeBookable (selectedIndex) {
    bookableIndex = selectedIndex;
    console.log(selectedIndex);
  }
 */
  return (
    <Fragment>
    <div>
    {/* 0207 - list unique groups   */}
    <select value={group} onChange={changeGroup}>
      {groups.map(g=><option value={g} key={g}>{g}</option>)}
    </select>
    <ul className="bookables items-list-nav">
      {bookablesInGroup.map((b, i) => (
        <li
          key={b.id}
          className={i === bookableIndex ? "selected" : null}
        >
          <button
            className="btn"
            onClick={() => changeBookable(i)}
          >
            {b.title}
          </button>
{/*           <button
            className="btn"
            onClick={() => changeBookable(i)}
          >
            {b.title}
          </button> */}
        </li>
      ))}
    </ul>
    <p>
        <button
          className="btn"
          onClick={prevBookable}
          autoFocus
        >
          <FaArrowLeft/>
          <span>Previous</span>
        </button>
      </p>
    <p>
        <button
          className="btn"
          onClick={nextBookable}
          autoFocus
        >
          <FaArrowRight/>
          <span>Next</span>
        </button>
      </p>
    </div>

    {bookable && (
      <div className="bookable-details">
        <div className="item">
          <div className="item-header">
            <h2>
              {bookable.title}
            </h2>
            <span className="controls">
              <label>
                <input
                  type="checkbox"
                  checked={hasDetails}
                  onChange={toggleDetails}
                />
                Show Details
              </label>
            </span>
          </div>

          <p>{bookable.notes}</p>

          {hasDetails && (
            <div className="item-details">
              <h3>Availability</h3>
              <div className="bookable-availability">
                <ul>
                  {bookable.days
                    .sort()
                    .map(d => <li key={d}>{days[d]}</li>)
                  }
                </ul>
                <ul>
                  {bookable.sessions
                    .map(s => <li key={s}>{sessions[s]}</li>)
                  }
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    )}
    </Fragment>
  );
}