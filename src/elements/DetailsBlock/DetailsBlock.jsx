"use client";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BlockRenderer from "@/components/BlockRenderer/BlockRenderer";

export default function DetailsBlock({ summary = "", open = false, innerBlocks = [] }) {
  return (
    <Accordion defaultExpanded={!!open} disableGutters>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography component="h4" variant="h4">
          {summary}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {(innerBlocks || []).map((inner, i) => (
          <BlockRenderer key={i} block={inner} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
