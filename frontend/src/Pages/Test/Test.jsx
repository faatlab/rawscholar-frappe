// import React, { useEffect, useState } from "react";
// import {
//   useFrappeCreateDoc,
//   useFrappeDocTypeEventListener,
//   useFrappeDocumentEventListener,
//   useFrappeGetDoc,
//   useFrappeGetDocList,
//   useFrappeUpdateDoc,
// } from "frappe-react-sdk";


const Test = () => {
  const makePayment = async () => {
    const response = await fetch("/api/create-razorpay-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 30000,
        name: "<CUSTOMER NAME>",
        email: "<CUSTOMER EMAIL>",
        contact: "<CUSTOMER PHONE>",
        reference_doctype: "Conference Participant", // real doctype kodkkanam
        reference_docname: "12345", // reference docname
        receipt: "12345", // receipt ID
      }),
    });

    const data = await response.json();
    console.log(data);

    const options = {
      key: "rzp_test_fmwd3K6TrfIbAA",
      amount: 1000,
      currency: "INR",
      name: "<CHECKOUT MODAL TITLE>",
      description: "<CHECKOUT MODAL DESCRIPTION>",
      image: "<CHECKOUT MODAL LOGO>",
      order_id: data.id,
      handler: function (response) {
        console.log(response);
        alert("Payment successful!");
      },
      prefill: {
        name: data.name,
        email: data.email,
        contact: data.contact,
      },
      theme: {
        color: "<MODAL COLOR>",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // ------------------------------------------------Chat-----------------------------------------

  // const { data, isLoading, mutate, error } = useFrappeGetDoc(
  //   "Chat",
  //   "ajay@mail.com"
  // );

  // const { updateDoc } = useFrappeUpdateDoc();

  // const [message, setMessage] = useState("");
  // const [chat, setChat] = useState([]);

  // useEffect(() => {
  //   if (data)
  //     setChat([
  //       ...data.chat,
  //       {
  //         parent: "ajay@mail.com",
  //         parentfield: "chat",
  //         parenttype: "Chat",
  //         sender: "Ajay",
  //         message,
  //       },
  //     ]);
  // }, [message]);

  // const handleChat = () => {
  //   updateDoc("Chat", "ajay@mail.com", {
  //     chat,
  //   }).then(() => {
  //     console.log("Kittikkaaa");
  //     // mutate();
  //   });
  // };

  // useFrappeDocumentEventListener("Chat", "ajay@mail.com", (d) => {
  //   console.log(d);
  //   if (d.docname === "ajay@mail.com") mutate();
  // });

  // --------------------------------------------------------------------------------------------------

  return (
    <>
      <div>
      <button
        className="mt-2 w-100"
        style={{ fontSize: "25px" }}
        onClick={() => makePayment()}
      >
        Pay
      </button>
    </div>
      {/* {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <div className="container card">
          <div className="d-flex justify-content-between">
            <h1>Student : {data?.student}</h1>
            <h1>Counsellor : {data?.counsellor}</h1>
          </div>
          <div style={{ height: "500px", overflowY: "scroll" }}>
            {data?.chat.map((c) =>
              c.sender == "Ajay" ? (
                <div key={c.name} className="d-flex justify-content-start">
                  <p
                    className="rounded-pill px-3 py-2"
                    style={{ backgroundColor: "grey", color: "white" }}
                  >
                    {c.message}
                  </p>
                </div>
              ) : (
                <div key={c.name} className="d-flex justify-content-end">
                  <p
                    className="rounded-pill px-3 py-2"
                    style={{ backgroundColor: "blue", color: "white" }}
                  >
                    {c.message}
                  </p>
                </div>
              )
            )}
          </div>
          <div>
            <input
              type="text"
              name="message"
              onChange={(e) => setMessage(e.target.value)}
              className="inputBox"
            />
            <button
              className="btn btn-success rounded-pill"
              onClick={() => handleChat()}
            >
              Send
            </button>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Test;
