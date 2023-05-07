import './App.css';
import Map from './components/Map';

import React, { useRef, useEffect, useState } from 'react';
import VerticalProgress from './components/VerticalProgress';

function App() {

  const [num_participants, setNumParticipantsData] = useState(1);
  const [num_meetings, setMeetingsData] = useState(1);

  const [plane_perc, setPlanePercData] = useState(50);
  const [car_perc, setCarPercData] = useState(50);
  const [train_perc, setTrainPercData] = useState(50);
  const [online_perc, setOnlinePercData] = useState(50);

  const [update_ch, setUpdateData] = useState(false);

  const [total_cost, setTotalCostData] = useState(0.0);

  const [min_cost, setMinCostData] = useState(0.0);
  const [max_cost, setMaxCostData] = useState(0.0);


  const handleParticipantsChange = (evnt) => {
    setNumParticipantsData(parseInt(evnt.target.value))
  }
  const handleMeetingsChange = (evnt) => {
    setMeetingsData(parseInt(evnt.target.value))
  }
  const handleTransportChange = (evnt, type_t) => {
    if (type_t == "p"){
      setPlanePercData(parseInt(evnt.target.value))
    }
    else if (type_t == "t") {
      setTrainPercData(parseInt(evnt.target.value))
    }
    else if (type_t == "o") {
      setOnlinePercData(parseInt(evnt.target.value))
    }
    else if (type_t == "c") {
      setCarPercData(parseInt(evnt.target.value))
    }
    console.log(plane_perc, car_perc, train_perc, online_perc)    
  }

  const handleButtonClick = (evnt) => {
    setUpdateData(true);
  }

  return (
    <div className="App">
      <div class="container">
        <div class="row mt-4 mb-4">
          <div class="col-sm-4">
          <h4 className='display-4 title'>Academic Network Sustainability Network</h4>
          </div>
          <div class="col-sm-8 ">
            <span class="align-middle">
              <h5 className='qtext '>How could we make our academic networks more sustainable?</h5></span>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-7" height="100%">
            <Map data={{ "num_participants": num_participants ,
              "num_meetings": num_meetings,
              "travel_data":{
                "plane_perc": plane_perc,
                "car_perc": car_perc,
                "train_perc": train_perc,
                "online_perc": online_perc

              }
            }} update_ch={update_ch} setUpdateData={setUpdateData} setTotalCostData={setTotalCostData}
              setMinCostData={setMinCostData}
              setMaxCostData={setMaxCostData}></Map>
            <div className="mt-5 mb-5"></div>
            <div className="mt-5 mb-5"></div>
          </div>

          <div class="col-sm-1">
            <VerticalProgress progress={total_cost} min_cost={min_cost}  max_cost={max_cost} />
            <p class="co2">{parseInt(total_cost)}</p>
            <p>Tons of CO<sub>2</sub></p>
          </div>​


          <div class="col-sm-4">
            <label for="number_participants" class="form-label">Number of Participants</label>
            <div class="row">
              <div class="col-sm-10">
                <input type="range" class="form-range" defaultValue="1" min="1" max="3" step="1" id="number_participants" onChange={handleParticipantsChange}></input></div>
              <div class="col-sm-2"><p>{num_participants}</p></div>

            </div>

            <label for="number_meetings" class="form-label">Number of Meetings</label>
            <div class="row">
              <div class="col-sm-10">
                <input type="range" class="form-range" defaultValue="1" min="1" max="2" step="1" id="number_meetings" onChange={handleMeetingsChange}></input></div>
              <div class="col-sm-2"><p>{num_meetings}</p></div>

            </div>
            <h4>Means of Transportation</h4>
            <label for="plane_perc" class="form-label">Plane Percentage</label>
            <div class="row">
              <div class="col-sm-10">
                <input type="range" class="form-range" defaultValue="50" min="0" max="100" step="10" id="plane_perc" onChange={(evnt) => handleTransportChange(evnt, "p")}></input></div>
              <div class="col-sm-2"><p>{plane_perc}%</p></div>
            </div>

            <label for="train_perc" class="form-label">Train Percentage</label>
            <div class="row">
              <div class="col-sm-10">
                <input type="range" class="form-range" defaultValue="50" min="0" max="100" step="10" id="train_perc" onChange={(evnt) => handleTransportChange(evnt, "t")}></input></div>
              <div class="col-sm-2"><p>{train_perc}%</p></div>
            </div>

            <label for="car_perc" class="form-label">Car Percentage</label>
            <div class="row">
              <div class="col-sm-10">
                <input type="range" class="form-range" defaultValue="50" min="0" max="100" step="10" id="car_perc" onChange={(evnt) => handleTransportChange(evnt, "c")}></input></div>
              <div class="col-sm-2"><p>{car_perc}%</p></div>
            </div>

            <label for="online_perc" class="form-label">Online Percentage</label>
            <div class="row">
              <div class="col-sm-10">
                <input type="range" class="form-range" defaultValue="50" min="0" max="100" step="10" id="online_perc" onChange={(evnt) => handleTransportChange(evnt, "o")}></input></div>
              <div class="col-sm-2"><p>{online_perc}%</p></div>
            </div>

            <button type="button" class="btn btn-danger" onClick={handleButtonClick}>Update the Map</button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
