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

  const handleZoneChange = (event) => {
    props.setFloorSelected(event.target.value);
  };

  const handleDateSelect = (event) =>{
    console.log(event);
    // props.setDateSelected(event.target.value);
  }

  return (
    <div className="datepickercontainer">
      <form className="LogIn" onSubmit={(event) => console.log(event)}>
        <FormControl>
          <FormLabel id="zone-choice-group-label">
            <h2 className="noTrasnparency">Select a zone:</h2>
          </FormLabel>
          <RadioGroup
            aria-labelledby="zone-choice-group-label"
            name="zone-choice"
            value={props && props.floorSelected ? props.floorSelected : ""}
            onChange={handleZoneChange}
          >
            <FormControlLabel
              value="social"
              control={<Radio />}
              label="Socially Distanced Zone"
            />
            <p className="radiodetail">Masks are required except when eating or drinking. Desks are spaced
            2m apart and away from high traffic areas.</p>
            <FormControlLabel
              value="collaborative"
              control={<Radio />}
              label="Collaborative Zone"
            />
            <p className="radiodetail">Masks are optional but strongly encouraged. Desks are grouped
            together to allow for collaboration.</p>
          </RadioGroup>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            views={["day"]}
            label="Pick Date"
            value={props?.dateSelected? props.dateSelected: ""}
            name="date-choice"
            onChange={handleDateSelect}
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
          />
        </LocalizationProvider>
      </form>
    </div>
  );
}
