import { useMemo, useState } from 'react'
import './App.css'
import styled from 'styled-components'
import { POST_TRANSITION_SCORE_PER_RANK, SCORE_GROWTH_PER_LEVEL, START_SCORE } from './CONSTANTS'

const Container = styled.div`
display: flex;
flex-direction: column;
width:100%;
height:100%;
`

const LabelledInput = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`

function calculateEscalatingAddition(start: number, increment: number, intervals: number): number {
  let total = 0;
  for (let i = 0; i < intervals; i++) {
    total += start + (i * increment);
  }
  return total;
}


function App() {
  const [scoreLevel, setScoreLevel] = useState(124);
  const [desiredLevel, setDesiredLevel] = useState(150);
  const [selectedDate, setSelectedDate] = useState('2025-03-04');

  const scoreToTarget = useMemo(() => {
    const below100 = Math.min(desiredLevel, 100);
    const diffBelow100 = below100 - scoreLevel;
    const sub100Remaining = calculateEscalatingAddition(START_SCORE, SCORE_GROWTH_PER_LEVEL, diffBelow100);

    const diffAbove100 = (desiredLevel % 100) - (scoreLevel % 100);
    const above100Remaining = diffAbove100 * POST_TRANSITION_SCORE_PER_RANK;

    return {
      scoreRemaining: sub100Remaining + above100Remaining
    };
  }, [desiredLevel, scoreLevel]);

  const formattedDate = useMemo(() => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  }, []);

  const daysLeft = useMemo(() => {
    const currentDate = new Date();
    const endDate = new Date(selectedDate);
    const timeDiff = endDate.getTime() - currentDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  }, [selectedDate]);

  return (
    <Container>
      <div>current date: {formattedDate}</div>
      <LabelledInput>
        <label>Select End Date</label>
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} defaultValue="2025-03-04" />
      </LabelledInput>
      <LabelledInput>
        <label>Score Level</label>
        <input type="number" value={scoreLevel} onChange={(e) => { if (+e.target.value > 0) return setScoreLevel(parseInt(e.target.value)) }} />
      </LabelledInput>
      <LabelledInput>
        <label>Desired Level</label>
        <input type="number" value={desiredLevel} onChange={(e) => setDesiredLevel(parseInt(e.target.value))} />
      </LabelledInput>
      <div>you have {daysLeft} days left to complete</div>
      <div>{scoreToTarget.scoreRemaining > 0 ? `Score Required: ${scoreToTarget.scoreRemaining}` : 'Congrats! You made it!'}</div>
      <div>Score Required Per Day: {Math.ceil(scoreToTarget.scoreRemaining/daysLeft).toFixed(0)}</div>
    </Container>
  )
}

export default App
