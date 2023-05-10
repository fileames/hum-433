import React from "react";
//import { Spring } from "react-spring";
import './VerticalProgress.css';

function get_color(perc){
    if (perc < 35){
        return "green"
    }
    if (perc < 70) {
        return "orange"
    }
    return "red"
}

function calculate_perc(progress, min_cost, max_cost){

    min_cost = 0

    var diff = max_cost - min_cost;
    var d2 = progress - min_cost;

    if(progress == 0.0){
        return 0
    }
    return parseInt(d2 * 100.0 / diff)
}

const VerticalProgress = ({ progress, min_cost, max_cost }) => {
    return (
        <div className="progress vertical">
            <div style={{ height: `${calculate_perc(progress, min_cost, max_cost)}%`, backgroundColor: `${get_color(calculate_perc(progress, min_cost, max_cost))}` }} className="progress-bar">
                <span className="sr-only">{`${calculate_perc(progress, min_cost, max_cost)}%`}</span>
            </div>
        </div>
    );
};

export default VerticalProgress;
