import React from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { toast } from "react-toastify";

import "./order.css";

const Order = ({
  setSelectedItems,
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
  brand,
  setBrand,
  loading,
  setLoading,
}) => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = React.useState(null);

  // Function to handle quantity change
  const handleQuantityChange = (categoryIndex, itemIndex, quantity) => {
    const updatedCrackers = crackers.map((category, cIndex) => {
      if (cIndex === categoryIndex) {
        const updatedItems = category.items.map((item, iIndex) => {
          if (iIndex === itemIndex) {
            return { ...item, quantity };
          }
          return item;
        });
        return { ...category, items: updatedItems };
      }
      return category;
    });
    setCrackers(updatedCrackers);
    calculateTotalRate(updatedCrackers);
  };

  // Function to calculate total rate
  const calculateTotalRate = (crackersList) => {
    let total = 0;
    crackersList.forEach((category) => {
      category.items.forEach((item) => {
        const quantity = parseInt(item.quantity) || 0;
        const rate = parseFloat(item.rate) || 0;
        total += quantity * rate;
      });
    });

    setTotalRate(total);
  };

  const handleCheckboxChange = (categoryIndex, itemIndex) => {
    const updatedCrackers = crackers.map((category, cIndex) => {
      if (cIndex === categoryIndex) {
        const updatedItems = category.items.map((item, iIndex) => {
          if (iIndex === itemIndex) {
            // Toggle the checked status
            const updatedItem = { ...item, checked: !item.checked };
            // If the item is unchecked, set its quantity to 0
            if (!updatedItem.checked) {
              updatedItem.quantity = 0;
            }
            return updatedItem;
          }
          return item;
        });
        return { ...category, items: updatedItems };
      }
      return category;
    });

    setCrackers(updatedCrackers);

    // Recalculate total rate after updating checkboxes
    calculateTotalRate(updatedCrackers);
  };

  const handleSubmit = () => {
    // Check if customer name, number, and address are valid
    const isNameValid = customerName.trim().length > 0;
    const isNumberValid = /^[0-9]{10}$/.test(customerNumber);
    const isAddressValid = customerAddress.trim().length > 0;
    const isStateValid = customerState === "Tamil Nadu"; // Assuming "customerState" holds the selected state

    // Check if any item is selected without choosing the quantity for regular crackers
    const invalidItems = [];
    const isQuantityValid = crackers.every((category) => {
      return category.items.every((item) => {
        if (item.checked && (!item.quantity || item.quantity <= 0)) {
          invalidItems.push(item.name);
          return false;
        }
        return true;
      });
    });

    // Construct the error message for regular crackers quantity validation
    let quantityErrorMessage = "";
    if (invalidItems.length > 0) {
      quantityErrorMessage = `Please select quantity for the following items: ${invalidItems.join(
        ", "
      )}.\n`;
    }

    // Check if at least one item is selected from either crackers or giftBoxCrackers
    const isCrackerChosen = crackers.some((category) =>
      category.items.some((item) => item.checked)
    );
    // const isGiftBoxCrackerChosen = giftBoxCrackers.some(category => category.items.some(item => item.checked));

    // Check if all validations pass including the requirement of choosing at least one cracker and valid state
    if (
      isNameValid &&
      isNumberValid &&
      isAddressValid &&
      isStateValid &&
      isQuantityValid &&
      isCrackerChosen
    ) {
      // Here you can implement your submission logic
      toast("Kindly Confirm Your Order");
      const selectedCrackers = crackers.flatMap((category) =>
        category.items
          .filter((item) => item.checked)
          .map((item) => ({ ...item, category: category.category }))
      );

      // const selectedGiftBoxCrackers = giftBoxCrackers.flatMap(category =>
      //     category.items.filter(item => item.checked).map(item => ({ ...item, category: category.category }))
      // );

      // setAnotherTable(selectedGiftBoxCrackers);
      setSelectedItems(selectedCrackers);
      navigate("/confirmList");
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    } else {
      // If validation fails, show an alert with specific error messages
      let errorMessage = "";
      if (!isNameValid) {
        errorMessage += "Please enter the name.\n";
      }
      if (!isNumberValid) {
        errorMessage +=
          "Please enter a valid 10-digit number for the contact number.\n";
      }
      if (!isAddressValid) {
        errorMessage += "Please enter the address.\n";
      }
      if (!isStateValid) {
        errorMessage += "Please select a valid state (Tamil Nadu).\n";
      }
      errorMessage += quantityErrorMessage;
      // errorMessage += giftBoxQuantityErrorMessage;

      // Add error message for not choosing at least one cracker type
      if (!isCrackerChosen) {
        errorMessage +=
          "Please choose at least one item from either crackers\n";
      }

      // toast(errorMessage);
      toast(
        <div style={{ textAlign: "left", lineHeight: "1.6" }}>
          {errorMessage.split("\n").map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
      );
    }
  };
  const getImagePathByIndex = (index) => {
    return `/images/${brand}-crackers/${index + 1}.jpg`;
  };

  return (
    <div className="full-container">
      <div className="content-container">
        <div className="sub-heading">
          <h4 className="font-style-sub-heading">
            Explore Our Product Catalogue and Place Your Order Today!
          </h4>
          {/* <div className='font-style-sub-heading-discount'></div> */}
        </div>
        <div className="sub-container">
          <div className="gif-containers">
            <div className="crackers-gif1"></div>
            <div className="input-container">
              <div className="customer-container-title">
                Customer Information
              </div>
              <div className="input-container-informations">
                <span className="input-fonts">Customer Name:</span>
                <input
                  autoFocus
                  className="customer-inputbox-name"
                  type="text"
                  placeholder="Enter Your Name...."
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div className="input-container-informations">
                <span className="input-fonts">Customer Number:</span>
                <input
                  className="customer-inputbox"
                  type="number"
                  placeholder="Enter Your Contact Number...."
                  value={customerNumber}
                  onChange={(e) => setCustomerNumber(e.target.value)}
                />
              </div>
              <div className="input-container-informations-address">
                <span className="input-fonts">Customer Address:</span>
                <input
                  className="customer-inputbox-address"
                  type="text"
                  placeholder=" Enter Yout Address...."
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                />
              </div>
              <div className="input-container-informations-state">
                <span className="input-fonts">Customer State:</span>
                <select
                  className="customer-inputbox-state"
                  value={customerState}
                  onChange={(e) => {
                    setCustomerState(e.target.value);
                  }}
                >
                  <option value="Choose State">Choose State</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                </select>
              </div>
            </div>
          </div>
          <div className="list-container">
            {loading || crackers.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "300px",
                }}
              >
                <BarLoader
                  color="#ff5722"
                  width={300} // 👈 Bigger width here
                  height={8}
                  speedMultiplier={1.5}
                />
                <p
                  style={{
                    marginTop: "20px",
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#444",
                    fontFamily: "Arial",
                  }}
                >
                  Loading crackers, please wait...
                </p>
              </div>
            ) : (
              <>
                <div
                  className="brand-switch"
                  style={{ textAlign: "center", margin: "20px 0" }}
                >
                  {/* <button
                    onClick={() => {
                      setLoading(true);
                      setBrand("hariharan");
                      // Optionally simulate delay
                      setTimeout(() => setLoading(false), 500);
                    }}
                    className={`brand-btn ${
                      brand === "hariharan" ? "active" : ""
                    }`}
                  >
                    Hariharan Trader Crackers (80% offer)
                  </button>

                  <button
                    onClick={() => {
                      setLoading(true);
                      setBrand("ayyan");
                      // Optionally simulate delay
                      setTimeout(() => setLoading(false), 500);
                    }}
                    className={`brand-btn ${brand === "ayyan" ? "active" : ""}`}
                    style={{ marginLeft: "10px" }}
                  >
                    Ayyan Crackers (50% offer)
                  </button> */}
                  <div className="brand-buttons-wrapper">
                    <button
                      onClick={() => {
                        setLoading(true);
                        setBrand("hariharan");
                        setTimeout(() => setLoading(false), 500);
                      }}
                      className={`brand-btn ${
                        brand === "hariharan" ? "active" : ""
                      }`}
                    >
                      Hariharan Trader Crackers
                      <span className="discount-badge">80% Discount</span>
                    </button>

                    <button
                      onClick={() => {
                        setLoading(true);
                        setBrand("ayyan");
                        setTimeout(() => setLoading(false), 500);
                      }}
                      className={`brand-btn ${
                        brand === "ayyan" ? "active" : ""
                      }`}
                    >
                      Ayyan Crackers
                      <span className="discount-badge">50% Discount</span>
                    </button>
                  </div>
                </div>

                <table
                  className="table"
                  align="center"
                  style={{ width: "85%" }}
                >
                  <thead>
                    <tr className="tablecell" style={{ fontSize: "14px" }}>
                      <th className="tablecell">Select Items</th>
                      <th className="tablecell">Cracker Name</th>
                      <th className="tablecell">Quantity</th>
                      <th className="tablecell">Original Rate</th>
                      {/* <th className="tablecell">80% Discount Rate</th> */}
                      <th className="tablecell">
                        {brand === "hariharan" ? "80%" : "50%"} Discount Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {crackers.map((category, categoryIndex) => (
                      <React.Fragment key={categoryIndex}>
                        <tr className="tableRow" style={{ fontSize: "14px" }}>
                          <td
                            colSpan="5"
                            style={{
                              fontWeight: "bold",
                              backgroundColor: "#f1eeee",
                            }}
                          >
                            {category.category}
                          </td>
                        </tr>

                        {category.items.map((item, itemIndex) => {
                          const globalIndex =
                            crackers
                              .slice(0, categoryIndex)
                              .reduce((acc, cat) => acc + cat.items.length, 0) +
                            itemIndex;

                          return (
                            <tr
                              key={`${categoryIndex}-${itemIndex}`}
                              className="tableRow"
                            >
                              <td
                                className="tablecell"
                                style={{ textAlign: "center" }}
                              >
                                <div className="checkbox-input-container">
                                  <input
                                    type="checkbox"
                                    checked={item.checked || false}
                                    onChange={() =>
                                      handleCheckboxChange(
                                        categoryIndex,
                                        itemIndex
                                      )
                                    }
                                  />
                                </div>
                              </td>

                              <td
                                className="tablecell"
                                style={{
                                  textAlign: "left",
                                  letterSpacing: "-1.1px",
                                }}
                              >

                                <img
                                  src={`/images/${brand}-crackers/${
                                    globalIndex + 1
                                  }.jpg`}
                                  alt={item.name}
                                  loading="lazy"
                                  style={{
                                    width: "60px",
                                    height: "60px",
                                    objectFit: "cover",
                                    marginBottom: "8px",
                                    borderRadius: "6px",
                                    display: "block",
                                    cursor: "pointer",
                                  }}
                                  onClick={(e) => setPreviewImage(e.target.src)}
                                  onError={(e) => {
                                    // If JPG fails, try PNG
                                    const fallbackPng = `/images/${brand}-crackers/${
                                      globalIndex + 1
                                    }.png`;
                                    if (!e.target.src.endsWith(".png")) {
                                      e.target.src = fallbackPng;
                                    } else {
                                      // If PNG also fails, show no-image
                                      e.target.src =
                                        "/images/crackers/no-image.jpg";
                                    }
                                  }}
                                />

                                <div>{item.name}</div>
                                <div
                                  style={{ marginTop: "5px", color: "#666" }}
                                >
                                  {item?.tamilName}
                                </div>
                              </td>

                              <td
                                className="tablecell"
                                style={{ textAlign: "center" }}
                              >
                                <select
                                  className="dropdown-input-container"
                                  disabled={!item.checked}
                                  value={item.quantity || ""}
                                  onChange={(e) =>
                                    handleQuantityChange(
                                      categoryIndex,
                                      itemIndex,
                                      parseInt(e.target.value)
                                    )
                                  }
                                >
                                  <option value="">Select Quantity</option>
                                  {[...Array(101).keys()].map((num) =>
                                    num === 0 ? null : (
                                      <option key={num} value={num}>
                                        {num}
                                      </option>
                                    )
                                  )}
                                </select>
                              </td>

                              <td
                                className="tablecell"
                                style={{
                                  textAlign: "center",
                                  textDecoration: "line-through",
                                }}
                              >
                                ₹{parseFloat(item.originalRate)}
                              </td>

                              <td
                                className="tablecell"
                                style={{ textAlign: "center" }}
                              >
                                ₹
                                {item.quantity
                                  ? item.quantity * parseFloat(item.rate)
                                  : parseFloat(item.rate)}
                              </td>
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    ))}

                    <tr>
                      <td
                        colSpan="4"
                        style={{
                          fontWeight: "bold",
                          backgroundColor: "#f1eeee",
                        }}
                      >
                        Total Amount
                      </td>
                      <td
                        className="tablecell"
                        style={{
                          fontWeight: "bold",
                          backgroundColor: "#f1eeee",
                        }}
                      >
                        ₹{totalRate}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="button-container">
                  <button className="Place-order" onClick={handleSubmit}>
                    Place Order
                  </button>
                </div>
                <div className="scroll-buttons">
                  <button
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    ⬆ Go to Top
                  </button>
                  <button
                    onClick={() =>
                      window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: "smooth",
                      })
                    }
                  >
                    ⬇ Go to Bottom
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {previewImage && (
        <div
          className="image-modal-backdrop"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="close-button"
            >
              ×
            </button>
            <img
              src={previewImage}
              alt="Preview"
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
