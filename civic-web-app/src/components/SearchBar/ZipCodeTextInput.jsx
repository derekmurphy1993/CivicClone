import FmdGoodIcon from "@mui/icons-material/FmdGood";

import TextInput from "../inputs/TextInput";

export default function ZipCodeTextInput({ value, setValue, showIcon, sx }) {
  function onChange(e) {
    let userInput = e?.target?.value;
    userInput = userInput.toLowerCase();
    setValue(userInput);
  }

  return (
    <TextInput placeholder="Zip code" value={value} paperSx={sx}
      onChange={onChange} icon={showIcon ? <FmdGoodIcon /> : undefined}
      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
    />
  );
}
