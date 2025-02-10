import { useMemo, useState } from "react";
import {
  DAILY_SCORE_TOTAL,
  POST_TRANSITION_SCORE_PER_RANK,
  WEEKLY_SCORE_TOTAL,
} from "./Helpers/ScoreConsts";
import { getScoreForLevel } from "./Helpers/ScoreForLevel";
import { Container } from "./Components/ScoreCalcContainer";
import { LabelledInput } from "./Components/LabelledInput";

export const ScoreCalc = () => {
  const [scoreLevel, setScoreLevel] = useState(124);
  const [desiredLevel, setDesiredLevel] = useState(150);
  const [selectedDate, setSelectedDate] = useState("2025-03-04");

  const scoreToTarget = useMemo(() => {
    //pre 100 calcs
    const below100 = Math.min(desiredLevel, 100);
    const scoreToGoBelow100 =
      getScoreForLevel(below100) - getScoreForLevel(Math.min(scoreLevel, 100));

    //post 100 calcs
    const diffAbove100 =
      Math.max(desiredLevel - 100, 0) - Math.max(scoreLevel - 100, 0);
    const above100Remaining = diffAbove100 * POST_TRANSITION_SCORE_PER_RANK;

    return {
      scoreRemaining: scoreToGoBelow100 + above100Remaining,
    };
  }, [desiredLevel, scoreLevel]);

  const formattedDate = useMemo(() => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
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
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          defaultValue="2025-03-04"
        />
      </LabelledInput>
      <LabelledInput>
        <label>Score Level</label>
        <input
          type="number"
          value={scoreLevel}
          onChange={(e) => {
            if (+e.target.value > 0)
              return setScoreLevel(parseInt(e.target.value));
          }}
        />
      </LabelledInput>
      <LabelledInput>
        <label>Desired Level</label>
        <input
          type="number"
          value={desiredLevel}
          onChange={(e) => setDesiredLevel(parseInt(e.target.value))}
        />
      </LabelledInput>
      <div>you have {daysLeft} days left to complete</div>
      <div>
        Score Required Per Day:{" "}
        {Math.ceil(scoreToTarget.scoreRemaining / daysLeft).toFixed(0)}
      </div>
      <div>
        {scoreToTarget.scoreRemaining > 0
          ? `Score Required Total: ${scoreToTarget.scoreRemaining}`
          : "Congrats! You made it!"}
      </div>
      <div>
        Score Available (no Grind/Boost):{" "}
        {daysLeft * DAILY_SCORE_TOTAL +
          Math.floor(daysLeft / 7) * WEEKLY_SCORE_TOTAL}
      </div>
    </Container>
  );
};
