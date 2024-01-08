import { useState, useEffect } from "react";
import './form.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";


function TransactionForm() {
  const url = `http://localhost:5000/api/v1/transactions`
  const [account_id, setId] = useState("");
  const [transaction_amount, setAmount] = useState(0);
  const [transaction_type, setType] = useState("");
  const [transfer_to, setTo] = useState("");

  const navigate = useNavigate();



  const onSubmit = async (e) => {
    e.preventDefault();
    const res=await axios.post(
        url + "/create-transaction",
        { account_id, transaction_amount, transaction_type, transfer_to }
    )
    console.log(res.data)
    setAmount("");
    setId("")
    setType("");
    setTo("")

  }

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success(message);
//     }
//     if (isError) {
//       toast.error(message);
//     }
//     return () => {
//       form.reset()
//     };
//   }, [isError, isSuccess, message, dispatch]);

//   if (isLoading) {
//     return <Spinner />;
//   }
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="modal">
        
          <div className="modal-box">
          <label htmlFor="my-modal" className="btn btn-success my-5 ">
          Add  New Transacation
        </label>
            <div className="mt-10">
              <section className="form">
                <form onSubmit={onSubmit}>
                  <div className="form-group">

                  <div className="idDiv">
                  <label
                        htmlFor="id"
                        className="label"
                      >
                        Account id
                      </label>
                      <input
                        type="text"
                        name="id"
                        value={account_id}
                        onChange={(e) => setId(e.target.value)}
                        placeholder=" "
                        required
                      />
                    </div>



                    <div className="nameDiv">
                    <label
                        htmlFor="floating_name"
                        className="label"
                      >
                        Transaction Amount
                      </label>
                      <input
                        type="Number"
                        name="amount"
                        value={transaction_amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder=" "
                        required
                      />
                  
                    </div>

                    <div className="balanceDiv">
                    <label
                        htmlFor="floating_amount"
                        className="label"
                      >
                        transaction_type
                      </label>
                      <input
                        type="text"
                        name="transaction_type"
                        value={transaction_type}
                        onChange={(e) => setType(e.target.value)}
                        placeholder=" "
                        required
                      />
                    </div>
                    <div className="balanceDiv">
                    <label
                        htmlFor="floating_amount"
                        className="label"
                      >
                        Transfet To
                      </label>
                      <input
                        type="text"
                        name="transfer_to"
                        value={transfer_to}
                        onChange={(e) => setTo(e.target.value)}
                        placeholder=" "
                      />
                    </div>





                  </div>

                  <div className="form-group">
                    <div className="flex justify-center mb-5">
                      <button
                        type="submit"
                        className="submit">
                        <span className="addOne">
                          Add Transaction
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </section>
              <div className="modal-action">
                <button
                  htmlFor="my-modal"
                  className="closeModal"
                  onClick={() => navigate("/transactions")}
                >
                  close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TransactionForm;