import './App.css';
import Map from './components/Map';

import React, { useRef, useEffect, useState } from 'react';
import VerticalProgress from './components/VerticalProgress';
import { participant_info, meeting_info, travel_info } from './data/info_text';
import { Tooltip } from 'react-tooltip';



/*<!--
        <div class="row">
          <div class="col-sm-12">
            <span class="align-middle">
              <h6 className='qtext '>An option to reduce environmental costs is make small meeting among members of the network that are nearby.</h6></span>
          </div>
          <div class="col-sm-12">
            <span class="align-middle">
              <h6 className='qtext '>The average annual carbon footprint per person in some countries is estimated to be a few tons of CO2. This includes emissions from transportation, energy consumption, food production, and other lifestyle factors.</h6></span>
          </div>
          <div class="col-sm-12">
            <span class="align-middle">
              <h6 className='qtext '>The comparison between The Intergovernmental Panel on Climate Change (IPCC) estimates that each additional ton of CO2 emissions will lead to a global average temperature increase of about 0.0000000000015 to 0.00000000003 degrees Celsius per year. </h6></span>
          </div>
          
        </div>
        --> */

function App() {

  const [num_participants, setNumParticipantsData] = useState(5);
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
            <label for="number_participants" class="form-label">
              Number of Participants <span data-tooltip-id="participant_info"
                data-tooltip-content = {participant_info}
                data-tooltip-place="top" > 🛈 </span>
              <Tooltip id="participant_info" />
            
            </label>
            <div class="row">
              <div class="col-sm-10">
                <input type="range" class="form-range" defaultValue="5" min="5" max="50" step="5" id="number_participants" onChange={handleParticipantsChange}></input></div>
              <div class="col-sm-2"><p>{num_participants}</p></div>

            </div>

            <label for="number_meetings" class="form-label">Number of Meetings <span data-tooltip-id="meeting_info"
              data-tooltip-content={meeting_info}
              data-tooltip-place="top" > 🛈 </span>
              <Tooltip id="meeting_info" /></label>
            <div class="row">
              <div class="col-sm-10">
                <input type="range" class="form-range" defaultValue="1" min="1" max="6" step="1" id="number_meetings" onChange={handleMeetingsChange}></input></div>
              <div class="col-sm-2"><p>{num_meetings}</p></div>

            </div>
            <p> <b>Means of Transportation</b> <span data-tooltip-id="travel_info"
              data-tooltip-content={travel_info}
              data-tooltip-place="top" > 🛈 </span>
              <Tooltip id="travel_info" /></p>


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
        <h3 class="title">How did we estimate the costs?</h3>
        <p>Some explanation</p>

        <div class="row">
          <div class="col-sm-6">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Direct</th>
                  <th scope="col">Direct (non exhaustive)</th>
                  <th scope="col">Energy Chain</th>
                  <th scope="col">Maintenance</th>
                  <th scope="col">Vehicle</th>
                  <th scope="col">End of Life</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Airplane</th>
                  <td >447,2</td>
                  <td >0</td>
                  <td >66.8</td>
                  <td >0</td>
                  <td >0.7</td>
                  <td >0</td>
                  <td >11.3</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="col-sm-6">
            <div class="alert alert-success" role="alert">
              <h4 class="alert-heading">Airplane </h4>
              <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
                <p class="mb-0">some explanation on airplane</p>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-6">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Direct</th>
                  <th scope="col">Direct (non exhaustive)</th>
                  <th scope="col">Energy Chain</th>
                  <th scope="col">Maintenance</th>
                  <th scope="col">Vehicle</th>
                  <th scope="col">End of Life</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Train average Germany</th>
                  <td >5.9</td>
                  <td >0</td>
                  <td >29.7</td>
                  <td >0.6</td>
                  <td >0.7</td>
                  <td >0</td>
                  <td >3.9</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="col-sm-6">
            
            <div class="card border-warning mb-3" >
              <div class="card-header">Train</div>
              <div class="card-body ">
                <h5 class="card-title">some explanation on airplane</h5>
                <p class="card-text">Some explanation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
