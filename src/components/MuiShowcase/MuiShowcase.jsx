"use client";

import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Container, Grid, List, ListItem, Stack, Tab, Tabs, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import classes from "./MuiShowcase.module.css";
import { useState } from "react";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const MuiShowcase = () => {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("one");
  const handleTabChange = (_e, newValue) => setValue(newValue);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container maxWidth="xxl" className={classes.container}>
      <Box className={classes.typography}>
        <Typography variant="h1">Typography variant h1</Typography>
        <Typography variant="h2">Typography variant h2</Typography>
        <Typography variant="h3">Typography variant h3</Typography>
        <Typography variant="h4">Typography variant h4</Typography>
        <Typography variant="h5">Typography variant h5</Typography>
        <Typography variant="h6">Typography variant h6</Typography>
        <Typography variant="subtitle1">Typography variant subtitle1</Typography>
        <Typography variant="subtitle2">Typography variant subtitle2</Typography>
        <Typography variant="body1">Typography variant body1</Typography>
        <Typography variant="body2">Typography variant body2</Typography>
        <Typography variant="overline">Typography variant overline</Typography>
        <Typography variant="button">Typography variant button</Typography>
      </Box>
      {/* lists */}
      <Box>
        <Grid container sx={{ position: "relative", width: "100%" }}>
          <Grid item xs={12} md={6}>
            <List
              component="ul"
              sx={{
                listStyleType: "disc",
                pl: 4,
                "& .MuiListItem-root": {
                  display: "list-item",
                  listStyleType: "inherit",
                },
              }}
            >
              <ListItem>List Item 1</ListItem>
              <ListItem>List Item 2</ListItem>
              <ListItem>List Item 3</ListItem>
              <ListItem>List Item 4</ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List
              component="ol"
              sx={{
                listStyleType: "decimal",
                pl: 4,
                "& .MuiListItem-root": {
                  display: "list-item",
                  listStyleType: "inherit",
                },
              }}
            >
              <ListItem>List Item 1</ListItem>
              <ListItem>List Item 2</ListItem>
              <ListItem>List Item 3</ListItem>
              <ListItem>List Item 4</ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>
      {/* end lists */}
      {/* colors */}
      <Box>
        <Typography variant="h3" sx={{ color: "text.primary" }}>
          text.primary
        </Typography>
        <Typography variant="h3" sx={{ color: "text.secondary" }}>
          text.secondary
        </Typography>
        <Typography variant="h3" sx={{ color: "primary.main" }}>
          primary.main
        </Typography>
        <Typography variant="h3" sx={{ color: "primary.dark" }}>
          primary.dark
        </Typography>
        <Typography variant="h3" sx={{ color: "primary.light" }}>
          primary.light
        </Typography>
        <Typography variant="h3" sx={{ color: "secondary.main" }}>
          secondary.main
        </Typography>
        <Typography variant="h3" sx={{ color: "secondary.dark" }}>
          secondary.dark
        </Typography>
        <Typography variant="h3" sx={{ color: "secondary.light" }}>
          secondary.light
        </Typography>
      </Box>
      {/* end colors */}
      {/* buttons */}
      <Box>
        <Stack direction="row" spacing={2}>
          <Button variant="contained">Contained Button</Button>
          <Button variant="outlined">Outlined Button</Button>
        </Stack>
      </Box>
      {/* end buttons */}
      {/* accordion */}
      <Box>
        <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
            <Typography component="h4" variant="h4">
              Accordion 1
            </Typography>
          </AccordionSummary>
          <AccordionDetails>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.</AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
            <Typography component="h4" variant="h4">
              Accordion 2
            </Typography>
          </AccordionSummary>
          <AccordionDetails>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.</AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3-content" id="panel3-header">
            <Typography component="h4" variant="h4">
              Accordion Actions
            </Typography>
          </AccordionSummary>
          <AccordionDetails>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.</AccordionDetails>
          <AccordionActions>
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained">Agree</Button>
          </AccordionActions>
        </Accordion>
      </Box>
      {/* end accordion */}
      {/* tabs */}
      <Box sx={{ width: "100%" }}>
        <Tabs value={value} onChange={handleTabChange}>
          <Tab value="one" label="New Arrivals in the Longest Text of Nonfiction that should appear in the next line" wrapped />
          <Tab value="two" label="Item Two" />
          <Tab value="three" label="Item Three" />
        </Tabs>

        <TabPanel value={value} index="one">
          Item One
        </TabPanel>

        <TabPanel value={value} index="two">
          Item Two
        </TabPanel>
        <TabPanel value={value} index="three">
          Item Three
        </TabPanel>
      </Box>
    </Container>
  );
};

export default MuiShowcase;
