import { useState, useEffect } from "react";
import './form.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";


function AccountForm() {
  const url = `http://localhost:5000/api/v1/accounts`
  const [client_id, setId] = useState("");
  const [name, setName] = useState("");
  const [initial_balance, setBalance] = useState("");
  const navigate = useNavigate();


 

  const onSubmit = async (e) => {
    e.preventDefault();
    const res=await axios.post(
        url + "/create-account",
        {client_id, name, initial_balance}
    )
    console.log(res.data)
    setName("");
    setId("")
    setBalance("");

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
          Add  New Account
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
                        Client id
                      </label>
                      <input
                        type="number"
                        name="id"
                        value={client_id}
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
                        Account name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder=" "
                        required
                      />
                  
                    </div>

                    <div className="balanceDiv">
                    <label
                        htmlFor="floating_amount"
                        className="label"
                      >
                        Initial amount
                      </label>
                      <input
                        type="number"
                        name="balance"
                        value={initial_balance}
                        onChange={(e) => setBalance(e.target.value)}
                        placeholder=" "
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="flex justify-center mb-5">
                      <button
                        type="submit"
                        className="submit">
                        <span className="addOne">
                          Add account
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
                  onClick={() => navigate("/accounts")}
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

export default AccountForm;