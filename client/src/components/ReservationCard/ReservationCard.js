import { Button } from "@mui/material";
import "./ReservationCard.css";

export default function ReservationCard({ date, zone, desk }) {
    const birthday = new Date('August 19, 1975 23:15:30');
    const weekday = { weekday: "long"};
  const options = { month: "long", day: "numeric" };

  return (
    <div className="ReservationCard">
      <div className="ReservationCard__left">
      <h3>{birthday.toLocaleDateString("en-CA", weekday)}</h3>
        <h3>{birthday.toLocaleDateString("en-CA", options)}</h3>
        <p>{zone} zone</p>
        <p>Desk {desk}</p>
      </div>
      <div className="ReservationCard__right">
          <Button href="/quiz" variant="contained">Complete Screening</Button>
      </div>
    </div>
  );
}
