import './App.css';
import Map from './components/Map';

import React, { useRef, useEffect, useState } from 'react';
import VerticalProgress from './components/VerticalProgress';

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
            <label for="number_participants" class="form-label">Number of Participants</label>
            <div class="row">
              <div class="col-sm-10">
                <input type="range" class="form-range" defaultValue="5" min="5" max="50" step="5" id="number_participants" onChange={handleParticipantsChange}></input></div>
              <div class="col-sm-2"><p>{num_participants}</p></div>

            </div>

            <label for="number_meetings" class="form-label">Number of Meetings</label>
            <div class="row">
              <div class="col-sm-10">
                <input type="range" class="form-range" defaultValue="1" min="1" max="6" step="1" id="number_meetings" onChange={handleMeetingsChange}></input></div>
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
          <table>
            <tr>
                <td></td>
                <td></td>
                <td>Direct</td>
                <td>Direct (non exhaustive)</td>
                <td>Energy chain</td>
                <td>Maintenance</td>
                <td>Vehicle</td>
                <td>End Of Life</td>
                <td>TOTAL</td>
                <td></td>
            </tr>
            <tr>
                <td>Transportation</td>
                <td>Other</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>Airplane (within Europe average)</td>
                <td></td>
                <td>447.2</td>
                <td>0.0</td>
                <td>66.8</td>
                <td>0.0</td>
                <td>0.7</td>
                <td>0.0</td>
                <td>11.3</td>
                <td>319.2</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>Train average Germany</td>
                <td></td>
                <td>5.9</td>
                <td>0.0</td>
                <td>29.7</td>
                <td>0.6</td>
                <td>0.7</td>
                <td>0.0</td>
                <td>3.9</td>
                <td>40.8</td>
            </tr>
            <tr>
                <td>Train average France</td>
                <td></td>
                <td>3.3</td>
                <td>0.0</td>
                <td>4.8</td>
                <td>0.5</td>
                <td>0.6</td>
                <td>0.0</td>
                <td>3.3</td>
                <td>12.5</td>
            </tr>
            <tr>
                <td>Train average Italy</td>
                <td></td>
                <td>3.3</td>
                <td>0.0</td>
                <td>66.6</td>
                <td>0.5</td>
                <td>0.6</td>
                <td>0.0</td>
                <td>3.8</td>
                <td>74.7</td>
            </tr>
            <tr>
                <td>Train average Austria</td>
                <td></td>
                <td>5.0</td>
                <td>0.0</td>
                <td>3.3</td>
                <td>0.8</td>
                <td>1.0</td>
                <td>0.0</td>
                <td>5.1</td>
                <td>15.1</td>
            </tr>
            <tr>
                <td>Train average Switzerland</td>
                <td></td>
                <td>0.1</td>
                <td>0.0</td>
                <td>0.8</td>
                <td>0.6</td>
                <td>0.8</td>
                <td>0.0</td>
                <td>4.8</td>
                <td>7</td>
            </tr>
            <tr>
                <td>Train (average Europe)</td>
                <td></td>
                <td>3.497999016</td>
                <td>0</td>
                <td>21.04606079</td>
                <td>0.594832076</td>
                <td>0.749280067</td>
                <td>0</td>
                <td>4.149162048</td>
                <td>30.02</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>Diesel</td>
                <td>fleet average</td>
                <td>112.8</td>
                <td>2.6</td>
                <td>24.5</td>
                <td>4.9</td>
                <td>27.9</td>
                <td>4.2</td>
                <td>12.2</td>
                <td>189.0</td>
            </tr>
            <tr>
                <td>Gasoline</td>
                <td>fleet average</td>
                <td>110.3</td>
                <td>2.6</td>
                <td>30.2</td>
                <td>4.2</td>
                <td>23.4</td>
                <td>4.2</td>
                <td>11.2</td>
                <td>210.6</td>
            </tr>
            <tr>
                <td>Hybrid diesel</td>
                <td>fleet average</td>
                <td>75.5</td>
                <td>1.7</td>
                <td>25.3</td>
                <td>3.2</td>
                <td>17.3</td>
                <td>2.8</td>
                <td>9.2</td>
                <td>139.6</td>
            </tr>
            <tr>
                <td>Hybrid gasoline</td>
                <td>fleet average</td>
                <td>99.5</td>
                <td>2.3</td>
                <td>26.7</td>
                <td>4.1</td>
                <td>22.9</td>
                <td>3.7</td>
                <td>10.8</td>
                <td>160.9</td>
            </tr>
            <tr>
                <td>Average car</td>
                <td></td>
                <td>99.5</td>
                <td>2.3</td>
                <td>26.7</td>
                <td>4.1</td>
                <td>22.9</td>
                <td>3.7</td>
                <td>10.8</td>
                <td>175.0</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>Videoconference</td>
                <td></td>
                <td>0.0</td>
                <td>0.0</td>
                <td>9.6</td>
                <td>0.0</td>
                <td>55.8</td>
                <td>0.0</td>
                <td>24.3</td>
                <td>89.8</td>
            </tr>
            <tr>
                <td>Work online at home (1h)</td>
                <td> </td>
                <td>0.0</td>
                <td>0.0</td>
                <td>44.7</td>
                <td>0.0</td>
                <td>446.4</td>
                <td>0.0</td>
                <td>36.0</td>
                <td>527.1</td>
            </tr>
            <tr>
                <td>Average work online at home (1h)</td>
                <td></td>
                <td>0.0</td>
                <td>0.0</td>
                <td>27.2</td>
                <td>0.0</td>
                <td>251.1</td>
                <td>0.0</td>
                <td>30.2</td>
                <td>308.4</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
