import { Button } from "@mui/material";
import "./ReservationCard.css";

export default function ReservationCard({ uuid, date, zone, floor, desk, screening }) {
  const reservation = new Date(date);
  const weekday = { weekday: "long" };
  const options = { month: "long", day: "numeric", year: "numeric" };

  return (
    <section className="ReservationCard dropShadow">
      <div className="ReservationCard__flex">
        <div className="ReservationCard__left">
          <div>
            <h4>{reservation.toLocaleDateString("en-CA", weekday)}</h4>
            <h4>{reservation.toLocaleDateString("en-CA", options)}</h4>
          </div>

          <p>{zone} zone</p>
        </div>
        <div className="ReservationCard__right">
          <h4>Desk {desk}</h4>
          <p>Floor {floor}</p>
        </div>
      </div>
      {screening === "incomplete" ? (
        <Button href={`/quiz/${uuid}`} fullWidth variant="contained">
          Complete Health Screening
        </Button>
      ) : (
        <></>
      )}
      {screening === "pass" ? (
        <Button fullWidth color="pass" variant="contained">
          Health Screening Passed
        </Button>
      ) : (
        <></>
      )}
      {screening === "future" ? (
        <Button fullWidth color="deactivated" variant="contained">
          Complete Health Screening
        </Button>
      ) : (
        <></>
      )}
    </section>
  );
}
