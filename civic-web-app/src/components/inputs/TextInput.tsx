import { Paper, SxProps, TextField } from "@mui/material";
import React, { ChangeEvent, ReactElement, useContext } from "react";

import { AppContext } from "../../constants/contexts";
import "./TextInput.css";

interface TextInputProps {
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onClick?: () => void;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  icon?: ReactElement;
  inputProps?: {[inputPropKey: string]: any};
  paperSx?: SxProps;
  textFieldSx?: SxProps;
}

export default function TextInput({ placeholder, value, onChange, onClick,
    onFocus, onKeyDown, icon, inputProps, paperSx, textFieldSx }: TextInputProps) {
  const { isMobile } = useContext(AppContext);

  return (
    <Paper component="form" sx={{
      display: "flex", 
      alignItems: "center", 
      height: "100%",
      width: "100%",
      fontSize: isMobile ? "14px" : "16px",
      padding: "0 0 0 10px",
      textDecoration: "none",
      border: "1.75px solid #C3DFDD",
      boxSizing: "border-box",
      color: "var(--primary-pressed)",
      WebkitBoxShadow: "0px 3px 10px -8px rgba(0,0,0,0.65)",
      ...(paperSx || {})
    }}>
      { icon && (
        <span className="iconContainer">
          { icon }
        </span>
      )}
      <TextField
        variant="standard" placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onKeyDown && onKeyDown(e);
          }
        }}
        value={value}
        onChange={e => onChange && onChange(e)}
        onClick={onClick}
        onFocus={onFocus}
        InputProps={{
          "aria-label": placeholder,
          disableUnderline: true,
        }}
        inputProps={inputProps}
        sx={{
          width: "100%",
          ...(textFieldSx || {})
        }}
      />
    </Paper>
  );
}
