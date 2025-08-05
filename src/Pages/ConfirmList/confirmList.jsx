import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  Font,
} from "@react-pdf/renderer";
import NotoSansTamilRegular from "./NotoSansTamil-Regular.ttf";
import NotoSansTamilBold from "./NotoSansTamil-Bold.ttf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import "./confirmList.css";
import "../Order/order.css";

Font.register({
  family: "Noto Sans Tamil",
  fonts: [
    { src: NotoSansTamilRegular, fontWeight: "normal" },
    { src: NotoSansTamilBold, fontWeight: "bold" },
  ],
});

const ConfirmListPage = ({
  setSelectedItems,
  selectedItems,
  totalRate,
  setTotalRate,
  crackers,
  setCrackers,
  customerName,
  setCustomerName,
  customerNumber,
  setCustomerNumber,
  customerAddress,
  setCustomerAddress,
  customerState,
  setCustomerState,
  setDownloaded,
  downloaded,
  brand
}) => {
  const [selectedItemsPdf, setSelectedItemsPdf] = useState([]);
  // const [GiftBoxPdf, setGiftBoxPdf] = useState([]);

  const [isDownloaded, setIsDownloaded] = useState(false);
  let serialNumber = 0;
  let serialNumberPdf = 0;
  // let serialNumberGiftBox = 0;
  // let serialNumberGiftBoxPdf = 0;

  const scrollRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      const result = window.confirm(
        "Are you sure, want to start from the first page?"
      );
      if (result) {
        navigate("/");
      }
      // Otherwise, do nothing (cancel navigation)
    };

    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);

  const handleEdit = () => {
    navigate("/order");
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const isFormValid =
    customerName.trim() !== "" &&
    customerNumber.trim() !== "" &&
    customerAddress.trim() !== "" &&
    customerState.trim() !== "";

  const handleConfirmOrder = async () => {
    toast("Order submitted successfully!");
    confetti({
      particleCount: 200,
      spread: 160,
      origin: { y: 0.6 },
    });
    const selectedCrackers = crackers.flatMap((category) =>
      category.items
        .filter((item) => item.checked)
        .map((item) => ({
          ...item,
          category: category.category,
        }))
    );

    setSelectedItemsPdf(selectedCrackers);
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });

    const formUrl =
      "https://script.google.com/macros/s/AKfycbw5GhqEY7at54dkosbN4LCMID9_Q3qWew8hr20w8yj7MBpVl8W2lZgS7Rsuqn9guslS/exec?sheet=Hari Haran Trader's Customer";

    const formData = new URLSearchParams();
    formData.append("customerName", customerName);
    formData.append("customerNumber", customerNumber);
    formData.append("customerAddress", customerAddress);
    formData.append("customerState", customerState);
    formData.append("totalRate", totalRate);

    try {
      await fetch(formUrl, {
        method: "POST",
        mode: "no-cors", // this is required to bypass CORS
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      // alert("Your Details Send To Store!");
    } catch (error) {
      console.error("Submission error:", error);
      toast("Error submitting order.");
    }
  };

  // Group selected items by category
  const groupedItems = {};
  selectedItems.forEach((currentItem) => {
    if (!groupedItems[currentItem.category]) {
      groupedItems[currentItem.category] = [];
    }
    groupedItems[currentItem.category].push(currentItem);
  });

  // Function to clear the form
  const handleClearForm = () => {
    setCustomerName("");
    setCustomerNumber("");
    setCustomerAddress("");
    setCustomerState("");
    setCrackers([]);
    setSelectedItems([]);
    setTotalRate(0);
    // setAnotherTotalRate(0);
    // setGiftBoxCrackers([]);
    // setAnotherTable([]);
  };

  const handleDownloadComplete = () => {
    setIsDownloaded(true);
    handleClearForm();
    setDownloaded(!downloaded);
    setTimeout(() => {
      navigate("/order");
      window.location.reload();
    }, 3000);
  };

  const generateNumber = () => {
    const time = Date.now();
    return time;
  };

  const getOrderDate = () => {
    const today = new Date();
    const formattedDate = `${today.getDate()}/${
      today.getMonth() + 1
    }/${today.getFullYear()}`;
    return formattedDate;
  };

  return (
    <div>
      <div className="edit-container">
        <button className="edit-button" onClick={handleEdit}>
          <FontAwesomeIcon icon={faPen} />
        </button>
      </div>
      <div className="full-input-container">
        <div className="crackersGif-confirmList"></div>
        <div className="input-container-confirmList">
          <div className="customer-container-title">Customer Information</div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span className="input-fonts">Customer Name:</span>
            <div className="customer-inputbox-name-confirmList">
              {customerName}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span className="input-fonts">Customer Number:</span>
            <div className="customer-inputbox-confirmList">
              {customerNumber}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span className="input-fonts">Customer Address:</span>
            <div className="customer-inputbox-address-confirmList">
              {customerAddress}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span className="input-fonts">Customer Address:</span>
            <div className="customer-inputbox-address-confirmList">
              {customerState}
            </div>
          </div>
        </div>
      </div>

      <div className="list-container-confirmList">
        {selectedItems.length > 0 && (
          <table className="table" align="center" style={{ width: "85%" }}>
            <thead>
              <tr className="tablecell" style={{ fontSize: "14px" }}>
                <th className="tablecell">S.No</th>
                <th className="tablecell">Cracker Name</th>
                <th className="tablecell" style={{ fontSize: "13px" }}>
                  Qty
                </th>
                <th className="tablecell">{`${brand === 'ayyan' ? '50% Discount Rate' : '80% Discount Rate' }`}</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedItems).map((category, categoryIndex) => (
                <React.Fragment key={categoryIndex}>
                  {groupedItems[category].map((item, itemIndex) => {
                    serialNumber++; // Increment serial number for each item

                    return (
                      <tr
                        key={`${categoryIndex}-${itemIndex}`}
                        className="tableRow"
                        style={{ fontSize: "14px" }}
                      >
                        <td
                          className="tablecell"
                          style={{ textAlign: "center" }}
                        >
                          {serialNumber}
                        </td>{" "}
                        {/* Serial number column */}
                        <td className="tablecell" style={{ textAlign: "left" }}>
                          {item.name}
                          <div style={{ marginTop: "15px" }}>
                            {item.tamilName}
                          </div>
                        </td>
                        <td
                          className="tablecell"
                          style={{ textAlign: "center", width: "10%" }}
                        >
                          {item.quantity}
                        </td>
                        <td
                          className="tablecell"
                          style={{ textAlign: "center" }}
                        >
                          ₹{item.quantity * parseFloat(item.rate)}
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
              <tr>
                <td
                  colSpan="3"
                  style={{ fontWeight: "bold", backgroundColor: "#f1eeee" }}
                >
                  Total Amount
                </td>
                <td
                  className="tablecell"
                  style={{ fontWeight: "bold", backgroundColor: "#f1eeee" }}
                >
                  ₹{totalRate}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <div className="button-container-confirmList">
        <button
          className="Confirm-order"
          onClick={handleConfirmOrder}
          disabled={!isFormValid}
          style={{
            opacity: isFormValid ? 1 : 0.6,
            cursor: isFormValid ? "pointer" : "not-allowed",
          }}
        >
          Confirm Order
        </button>
      </div>

      {/* PDF Generation */}
      {selectedItemsPdf.length > 0 && (
        <PDFDownloadLink
          document={
            <Document>
              <Page
                style={{ borderWidth: 1, borderStyle: "solid", padding: 20 }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: 5,
                    textAlign: "center",
                  }}
                >
                  HariHaran Trader Sivakasi
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: 5,
                    textAlign: "center",
                  }}
                >
                  List Of Order Placed
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    marginBottom: 10,
                    textAlign: "center",
                    fontSize: "14px",
                    marginTop: 12,
                  }}
                >
                  Order Number: {generateNumber()}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Order
                  Date: {getOrderDate()}
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    marginBottom: 10,
                    textAlign: "center",
                    fontSize: "14px",
                    marginTop: 12,
                  }}
                >
                  Mobile Number: 9444324237
                </Text>
                <View>
                  {selectedItemsPdf.length > 0 && (
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 3,
                        backgroundColor: "#f1eeee",
                      }}
                    >
                      <Text
                        style={{
                          flex: 0.3,
                          textAlign: "center",
                          fontWeight: "bold",
                          borderWidth: 1,
                          borderColor: "black",
                          padding: 3,
                          fontSize: 13,
                        }}
                      >
                        S.No
                      </Text>
                      <Text
                        style={{
                          flex: 1,
                          textAlign: "center",
                          fontWeight: "bold",
                          borderWidth: 1,
                          borderColor: "black",
                          padding: 3,
                          fontSize: 13,
                        }}
                      >
                        Cracker Name
                      </Text>
                      <Text
                        style={{
                          flex: 1,
                          textAlign: "center",
                          fontWeight: "bold",
                          borderWidth: 1,
                          borderColor: "black",
                          padding: 3,
                          fontSize: 13,
                        }}
                      >
                        Tamil Cracker Name
                      </Text>
                      <Text
                        style={{
                          flex: 0.3,
                          textAlign: "center",
                          fontWeight: "bold",
                          borderWidth: 1,
                          borderColor: "black",
                          padding: 3,
                          fontSize: 13,
                        }}
                      >
                        Qty
                      </Text>
                      <Text
                        style={{
                          flex: 1,
                          textAlign: "center",
                          fontWeight: "bold",
                          borderWidth: 1,
                          borderColor: "black",
                          padding: 3,
                          fontSize: 13,
                        }}
                      >
                        {`${brand === 'ayyan' ? '50% Discount Rate Per Box' : '80% Discount Rate Per Box' }`}
                      </Text>
                      <Text
                        style={{
                          flex: 1,
                          textAlign: "center",
                          fontWeight: "bold",
                          borderWidth: 1,
                          borderColor: "black",
                          padding: 3,
                          fontSize: 13,
                        }}
                      >
                        Amount
                      </Text>
                    </View>
                  )}

                  {selectedItemsPdf.length > 0 &&
                    Object.keys(groupedItems).map((category, categoryIndex) => (
                      <View key={categoryIndex}>
                        {groupedItems[category].map((item, itemIndex) => {
                          serialNumberPdf++;

                          return (
                            <View
                              key={`${categoryIndex}-${itemIndex}`}
                              style={{ flexDirection: "row" }}
                            >
                              <Text
                                style={{
                                  flex: 0.3,
                                  textAlign: "center",
                                  borderWidth: 1,
                                  borderColor: "black",
                                  padding: 3,
                                  fontSize: 11,
                                }}
                              >
                                {serialNumberPdf}
                              </Text>{" "}
                              {/* Serial number column */}
                              <Text
                                style={{
                                  flex: 1,
                                  textAlign: "left",
                                  borderWidth: 1,
                                  borderColor: "black",
                                  padding: 3,
                                  fontSize: 11,
                                }}
                              >
                                {item.name}
                              </Text>
                              <Text
                                style={{
                                  flex: 1,
                                  textAlign: "left",
                                  borderWidth: 1,
                                  borderColor: "black",
                                  padding: 3,
                                  fontSize: 11,
                                  fontFamily: "Noto Sans Tamil",
                                }}
                              >
                                {item.tamilName}
                              </Text>
                              <Text
                                style={{
                                  flex: 0.3,
                                  textAlign: "center",
                                  borderWidth: 1,
                                  borderColor: "black",
                                  padding: 3,
                                  fontSize: 11,
                                }}
                              >
                                {item.quantity}
                              </Text>
                              <Text
                                style={{
                                  flex: 1,
                                  textAlign: "center",
                                  borderWidth: 1,
                                  borderColor: "black",
                                  padding: 3,
                                  fontSize: 11,
                                }}
                              >
                                {item.rate}
                              </Text>
                              <Text
                                style={{
                                  flex: 1,
                                  textAlign: "center",
                                  borderWidth: 1,
                                  borderColor: "black",
                                  padding: 3,
                                  fontSize: 11,
                                }}
                              >
                                {(item.quantity * item.rate).toFixed(2)}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                    ))}

                  {/* Total amount and total amount with discount */}
                  {selectedItems.length > 0 && (
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        marginTop: 17,
                      }}
                    >
                      Total Amount: {totalRate.toFixed(2)}
                    </Text>
                  )}
                </View>

                <Text
                  style={{
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#f1eeee",
                    fontSize: "15px",
                    minHeight: "22px",
                    marginTop: "40px",
                  }}
                >
                  Customer Information
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    marginTop: 10,
                    fontWeight: "bold",
                    wordBreak: "break-word",
                    width: "75%",
                  }}
                >
                  Customer Name : {customerName}
                </Text>
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", marginTop: 6 }}
                >
                  Customer Number : {customerNumber}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    wordBreak: "break-word",
                    width: "75%",
                    marginTop: 6,
                  }}
                >
                  Customer Address : {customerAddress}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    wordBreak: "break-word",
                    width: "75%",
                    marginTop: 6,
                  }}
                >
                  Customer State : {customerState}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    wordBreak: "break-word",
                    width: "75%",
                    marginTop: 15,
                  }}
                >
                  Overall Total Amount : {totalRate}
                </Text>
              </Page>
            </Document>
          }
          fileName={"Ordered-List"}
          onClick={handleDownloadComplete}
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              <div className="download-container">Loading document...</div>
            ) : (
              <div className="pdf-download-btn-container">
                <button className="pdf-download-btn">
                  {isDownloaded
                    ? " "
                    : "Download PDF and send it to our WhatsApp Number"}
                </button>
              </div>
            )
          }
        </PDFDownloadLink>
      )}

      <div style={{ height: "100px" }} ref={scrollRef}></div>
    </div>
  );
};

export default ConfirmListPage;
