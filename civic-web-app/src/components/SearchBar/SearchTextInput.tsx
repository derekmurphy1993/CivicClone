import SearchIcon from "@mui/icons-material/Search";
import { SxProps } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

import TextInput from "../inputs/TextInput";

interface SearchTextInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  showIcon?: boolean;
  onClick?: () => void;
  onFocus?: () => void;
  sx?: SxProps;
}

export default function SearchTextInput({ value, setValue, showIcon, onClick,
    onFocus, sx }: SearchTextInputProps) {
  function onChange(e: ChangeEvent<any>) {
    let userInput = e?.target?.value;
    userInput = userInput.toLowerCase();
    setValue(userInput);
  }

  return (
    <TextInput placeholder="Search for a cause" value={value} paperSx={sx}
      onChange={onChange} onFocus={onFocus} onClick={onClick}
      icon={showIcon ? <SearchIcon /> : undefined}
    />
  )
}
