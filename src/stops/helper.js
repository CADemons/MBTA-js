/*
 * It felt unnecessary to write a class for a stop, since the jsons are straightforward; so here is a helper with functions.
 * @license MIT
 *
 * @author Colin Rioux
 *
 */


function findStopById(stops, id) {
    for (var stop in stops) {
        if (stops[stop].stop_id === id) return stops[stop];
    }
    return null;
}

function findStopByName(stops, id) {
    for (var stop in stops) {
        if (stops[stop].stop_name.split(' ').join('').toLowerCase() === name.toLowerCase()) return stops[stop];
    }
    return null;
}

function findStopByParent(stops, gtfs) {
    for (var stop in stops) {
        if (stops[stop].parent_station === gtfs) return stops[stop];
    }
    return null;
}

function findStopByParentName(stops, name) {
    for (var stop in stops) {
        if (stops[stop].parent_station_name.toLowerCase() === name.toLowerCase()) return stops[stop];
    }
    return null;
}

function findStopByCoords(stops, lat, lon) {
    for (var stop in stops) {
        if (stops[stop].stop_lat === lat && stops[stop].stop_lon === lon) return stops[stop];
    }
    return null;
}

function getDistanceById(stops, id) {
    for (var stop in stops) {
        if (stops[stop].stop_id === id) return stops[stop].distance;
    }
    return null;
}

function getDistanceByName(stops, name) {
    for (var stop in stops) {
        if (stops[stop].stop_name === name) return stops[stop].distance;
    }
    return null;
}

function getDistanceByCoords(stops, lat, lon) {
    return findStopByCoords(stops, lat, lon).distance || null;
}

module.exports = {
    findStopById,
    findStopByName,
    findStopByParent,
    findStopByParentName,
    findStopByCoords,
    getDistanceById,
    getDistanceByName,
    getDistanceByCoords
}
