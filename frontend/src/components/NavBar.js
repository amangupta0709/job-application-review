import MenuIcon from "@mui/icons-material/Menu";
// import { makeStyles } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
// }));

export default function NavBar() {
  //   const classes = useStyles();
  return (
    // <div className={classes.root}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Job Application Review
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    // </div>
  );
}
