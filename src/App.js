import './App.css';
import Map from './components/Map';

import React, { useRef, useEffect, useState } from 'react';
import VerticalProgress from './components/VerticalProgress';
import { participant_info, meeting_info, travel_info } from './data/info_text';
import { Tooltip } from 'react-tooltip';
import { TableauEmbed } from "@stoddabr/react-tableau-embed-live";
import plane_image from './assets/plane.PNG'
import car_image from './assets/car.PNG'
import online_image from './assets/online.PNG'
import train_image from './assets/train.PNG'



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
    if (type_t == "p") {
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
  }

  const handleButtonClick = (evnt) => {
    setUpdateData(true);
  }

  return (
    <div className="App">
      <div class="container">
        <div class="row mt-4 mb-4">
          <div class="col-sm-4">
            <h4 className='display-4 title'>Academic Network Sustainability Simulation</h4>
          </div>
          <div class="col-sm-8 ">
            <span class="align-middle">
              <h5 className='qtext '>How could we make our academic networks more sustainable?</h5></span>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-7" height="100%">
            <Map data={{
              "num_participants": num_participants,
              "num_meetings": num_meetings,
              "travel_data": {
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
            <VerticalProgress progress={total_cost} min_cost={min_cost} max_cost={max_cost} />
            <p class="co2">{parseInt(total_cost)}</p>
            <p>grams of CO<sub>2</sub></p>
          </div>


          <div class="col-sm-4">
            <h5>Enter the information for your academic network:</h5>
            <label for="number_participants" class="form-label">
              Number of Participants <span data-tooltip-id="participant_info"
                data-tooltip-content={participant_info}
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
              <div class="col-sm-2"></div>
            </div>

            <label for="train_perc" class="form-label">Train Percentage</label>
            <div class="row">
              <div class="col-sm-10">
                <input type="range" class="form-range" defaultValue="50" min="0" max="100" step="10" id="train_perc" onChange={(evnt) => handleTransportChange(evnt, "t")}></input></div>
              <div class="col-sm-2"></div>
            </div>

            <label for="car_perc" class="form-label">Car Percentage</label>
            <div class="row">
              <div class="col-sm-10">
                <input type="range" class="form-range" defaultValue="50" min="0" max="100" step="10" id="car_perc" onChange={(evnt) => handleTransportChange(evnt, "c")}></input></div>
              <div class="col-sm-2"></div>
            </div>

            <label for="online_perc" class="form-label">Online Percentage</label>
            <div class="row">
              <div class="col-sm-10">
                <input type="range" class="form-range" defaultValue="50" min="0" max="100" step="10" id="online_perc" onChange={(evnt) => handleTransportChange(evnt, "o")}></input></div>
              <div class="col-sm-2"></div>
            </div>

            <button type="button" class="btn btn-danger" onClick={handleButtonClick}>Update the Map</button>

          </div>

        </div>
        <div class="row">
          <div class="col-sm-12">
            <h5 class="title">How it works?</h5>
            <ul>
              <li><p class="mb-0  align-text">The percentage bar is an indicator of how "bad" the actual setting is compared to all the possible settings available to your choice.</p></li>
              <li><p class="mb-0  align-text">The means of transportation bars are proportional to each other (e.g. if all set to same level it will be 25% each). If all are zero, no one is participating in any of the meetings. If any of the levels are 0, weight is distributed among others.</p></li>
              <li><p class="mb-0  align-text">When you click "Update the map," the distribution of means of transportation among the participants will be randomized. As a result, it is possible to obtain variable results even with the same settings.</p></li>
            </ul>
            <p><img src={plane_image} width="30vh" />: Travel by plane <img src={train_image} width="30vh" />: Travel by train <img src={car_image} width="30vh" />: Travel by car <img src={online_image} width="30vh" />: Attend meeting virtually</p>
          </div>
          <div class="spacer5"></div>
        </div>
        <div class="row">
          <h5 class="title">What are the numbers?</h5>
          <div class="col-sm-12">
            <p class="mb-0  align-text">Our simulation and infographic are based on<a href="https://www.mobitool.ch/fr/info/facteurs-mobitool-29.html">Mobitool website </a> data. Only European meetings have been considered for the purposes of the tool.</p>
            <p class="mb-0  align-text"></p>
            <div class="spacer5"></div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="alert alert-success" role="alert">
              <h4 class="alert-heading">Variables considered </h4>
              <p class="mb-0"><b>Direct Emissions:</b>Impacts resulting from the emission of substances via the exhaust system of the vehicle.</p>
              <p class="mb-0"><b>Energy Production Emissions:</b> Impacts resulting from the production and supply of energy to the vehicle. This refers to diesel, gasoline and compressed gas for vehicles with an internal combustion engine, and hydrogen and electricity for electric vehicles.</p>
              <p class="mb-0"><b>Maintenance:</b> Impacts resulting from the periodical maintenance of the vehicle (e.g., oil and tires change).</p>
              <p class="mb-0"><b>Manufacturing:</b> Impacts resulting from the manufacture of the vehicle, including its energy storage components.</p>
              <p class="mb-0"><b>End of Life:</b> Impacts resulting from the disassembly of the vehicle at the end of its life and treatment of the different waste fractions, including the energy storage components. Does not include credits for recycling. If recycling takes place, the aspect is taken into account via the share of primary and secondary raw materials in the production of the vehicle.</p>
              <p class="mb-0"><b>Infrastructure Emissions:</b> Emissions produced during the construction, maintenance, and operation of the infrastructure required to support the transportation method.</p>
            </div>
            <p class="mb-0  align-text">You can find interactive packed bubble chart and tree map visualizations of CO<sub>2</sub>:</p>
          </div>
          <div class="col-sm-12">
            <TableauEmbed sourceUrl="https://public.tableau.com/views/mobitool_data/Dashboard1?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link" />
          </div>
            <div class="spacer5"></div>
          <p class="mb-0  align-text">Among various modes of transportation, <b>airplanes incur the highest environmental costs</b>, followed by cars, and finally trains, with direct emissions and energy production emissions being the primary contributing factors.</p>
          <p class="mb-0  align-text">When it comes to online meetings, the environmental costs are relatively lower. However, it is important to consider other factors such as participant interaction and limitations on activities that can be carried out through this method.</p>
        </div>
      </div>

        <div class="spacer5"></div>
        <div class="row">
          <div class="col-sm-12">
            <h5 class="title">Did you know?</h5>
            <ul>
              <li><p class="mb-0  align-text">The Intergovernmental Panel on Climate Change (IPCC) estimates that each additional ton of CO2 emissions will lead to a global average temperature increase of about 0.0000000000015 to 0.00000000003 degrees Celsius per year.</p></li>
              <li><p class="mb-0  align-text" >An option to reduce environmental costs is to make small meetings among members of the network that are nearby.</p> </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
        2023:  Created for <a class="text-reset fw-bold" href="https://edu.epfl.ch/coursebook/en/how-people-learn-designing-learning-tools-ii-HUM-433">How People Learn Course, EPFL </a>
        <br/>
        Created by: Yasmin El Euch, <a class="text-reset fw-bold"  href="https://www.linkedin.com/in/elif-sema-balc%C4%B1o%C4%9Flu-70a712146/">Elif Sema Balcioglu</a>, Davide Romano, Oliver Pineda Suarez
        <br />
        With the help of: <a class="text-reset fw-bold" href="https://people.epfl.ch/julian.shillcock?lang=en">Julian Charles Shillcock</a>

      </div>
    </div>
  );
}

export default App;
