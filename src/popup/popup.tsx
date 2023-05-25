import React from "react";
import ReactDOM from "react-dom";
import "./popup.css";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const App: React.FC = () => {
  const url: string = "https://www.linkedin.com/in/cameronpercy/";
  const createTab = (url) => {
    return new Promise((resolve, reject) => {
      chrome.tabs.create({ url }, (tab) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        }
        resolve(tab);
      });
    });
  };

  const handleClick = () => {
    createTab(url).then(() => {
      chrome.runtime.sendMessage("LinkedIn User Profile is opened");
    });
  };

  return (
    <>
      <Box mx={1} my={2}>
        <Card>
          <Grid container justifyContent={"center"}>
            <CardContent>
              <Grid justifyContent={"center"}>
                <Typography variant={"h6"}>
                  Click "Send request" button to start
                </Typography>
              </Grid>
            </CardContent>
            <Grid item justifyContent={"center"}>
              <CardActions>
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={handleClick}
                >
                  Send request
                </Button>
              </CardActions>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
