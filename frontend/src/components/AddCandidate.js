import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  NativeSelect,
  Stack,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import CountrySelect from "../components/CountrySelect";
// import useAxios from "../utils/useAxios.js";

const StyledDiv = styled("div")(() => ({
  position: "absolute",
  marginTop: -22,
  marginLeft: 400,
  top: 90,
}));

const BASE_URL = "http://127.0.0.1:8002";

const AddCandidateView = () => {
  const navigate = useNavigate();

  //   const api = useAxios();

  const [value, setValue] = useState("1");
  const [skillSet, setSkillSet] = useState([skillOptions[0]]);
  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    primary_role: primaryRoleOptions[0],
    experience: "",
    education: "",
    bio: "",
    email: "",
    mobile: "",
    address: "",
    zipcode: "",
    country: "",
    website: "",
    linkedln: "",
    github: "",
    skills: "",
    resume: "",
    status: "",
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const goToNextTab = (newValue) => {
    setValue(newValue);
  };

  const handleSkillsChange = () => {
    const skillsArray = skillSet;
    setFormData({ ...formData, skills: skillsArray.join(", ") });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { data: formData };
    try {
      const response = await axios.post(`${BASE_URL}/candidate/`, postData);
      console.log(response);
      navigate("/");
    } catch (e) {
      setError(e.response.data);
    }
  };

  const onStateChange = (newValue) => {
    setFormData({ ...formData, state: newValue.name });
  };

  const onCountryChange = (newValue) => {
    setFormData({ ...formData, country: newValue.name });
  };

  useEffect(() => {
    handleSkillsChange();
  }, [skillSet]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StyledDiv>
      <h1>Add candidate page</h1>
      <form onSubmit={handleSubmit}>
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
                    required
                    label="First Name"
                    value={formData.first_name}
                    onChange={(e) =>
                      setFormData({ ...formData, first_name: e.target.value })
                    }
                    variant="outlined"
                    sx={{
                      width: 320,
                      typography: "body1",
                    }}
                  />
                  <TextField
                    required
                    label="Last Name"
                    value={formData.last_name}
                    onChange={(e) =>
                      setFormData({ ...formData, last_name: e.target.value })
                    }
                    variant="outlined"
                    sx={{
                      width: 320,
                      typography: "body1",
                    }}
                  />
                </Stack>
                <Stack direction="row" spacing={3}>
                  <TextField
                    required
                    label="Email Address"
                    type={"email"}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    variant="outlined"
                    sx={{
                      width: 320,
                      typography: "body1",
                    }}
                  />
                  <TextField
                    required
                    label="Phone Number"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    variant="outlined"
                    sx={{
                      width: 320,
                      typography: "body1",
                    }}
                  />
                </Stack>
                <Stack direction="row" spacing={3}>
                  <Autocomplete
                    disablePortal
                    required
                    variant="outlined"
                    options={primaryRoleOptions}
                    value={formData.primary_role}
                    onChange={(e, value) =>
                      setFormData({ ...formData, primary_role: value })
                    }
                    sx={{
                      width: 320,
                      typography: "body1",
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Primary Role" />
                    )}
                  />
                  <TextField
                    required
                    label="Address"
                    value={formData.adress}
                    onChange={(e) =>
                      setFormData({ ...formData, adress: e.target.value })
                    }
                    variant="outlined"
                    sx={{
                      width: 320,
                      typography: "body1",
                    }}
                  />
                </Stack>
                <Stack direction="row" spacing={3}>
                  <TextField
                    required
                    label="Country"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    variant="outlined"
                    sx={{
                      width: 320,
                      typography: "body1",
                    }}
                  />
                  <TextField
                    required
                    label="Zipcode"
                    value={formData.zipcode}
                    onChange={(e) =>
                      setFormData({ ...formData, zipcode: e.target.value })
                    }
                    variant="outlined"
                    sx={{
                      width: 320,
                      typography: "body1",
                    }}
                  />
                </Stack>
                <Stack direction="row" spacing={3}>
                  <TextField
                    required
                    label="Education"
                    value={formData.education}
                    onChange={(e) =>
                      setFormData({ ...formData, education: e.target.value })
                    }
                    variant="outlined"
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
                    helperText="Should not be more than 200 charachters"
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    multiline
                    rows={3}
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
                required
                label="Experience"
                variant="outlined"
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
                multiline
                rows={6}
                sx={{
                  width: 663,
                  typography: "body1",
                }}
              />
              <Button
                sx={{ marginRight: 70, marginTop: 2 }}
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
            </TabPanel>
            <TabPanel value="3">
              <Card sx={{ minWidth: 250, boxShadow: "none" }}>
                <CardContent>
                  <Stack spacing={2}>
                    <TextField
                      label="Website"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                      variant="outlined"
                      sx={{
                        width: 600,
                        paddingBottom: 3,
                        typography: "body1",
                      }}
                    />
                    <TextField
                      label="Linkedln"
                      value={formData.linkedln}
                      onChange={(e) =>
                        setFormData({ ...formData, linkedln: e.target.value })
                      }
                      variant="outlined"
                      sx={{
                        width: 600,
                        paddingBottom: 3,
                        typography: "body1",
                      }}
                    />
                    <TextField
                      label="GitHub"
                      value={formData.github}
                      onChange={(e) =>
                        setFormData({ ...formData, github: e.target.value })
                      }
                      variant="outlined"
                      sx={{
                        width: 600,
                        paddingBottom: 3,
                        typography: "body1",
                      }}
                    />
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        variant="body1"
                        sx={{ position: "relative", left: 20, fontWeight: 600 }}
                      >
                        Resume :
                      </Typography>
                      <input
                        sx={{ width: 400 }}
                        style={{ marginLeft: 40 }}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            resume: e.target.files[0],
                          })
                        }
                        type="file"
                      />
                    </Box>
                    <Stack direction={"row"} spacing={3}>
                      <Typography
                        variant="body1"
                        sx={{
                          position: "relative",
                          left: 20,
                          fontWeight: 600,
                          paddingTop: 3,
                        }}
                      >
                        Skills :
                      </Typography>
                      <Autocomplete
                        multiple
                        sx={{ width: 400 }}
                        options={skillOptions}
                        onChange={(e, newValue) => setSkillSet(newValue)}
                        renderInput={(params) => (
                          <TextField {...params} variant="standard" />
                        )}
                      />
                    </Stack>
                  </Stack>
                  <Typography
                    variant="body1"
                    sx={{
                      position: "relative",
                      left: 13,
                      paddingTop: 3,
                      fontWeight: 600,
                      display: "flex",
                    }}
                  >
                    Status :
                    <NativeSelect
                      defaultValue={" "}
                      sx={{ marginLeft: 2 }}
                      inputProps={{
                        name: "",
                        id: "uncontrolled-native",
                      }}
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                    >
                      <option value={"applied"}>Applied</option>
                      <option value={"accepted"}>Accepted</option>
                      <option value={"rejected"}>Rejected</option>
                    </NativeSelect>
                  </Typography>
                </CardContent>
                <CardActions
                  style={{
                    marginTop: 25,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    size="large"
                    variant="contained"
                    onClick={() => {
                      goToNextTab("2");
                    }}
                  >
                    Back
                  </Button>
                  <Button size="large" type="submit" variant="contained">
                    Add
                  </Button>
                  {error && <Alert severity="error">{error.message} </Alert>}
                </CardActions>
              </Card>
            </TabPanel>
          </TabContext>
        </Box>
      </form>
    </StyledDiv>
  );
};

export default AddCandidateView;

const skillOptions = ["Docker", "Kubernetes", "DevOps", "React"];

const primaryRoleOptions = [
  "Full-Stack Engineer",
  "Frontend Engineer",
  "Backend Engineer",
  "DevOps Engineer",
  "Mobile Developer",
  "Data Engineer",
  "Data Scientist",
];
