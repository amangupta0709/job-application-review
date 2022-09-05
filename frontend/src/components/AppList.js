import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, IconButton, Menu, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const StyledDiv = styled("div")(() => ({
  position: "absolute",
  marginTop: -22,
  marginLeft: 300,
  top: 90,
}));

const BASE_URL = "http://127.0.0.1:8002";

const Dashboard = () => {
  const navigate = useNavigate();
  const [res, setRes] = useState("");
  const [status, setStatus] = useState("");
  const [deleteUser, setDeleteUser] = useState("");

  useEffect(() => {
    getData();
  }, [status, deleteUser]); // eslint-disable-line react-hooks/exhaustive-deps

  const getData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/candidate/`);
      setRes(response.data);
    } catch {
      setRes("Something went wrong");
    }
  };

  const ResumeButton = (params) => {
    return (
      <div>
        {params.row.resume ? (
          <Button variant="contained" href={BASE_URL + params.row.resume}>
            View
          </Button>
        ) : (
          "Not provided"
        )}
      </div>
    );
  };

  const StatusChip = (params) => {
    return (
      <div>
        {params.row.status === "accepted" && (
          <Chip label="Accepted" color="success" />
        )}
        {params.row.status === "rejected" && (
          <Chip label="Rejected" color="error" />
        )}
        {params.row.status === "applied" && (
          <Chip label="Applied" color="primary" variant="outlined" />
        )}
      </div>
    );
  };

  const MoreOptionsButton = (params) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const changeStatusofCandidate = async (e) => {
      let patchData = { data: {} };
      if (e.target.innerText === "Accept") {
        patchData["data"] = { status: "accepted" };
      } else if (e.target.innerText === "Reject") {
        patchData["data"] = { status: "rejected" };
      }

      axios
        .patch(`${BASE_URL}/candidate/${params.row.id}/`, patchData)
        .then((response) => {
          console.log(response.data);
          setStatus(patchData["data"]["status"]);
        });
    };

    const handleViewMore = (event) => {
      event.preventDefault();
      event.stopPropagation();
      navigate(`/candidate/${params.row.id}`);
    };

    return (
      <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: "20ch",
            },
          }}
        >
          <MenuItem onClick={handleViewMore}>
            {" "}
            <Typography variant={"body"}>View Details</Typography>{" "}
          </MenuItem>
          {(params.row.status === "rejected" ||
            params.row.status === "applied") && (
            <MenuItem
              onClick={(e) => {
                changeStatusofCandidate(e);
              }}
            >
              <Typography color={"green"} variant={"body"}>
                Accept
              </Typography>
            </MenuItem>
          )}
          {(params.row.status === "accepted" ||
            params.row.status === "applied") && (
            <MenuItem
              onClick={(e) => {
                changeStatusofCandidate(e);
              }}
            >
              <Typography color={"red"} variant={"body"}>
                Reject
              </Typography>
            </MenuItem>
          )}
        </Menu>
      </div>
    );
  };

  const columns = [
    {
      field: "fullName",
      headerName: "Full Name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 250,
      valueGetter: (params) =>
        `${params.row.first_name || ""} ${params.row.last_name || ""}`,
    },
    {
      field: "primary_role",
      headerName: "Role",
      width: 200,
      editable: false,
    },
    {
      field: "resume",
      headerName: "Resume",
      width: 200,
      renderCell: ResumeButton,
      sortable: false,
      disableClickEventBubbling: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 110,
      renderCell: StatusChip,
      disableClickEventBubbling: true,
    },

    {
      field: "moreOptions",
      headerName: "",
      width: 2,
      renderCell: MoreOptionsButton,
      disableClickEventBubbling: true,
    },
  ];

  const addlink = (props) => <Link to="/addcandidate" {...props} />;

  return (
    <StyledDiv>
      <h1>Candidates List</h1>
      <div style={{ height: 550, width: 870, textAlign: "center" }}>
        <DataGrid
          rows={res}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
      <Button component={addlink} color="primary">
        Add New Candidate
      </Button>
    </StyledDiv>
  );
};

export default Dashboard;
