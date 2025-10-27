"use client";
import { Box, Divider } from "@mui/material";

export default function Spacer({ height, divider }) {
  const h = Number(height || 24);
  return divider ? <Divider sx={{ my: h / 2 }} /> : <Box sx={{ height: h }} />;
}
