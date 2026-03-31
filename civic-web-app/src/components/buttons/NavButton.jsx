import { Button } from "@mui/material";

export function NavButton({ text, sx }) {
  return (
    <Button
      variant="text" 
      sx={{
        fontWeight: 600,
        color: "white",
        textAlign: "center",
        ...(sx ? sx : {})
      }}
    >
      { text }
    </Button>
  )
}
