import {useState, Fragment} from 'react';

// webpack 5 deprecated named export approach, only supports default exxport approach for json file
// compile error "Should not import the named export..."
// https://community.developer.atlassian.com/t/error-should-not-import-the-named-export-in-editor-core/54982/5
// i. named export de-supported:
// import {bookables} from "../../static.json";
// ii. default export (in 2 lines) is the only approach supported
import datafile from "../../static.json";
const { avengers, films } = datafile;

export default function AvengersList () {
  const [gender, setGender] = useState("Female");
  const avengersInGender = avengers.filter(a=>a.gender===gender);

  // w/o managing the state, the click event won't work
  // useState - setBookableIndex as the update function when clicked
  const [avengersIndex, setAvengersIndex] = useState(1);
  const genders = [...new Set(avengers.map(a=>a.gender))]; 

  const avenger = avengersInGender[avengersIndex];
  const [hasDetails, setHasDetails] = useState(false);

  function changeGender (event) {
    setGender(event.target.value);
    setAvengersIndex(0);
  }

  return (
    <Fragment>
    <div>
       <select value={gender} onChange={changeGender}>
      {/* <select value={gender} onChange={(e)=>setGender(e.target.value)}> */}
        {genders.map(g=><option value={g} key={g}>{g}</option>)}
      </select>
      <ul className="bookables items-list-nav">
        {avengersInGender.map((a, i) => (
          <li
            key={a.id}
            className={i === avengersIndex ? "selected" : null}
          >
            <button
              className="btn"
              onClick={() => setAvengersIndex(i)}
            >
            {a.title}
            </button>

          </li>
        ))}
      </ul>
    </div>
    {avenger && (
      <div className="bookable-details">
        <div className="item">
          <div className="item-header">
            <h2>
              {avenger.title}
            </h2>
            <span className="controls">
              <label>
                <input
                  type="checkbox"
                  checked={hasDetails}
                  onChange={() => setHasDetails(has => !has)}
                />
                Show Details
              </label>
            </span>
          </div>



          {hasDetails && (
            <div className="item-details">
              <h3>Availability</h3>
              <div className="bookable-availability">
                <ul>  
                  {avenger.films
                    .sort()
                    .map(f => <li key={f}>{films[f]}</li>)
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