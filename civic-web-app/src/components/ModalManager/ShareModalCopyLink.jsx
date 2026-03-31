import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InputBase from "@mui/material/InputBase";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Paper from "@mui/material/Paper";
import React, { useState, useRef } from "react";
import ReactGA from "react-ga";
import { GACategory, GAUserAction } from "../../types/analytics";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ShareModalCopyLink({ slug }) {
  const [snack, setSnack] = useState(false);
  const inputEl = useRef(null);
  const eventLink = "http://www.civicapp.co/events/" + slug;

  function handleClose() {
    setSnack(false)
  }
  
  function handleCopy(e) {
    e.preventDefault()

    ReactGA.event({
      category: GACategory.USER,
      action: GAUserAction.COPY_CIVIC_EVENT_LINK,
      label: slug,
    });

    inputEl.current.select()
    inputEl.current.setSelectionRange(0, 99999)

    navigator.clipboard.writeText(eventLink);
    setSnack(true);
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Paper
      component="form"
      className="SearchBar"
      sx={{ 
            p: "2px 4px", 
            display: "flex", 
            alignItems: "center", 
            borderRadius: 3,
            width: "97%",
            height: 43,
            textDecoration: "none",
            border: "1.75px solid #C3DFDD",
            WebkitBoxShadow: "0px 3px 10px -8px rgba(0,0,0,0.65)"
      }}
    >
      <InputBase
        inputRef={inputEl}
        sx={{ ml: 1, flex: 1 }}
        value={eventLink}
        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
        inputProps={{ "aria-label": "Copy link" }}
      />

      <button id="copyBtn" onClick={handleCopy} >Copy</button>
      <Snackbar
        open={snack}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Link copied to clipboard"
        action={action}
      >
        <Alert onClose={handleClose} severity="success" sx={{ 
          width: '100%',
          backgroundColor: "var(--primary-focus)",
          color: "black",
          borderRadius: ".75vw"
        }}>
          Link copied to clipboard
        </Alert>
      </Snackbar>
    </Paper>
  );
}
