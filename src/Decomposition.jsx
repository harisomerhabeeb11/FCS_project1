import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import ReplayIcon from "@material-ui/icons/Replay";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  containerStyle: {
    padding: "20px",
  },
  floatRight: {
    float: "right",
  },
  marginBottom: {
    marginBottom: "10px",
  },
  marginTop: {
    marginTop: "1.2rem",
  },
}));

export default function Decomposition() {
  const classes = useStyles();
  const [errorMsg, setErrorMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const [userInput, setUserInput] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput === "" || userInput === null) {
      setErrorMsg("Please enter a valid integer value");
      setShowMsg(true);
    } else if(userInput < -121) { 
      setErrorMsg("Please enter value greater than -121");
      setShowMsg(true);
    } else if(userInput > 121) {
      setErrorMsg("Please enter value less than 121");
      setShowMsg(true);
    } 
    else {
      setResult(powerOfThree(userInput));
    }
  };

  // Main function logic.
  function powerOfThree(n) {
    const POWER_OF_THREE = [1,3,9,27,81];
    let outputString = "";
    let temp = n;
    let add = true;
    while(temp) { // while the input is not zero
      let distance = Math.abs(temp - 1); // take the absolute value of temp - 1 as distance
      let closest = 1;
      for(let i = 1; i < POWER_OF_THREE.length; ++i) { 
        // we iterate of the array to compare the closest value with the input
        let tempDis = Math.abs(temp - POWER_OF_THREE[i]); // checks the distance between the input and the closest number.
        if(distance && distance > tempDis) {
          distance = tempDis;
          closest = POWER_OF_THREE[i];
        } else break;
      } 
      if(closest > temp) add = !add;
      temp = distance;
      if (temp && temp > 0) {
        // concatenate string with the signs based on the values of temp
        let s = "";
        s = closest;
        outputString += s;
        outputString += add ? '+' : '-';
      } else {
        let s = "";
        s = closest;
        outputString += s;
      }
    }
    return outputString;
  }

  const onResetHandler = () => {
    setUserInput(null);
    setResult(null);
    setErrorMsg("");
    setShowMsg(false);
  };
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} className={classes.containerStyle}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} m={3}>
              <Typography variant="h6" className={classes.marginBottom}>
                Decomposition of Powers of 3
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="input"
                name="input"
                placeholder="Integer"
                type="number"
                variant="outlined"
                onChange={(e) => {
                  setUserInput(e.target.value);
                  setErrorMsg("");
                  setShowMsg(false);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              {showMsg ? <Alert severity="error">{errorMsg}</Alert> : null}
            </Grid>
            <Grid item xs={6}>
              <Button
                id="reset"
                type="reset"
                color="secondary"
                variant="contained"
                onClick={onResetHandler}
              >
                Reset
                <ReplayIcon />
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                id="btn"
                type="submit"
                variant="contained"
                color="primary"
                className={classes.floatRight}
              >
                Go
                <ArrowForwardIosIcon />
              </Button>
            </Grid>
            <Grid item xs={12} className={classes.marginTop}>
              <Button variant="contained" fullWidth>{result ? result : 'output'}</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
