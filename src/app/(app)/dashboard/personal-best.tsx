'use client';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type Props = {
  personalHighest: number;
};

const PersonalBest = ({ personalHighest }: Props) => {
  return (
    <div className="mx-auto md:w-auto w-40 flex justify-center">
      <CircularProgressbar
        value={personalHighest}
        strokeWidth={4}
        text={`${personalHighest}%`}
        styles={buildStyles({
          textColor: '#2B3499',
          pathColor: '#2B3499',
          trailColor: '#8692A6',
          textSize: '16px',
        })}
      />
    </div>
  );
};

export default PersonalBest;
