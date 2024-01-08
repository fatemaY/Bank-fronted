import {
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    Paper,
    Slide,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import "./account.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import BasicModal from "../../components/BasicModal/BasicModal";
// import { useAuth } from "../../context/AuthContext";

export default function Account() {
    const url = `http://localhost:5000/api/v1/accounts`;
    const [displayedData, setDisplayedData] = useState([]);
    const [errorAlert, setErrorAlert] = useState("");
    const navigate = useNavigate();
    // const { logout } = useAuth();
    const minRef = useRef();
    const maxRef = useRef();

    const handleUsersClick = async (type, id = "")=> {
        switch (type) {
            case "/":
                await axios
                    .get(url + "/get-all-accounts")
                    .then((res) => setDisplayedData(res.data))
                    .catch((error) =>
                        setErrorAlert(error.response.data.message)
                    );
                break;
            // case "/users/active":
            //     await axios
            //         .get(url + type)
            //         .then((res) => setDisplayedData(res.data))
            //         .catch((error) =>
            //             setErrorAlert(error.response.data.message)
            //         );
            //     break;
            // case "/users/inactive":
            //     await axios
            //         .get(url + type)
            //         .then((res) => setDisplayedData(res.data))
            //         .catch((error) =>
            //             setErrorAlert(error.response.data.message)
            //         );
            //     break;
            case "/delete-account":
                await axios
                    .delete(url + type + `/${id}`)
                    .then(() => {
                        fetchData();
                        setErrorAlert("User Was Deleted Successfully");
                    })
                    .catch((error) =>
                        setErrorAlert(error.response.data.message)
                    );
                break;
            default:
                break;
        }
    };
   
    const handleFilterClick = async (type) => {
        let min = parseInt(minRef.current.value);
        let max = parseInt(maxRef.current.value);
        const currParams = { filterType: type, min, max };
        if (type==="balance") {
            // case "cash":
            //     await axios
            //         .get(url + "/filter" + `/by`, { params: currParams })
            //         .then((res) => setDisplayedData(res.data))
            //         .catch((error) =>
            //             setErrorAlert(error.response.data.message)
            //         );
            //     break;
            // case "credit":
            //     await axios
            //         .get(url + "/filter" + `/by`, { params: currParams })
            //         .then((res) => setDisplayedData(res.data))
            //         .catch((error) =>
            //             setErrorAlert(error.response.data.message)
            //         );
            //     break;
                await axios
                    .get(url + "/filter" + `/by`, { params: currParams })
                    .then((res) => setDisplayedData(res.data))
                    .catch((error) =>
                        setErrorAlert(error.response.data.message)
                    );
        }
    };
    const fetchData = async () => {
        await axios
            .get(url + "/get-all-accounts")
            .then((res) => setDisplayedData(res.data))
            .catch((error) => setErrorAlert(error.response.data.message));
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Slide in direction="up">
            <div className="UsersController Page">
                <Button
                    sx={{ position: "absolute", left: "8px", top: "8px" }}
                    variant="contained"
                    color="error"
                    onClick={() => navigate("/")}
                >
                    Logout
                </Button>
              
                <div className="controller">
                    <Button
                        variant="contained"
                        sx={{ width: "300px",height: "50px" }}
                        onClick={() => {
                            handleUsersClick("/");
                        }}
                    >
                        Show All Users
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ width: "300px",height: "50px" }}
                        onClick={() => navigate("/transactions")}
                    >
                        Show All Transactions
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ width: "300px" , height: "50px"}}
                        onClick={() => navigate("/form")}
                    >
                        Create New Account
                    </Button>
                    
                </div>
                <div className="filter">
                    <Typography variant="h4">Filter Users</Typography>
                    <div className="filter-actions">
                        <FormControl
                            sx={{ m: 1, width: "200px" }}
                            variant="outlined"
                        >
                            <InputLabel htmlFor="outlined-adornment-minimum">
                                Minimum
                            </InputLabel>
                            <OutlinedInput
                                required
                                id="outlined-adornment-minimum"
                                label="Minimum"
                                inputRef={minRef}
                                type="text"
                                size="large"
                            />
                        </FormControl>
                        <FormControl
                            sx={{ m: 1, width: "200px" }}
                            variant="outlined"
                        >
                            <InputLabel htmlFor="outlined-adornment-maximum">
                                Maximum
                            </InputLabel>
                            <OutlinedInput
                                required
                                id="outlined-adornment-maximum"
                                label="Maximum"
                                inputRef={maxRef}
                                type="text"
                                size="large"
                            />
                        </FormControl>
                        {/* <Button
                            variant="contained"
                            onClick={() => handleFilterClick("cash")}
                        >
                            Filter By Cash
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => handleFilterClick("credit")}
                        >
                            Filter By Credit
                        </Button> */}
                        <Button
                            variant="contained"
                            onClick={() => handleFilterClick("balance")}
                        >
                            Filter By Total Balance
                        </Button>
                    </div>
                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>DB ID</TableCell>
                                <TableCell>Client ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell>Balance</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayedData.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>{user._id}</TableCell>
                                    <TableCell>{user.client_id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.createdAt}</TableCell>
                                    <TableCell>{user.initial_balance}</TableCell>
                                    {/* <TableCell>
                                        {/* <Button
                                            onClick={() =>
                                                handleActivation(
                                                    user._id,
                                                    user.isActive
                                                )
                                            }
                                            variant="contained"
                                            color={
                                                user.isActive
                                                    ? "success"
                                                    : "warning"
                                            }
                                        >
                                            {user.isActive
                                                ? "Active"
                                                : "Not Active"}
                                        </Button> */}
                                    {/* </TableCell> * */}
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() =>
                                                handleUsersClick(
                                                    "/delete-account",
                                                    user._id
                                                )
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* {errorAlert && (
                    <BasicModal msg={errorAlert} setMsg={setErrorAlert} />
                )} */}
            </div>
        </Slide>
    );
}