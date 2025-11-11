import { Box, Typography } from "@mui/material";

export default function EmptyState() {
  return (
    <Box sx={{ py: 6, textAlign: "center", opacity: 0.7 }}>
      <Typography variant="h6">Nema rezultata.</Typography>
    </Box>
  );
}
