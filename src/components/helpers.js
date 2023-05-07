import hardcoded_values from '../data/hardcoded_values.js'
import costs from '../data/costs.js'

export const ONLINE_HOUR = 8;

export function calculate_min_max(num_participants, num_meetings) {

    var total_cost_max = 0.0
    var total_cost_min = 0.0

    for (var i = 0; i < hardcoded_values["part"].length; i++) {
        for (var j = 0; j < hardcoded_values["meet"].length; j++) {

            if ((i < num_participants) && (j < num_meetings)) {
                total_cost_max += costs["plane"] * hardcoded_values["line"][i][j][2];
                total_cost_min += costs["online"] * ONLINE_HOUR;
            }

        }
    }

    return [total_cost_min, total_cost_max]
}

