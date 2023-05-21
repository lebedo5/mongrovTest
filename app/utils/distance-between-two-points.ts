export function distanceBetweenTwoPoints(coords1, coords2) {
  const R = 6371;
  const φ1 = coords1.latitude * Math.PI/180; // φ, λ in radians
  const φ2 = coords2.latitude * Math.PI/180;
  const Δφ = (coords2.latitude - coords1.latitude) * Math.PI/180;
  const Δλ = (coords2.longitude - coords1.longitude) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}

export function totalDistance(list) {
  let totalDistance = 0

  for (let i = 1; i < list?.length; i++) {
    totalDistance += distanceBetweenTwoPoints(list[i-1], list[i])
  }

  return Math.ceil(totalDistance)
}
