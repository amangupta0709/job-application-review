import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  NativeSelect,
  Paper,
  Stack,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Iconify from "../components/Iconify";
// import useAxios from "../utils/useAxios.js";

const StyledDiv = styled("div")(() => ({
  position: "absolute",
  marginTop: -22,
  marginLeft: 400,
  top: 90,
}));

const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#00AB55",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#B0B9C2",
    },
    "&:hover fieldset": {
      borderColor: "#000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00AB55",
    },
  },
});

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const BASE_URL = "http://127.0.0.1:8002";

// const Button = styled(LoadingButton)(() => ({
//   fontWeight: 700,
//   marginRight: 30,
//   textTransform: "none",
//   backgroundColor: "#00AB55",
//   boxShadow: "0 8px 16px 0 rgba(0, 171, 85, 0.24)",
//   "&:hover": {
//     backgroundColor: "#007B55",
//   },
// }));

const IndividualCandidate = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  //   const api = useAxios();
  const [res, setRes] = useState(" ");

  const [value, setValue] = useState("1");
  const [chipData, setChipData] = useState([]);
  const [candidateStatus, setCandidateStatus] = useState("");
  const [status, setStatus] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleStatusChange = (e) => {
    setCandidateStatus(e.target.value);
    console.log(status);
  };

  const goToNextTab = (newValue) => {
    setValue(newValue);
  };

  const changeStatusofCandidate = async () => {
    let patchData = { data: { status: candidateStatus } };

    axios.patch(`${BASE_URL}/candidate/${id}/`, patchData).then((response) => {
      console.log(response.data);
      setStatus(patchData["data"]["status"]);
    });
    navigate("/");
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/candidate/${id}/`);
      setRes(response.data);
      const skills = response.data.skills;
      setChipData(skills.split(", "));
    } catch {
      navigate("/");
    }
  };

  return (
    <StyledDiv>
      <h1>Candidate Info</h1>
      <Box sx={{ width: 700, typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              TabIndicatorProps={{
                style: { background: "#00AB55", height: 3 },
              }}
              aria-label="lab API tabs example"
            >
              <Tab label="General" value="1" />
              <Tab label="Experience" value="2" />
              <Tab label="Portfolio" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Stack spacing={3}>
              <Stack direction="row" spacing={3}>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  value={res.first_name + " " + res.last_name}
                  inputProps={{ readOnly: true }}
                  sx={{
                    width: 320,
                    typography: "body1",
                  }}
                />
                <TextField
                  label="Email Address"
                  variant="outlined"
                  value={res.email || ""}
                  inputProps={{ readOnly: true }}
                  sx={{
                    width: 320,
                    typography: "body1",
                  }}
                />
              </Stack>
              <Stack direction="row" spacing={3}>
                <TextField
                  label="Mobile Number"
                  variant="outlined"
                  value={"+91" + res.mobile || " "}
                  inputProps={{ readOnly: true }}
                  sx={{
                    width: 320,
                    typography: "body1",
                  }}
                />
                <TextField
                  label="Address"
                  variant="outlined"
                  value={res.address || " "}
                  inputProps={{ readOnly: true }}
                  sx={{
                    width: 320,
                    typography: "body1",
                  }}
                />
              </Stack>
              <Stack direction="row" spacing={3}>
                <TextField
                  label="Zipcode"
                  variant="outlined"
                  value={res.zipcode || " "}
                  inputProps={{ readOnly: true }}
                  sx={{
                    width: 320,
                    typography: "body1",
                  }}
                />
                <TextField
                  label="Country"
                  variant="outlined"
                  value={res.country || " "}
                  inputProps={{ readOnly: true }}
                  sx={{
                    width: 320,
                    typography: "body1",
                  }}
                />
              </Stack>
              <Stack direction="row" spacing={3}>
                <TextField
                  label="Edcation"
                  variant="outlined"
                  value={res.education || " "}
                  inputProps={{ readOnly: true }}
                  sx={{
                    width: 663,
                    typography: "body1",
                  }}
                />
              </Stack>
              <Stack direction="row" spacing={3}>
                <TextField
                  label="Bio"
                  variant="outlined"
                  multiline
                  rows={3}
                  value={res.bio || " "}
                  inputProps={{ readOnly: true }}
                  sx={{
                    width: 663,
                    typography: "body1",
                  }}
                />
              </Stack>
            </Stack>
            <Box sx={{ display: "flex", justifyContent: "right" }}>
              <Button
                sx={{ marginTop: 2, marginRight: 0, marginBottom: 10 }}
                size="large"
                variant="contained"
                onClick={() => {
                  goToNextTab("2");
                }}
              >
                Next
              </Button>
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <TextField
              label="Experience"
              variant="outlined"
              multiline
              rows={3}
              value={res.experience || " "}
              inputProps={{ readOnly: true }}
              sx={{
                width: 663,
                typography: "body1",
              }}
            />
            <Box>
              <Button
                sx={{ marginRight: 70, marginTop: 2, marginBottom: 0 }}
                size="large"
                variant="contained"
                onClick={() => {
                  goToNextTab("1");
                }}
              >
                Back
              </Button>
              <Button
                sx={{
                  position: "absolute",
                  right: 0,
                  marginTop: 2,
                  marginRight: 2,
                }}
                size="large"
                variant="contained"
                onClick={() => {
                  goToNextTab("3");
                }}
              >
                Next
              </Button>
            </Box>
          </TabPanel>
          <TabPanel value="3">
            <Card sx={{ minWidth: 250 }}>
              <CardContent>
                <Stack spacing={2}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, display: "flex" }}
                  >
                    Website :
                    {res.website ? (
                      <a
                        style={{ marginLeft: 10 }}
                        href={res.website}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {res.website}{" "}
                        <Iconify
                          sx={{ position: "relative", top: 3, left: 3 }}
                          icon={"eva:external-link-outline"}
                        />{" "}
                      </a>
                    ) : (
                      <p style={{ margin: 0, paddingLeft: 10 }}>
                        {" "}
                        Not Provided{" "}
                      </p>
                    )}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, display: "flex" }}
                  >
                    Resume :
                    {res.resume ? (
                      <a
                        style={{ marginLeft: 10 }}
                        href={BASE_URL + res.resume}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Link
                        <Iconify
                          sx={{ position: "relative", top: 3, left: 3 }}
                          icon={"eva:external-link-outline"}
                        />{" "}
                      </a>
                    ) : (
                      <p style={{ margin: 0, paddingLeft: 10 }}>
                        {" "}
                        Not Provided{" "}
                      </p>
                    )}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ display: "flex", fontWeight: 600 }}
                  >
                    Skills :
                    <Paper
                      sx={{
                        display: "flex",
                        justifyContent: "left",
                        listStyle: "none",
                        p: 0.5,
                        m: 0,
                        boxShadow: 0,
                      }}
                      component="ul"
                    >
                      {chipData.map((item, index) => {
                        return (
                          <ListItem key={index}>
                            <Chip label={item} />
                          </ListItem>
                        );
                      })}
                    </Paper>
                  </Typography>
                </Stack>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    display: "flex",
                  }}
                >
                  Status :
                  <NativeSelect
                    defaultValue={res.status}
                    sx={{ marginLeft: 2 }}
                    inputProps={{
                      name: "",
                      id: "uncontrolled-native",
                    }}
                    onChange={(e) => {
                      handleStatusChange(e);
                    }}
                  >
                    <option value={"applied"}>Applied</option>
                    <option value={"accepted"}>Accepted</option>
                    <option value={"rejected"}>Rejected</option>
                  </NativeSelect>
                </Typography>
              </CardContent>
              <CardActions
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={changeStatusofCandidate}
                >
                  Update
                </Button>
              </CardActions>
            </Card>
          </TabPanel>
        </TabContext>
      </Box>
    </StyledDiv>
  );
};

export default IndividualCandidate;
