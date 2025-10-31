"use client";
import parseHtml from "@/functions/parser";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

export default function TableBlock({ headers = [], rows = [], caption = "", fixed = false }) {
  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <TableContainer component={Paper} elevation={0} sx={{ border: 1, borderColor: "divider" }}>
        {caption ? (
          <Box sx={{ px: 2, py: 1, borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="subtitle2" fontWeight={600}>
              {caption}
            </Typography>
          </Box>
        ) : null}
        <Table size="small" sx={{ tableLayout: fixed ? "fixed" : "auto" }}>
          {headers.length > 0 && (
            <TableHead>
              <TableRow>
                {headers.map((h, i) => (
                  <TableCell key={i}>{parseHtml(h)}</TableCell>
                ))}
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {rows.map((r, ri) => (
              <TableRow key={ri}>
                {r.map((c, ci) => (
                  <TableCell key={ci}>{parseHtml(c)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
