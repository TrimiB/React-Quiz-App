function FinnishScreen({ points, maxPossiblePoints }) {
  const procentage = Math.ceil((points / maxPossiblePoints) * 100);

  let emoji;
  if (procentage >= 90) emoji = '🥇';

  if (procentage >= 70) emoji = '🥈';

  if (procentage >= 50) emoji = '🥉';

  if (procentage >= 30) emoji = '🤨';

  if (procentage >= 10) emoji = '🫤';

  if (procentage === 0) emoji = '🤦‍♂️';

  return (
    <p className='result'>
      <span>{emoji}</span> You scored {points} out of {maxPossiblePoints} points. {procentage}%
    </p>
  );
}

export default FinnishScreen;
