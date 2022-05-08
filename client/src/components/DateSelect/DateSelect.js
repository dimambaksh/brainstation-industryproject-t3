import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./DateSelect.scss";
import { useState } from "react";

export default function DateSelect(props) {
  const [dateValue, setDateValue] = useState("");
  const [zoneValue, setZoneValue] = useState("social");

  const handleZoneChange = (event) => {
    setZoneValue(event.target.value);
  };

  return (
    <div className="datepickercontainer">
      <form className="LogIn" onSubmit={(event) => console.log(event)}>
        <FormControl>
          <FormLabel id="zone-choice-group-label">
            Select a zone:
          </FormLabel>
          <RadioGroup
            aria-labelledby="zone-choice-group-label"
            name="zone-choice"
            value={zoneValue}
            onChange={handleZoneChange}
          >
            <FormControlLabel
              value="social"
              control={<Radio />}
              label="Socially Distanced Zone"
            />
            Masks are required except when eating or drinking. Desks are spaced
            2m apart and away from high traffic areas.
            <FormControlLabel
              value="collaborative"
              control={<Radio />}
              label="Collaborative Zone"
            />
            Masks are optional but strongly encouraged. Desks are grouped
            together to allow for collaboration.
          </RadioGroup>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            views={["day", "month", "year"]}
            label="Pick Date"
            value={dateValue}
            name="date-choice"
            onChange={(newValue) => {
              setDateValue(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
          />
        </LocalizationProvider>
      </form>
    </div>
  );
}
