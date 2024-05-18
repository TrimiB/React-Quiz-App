function FinnishScreen({ points, maxPossiblePoints }) {
  const procentage = Math.ceil((points / maxPossiblePoints) * 100);
  return (
    <p>
      You scored {points} out of {maxPossiblePoints} points. {procentage}
    </p>
  );
}

export default FinnishScreen;
