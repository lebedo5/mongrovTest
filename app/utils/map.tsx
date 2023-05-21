
export function getLongitudeDelta(lat, angularDistance) {
 return Math.abs(Math.atan2(
    Math.sin(angularDistance) * Math.cos(lat),
    Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat)))
}
