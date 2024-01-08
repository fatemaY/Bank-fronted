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
import "../accountController/account.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import BasicModal from "../../components/BasicModal/BasicModal";
// import { useAuth } from "../../context/AuthContext";

export default function Transaction() {
    const url = `http://localhost:5000/api/v1/transactions`;
    const [displayedData, setDisplayedData] = useState([]);
    const [errorAlert, setErrorAlert] = useState("");
    const navigate = useNavigate();
    // const { logout } = useAuth();
    const maxRef = useRef();

    const handleUsersClick = async (type) => {
        switch (type) {
            case "/":
                await axios
                    .get(url + "/get-transactions")
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
            case "/delete-transaction":
                await axios
                    .delete(url + type + `/${id}`)
                    .then(() => {
                        fetchData();
                        setErrorAlert("Transaction Was Deleted Successfully");
                    })
                    .catch((error) =>
                        setErrorAlert(error.response.data.message)
                    );
                break;
            default:
                break;
        }
    };
 
    const handleFilterClick = async () => {
        let max = maxRef.current.value;
        const currParams = { filterType: max};
        console.log(currParams)
        await axios
            .get(url + "/filterByType", { params: currParams })
            .then((res) => setDisplayedData(res.data))
            .catch((error) =>
             setErrorAlert(error.response.data.message)
            );
        
    }




    const fetchData = async () => {
        await axios
            .get(url + "/get-transactions")
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
                        Show All Transactions
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ width: "300px" , height: "50px"}}
                        onClick={() => navigate("/transactionForm")}
                    >
                        Create New Transaction
                    </Button>
                    
                </div>
                <div className="filter">
                    <Typography variant="h4">Filter transactions</Typography>
                    <div className="filter-actions">
                            <InputLabel htmlFor="outlined-adornment-maximum">
                                Transfer/Withdrawal
                            </InputLabel>
                            <OutlinedInput
                                required
                                id="outlined-adornment-maximum"
                                label="type"
                                inputRef={maxRef}
                                type="text"
                                size="large"
                            />
                        
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
                            onClick={() => handleFilterClick()}
                        >
                            Filter By Type
                        </Button>
                    </div>
                  





                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>DB ID</TableCell>
                                <TableCell>Client ID</TableCell>
                                <TableCell>Transaction Date</TableCell>
                                <TableCell>Transaction Amount</TableCell>
                                <TableCell>Transaction Type</TableCell>
                                <TableCell>From</TableCell>
                                <TableCell>To</TableCell>
                                <TableCell>Balance</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayedData.map((transaction) => (
                                <TableRow key={transaction._id}>
                                    <TableCell>{transaction._id}</TableCell>
                                    <TableCell>{transaction.client_id}</TableCell>
                                    <TableCell>{transaction.transaction_date}</TableCell>
                                    <TableCell>{transaction.transaction_amount}</TableCell>
                                    <TableCell>{transaction.transaction_type}</TableCell>
                                    <TableCell>{transaction.transfer_from}</TableCell>
                                    <TableCell>{transaction.transfer_to}</TableCell>
                                    <TableCell>{transaction.balance}</TableCell>
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
                                                    "/delete-transaction",
                                                    transaction._id
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