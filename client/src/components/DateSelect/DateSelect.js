import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import "./DateSelect.scss";
import { useState } from "react";

export default function DateSelect(props) {
  const [dateValue, setDateValue] = useState("");
  const [zoneValue, setZoneValue] = useState("");
  const [desktypeValue, setdesktypeValue] = useState("");
  
  const handleZoneChange = (event) => {
    setZoneValue(event.target.value);
  };

  const handleDeskTypeChange = (event) => {
    setdesktypeValue(event.target.value);
  };

  return (
    <div className="datepickercontainer">
      <form className="LogIn" onSubmit={(event) => console.log(event)}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <FormControl sx={{ m: 0, minWidth: 200 }}>
              <InputLabel id="zone-select-label">Select Zone</InputLabel>
              <Select
                labelId="zone-select-label"
                id="zone-select-dropdown"
                value={zoneValue}
                label="Zone"
                onChange={handleZoneChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"yellow"}>Yellow Zone</MenuItem>
                <MenuItem value={"red"}>Red Zone</MenuItem>
              </Select>
              <FormHelperText>Yellow Zone or Red Zone</FormHelperText>
            </FormControl>
            <MobileDatePicker
              views={["day", "month", "year"]}
              label="Pick Date"
              value={dateValue}
              onChange={(newValue) => {
                setDateValue(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
            />
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="desktype-select-label">Select Desk Type</InputLabel>
              <Select
                labelId="desktype-select-label"
                id="desktype-select-dropdown"
                value={desktypeValue}
                label="Desk Type"
                onChange={handleDeskTypeChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"single"}>Single Desks</MenuItem>
                <MenuItem value={"meeting"}>Meeting Rooms</MenuItem>
              </Select>
              <FormHelperText>Single Desks or Meeting Rooms</FormHelperText>
            </FormControl>
          </Stack>
        </LocalizationProvider>
      </form>
    </div>
  );
}
