import React, { Component } from "react";
import Modal from "@/app/components/modal/Modal";
import { ModalCheckoutProps, ModalCheckoutState } from ".";

export class ModalCheckout extends Component<
  ModalCheckoutProps,
  ModalCheckoutState
> {
  constructor(props: ModalCheckoutProps) {
    super(props);
    this.state = {
      inputMoney: "",
      warning: null,
      changeMessage: null,
    };
  }

  componentDidUpdate(
    prevProps: ModalCheckoutProps,
    prevState: ModalCheckoutState
  ) {
    const { inputMoney } = this.state;
    const { cart, items } = this.props;

    const totalAmount = Object.keys(cart).reduce((acc, item) => {
      return acc + cart[item] * items[item].price;
    }, 0);

    if (
      prevState.inputMoney !== inputMoney ||
      prevProps.cart !== cart ||
      prevProps.items !== items
    ) {
      if (inputMoney === "") {
        this.setState({ warning: null });
        return;
      }

      const amount = Number(inputMoney);
      if (isNaN(amount) || amount < totalAmount) {
        this.setState({
          warning: "Insufficient funds. Please enter a valid amount.",
        });
      } else {
        this.setState({ warning: null });
      }
    }
  }

  handleCheckout = () => {
    const { inputMoney } = this.state;
    const { totalAmount } = this.getTotalAmount();
    const { setCheckout, onClose } = this.props;

    const amount = Number(inputMoney);
    if (isNaN(amount) || amount < totalAmount) {
      this.setState({
        warning: "Insufficient funds. Please enter a valid amount.",
      });
      return;
    }

    const change = amount - totalAmount;
    this.setState({
      changeMessage: `Your change is ${change}`,
      inputMoney: "",
    });

    setCheckout(amount);

    setTimeout(() => {
      this.setState({ changeMessage: null });
      onClose();
    }, 3000);
  };

  getTotalAmount() {
    const { cart, items } = this.props;
    const totalAmount = Object.keys(cart).reduce((acc, item) => {
      return acc + cart[item] * items[item].price;
    }, 0);
    return { totalAmount };
  }

  render() {
    const { isOpen, onClose, cart, items } = this.props;
    const { inputMoney, warning, changeMessage } = this.state;

    const { totalAmount } = this.getTotalAmount();

    return (
      <Modal isOpen={isOpen}>
        <div className="relative">
          <h2 className="text-xl font-bold mb-4">Checkout</h2>
          <ul className="mb-4">
            {Object.keys(cart).map((item) => (
              <li key={item} className="mb-2">
                {item} - Quantity: {cart[item]} - Price:{" "}
                {items[item].price * cart[item]}
              </li>
            ))}
          </ul>
          <p className="text-lg font-semibold">Total Amount: {totalAmount}</p>
          <div className="mb-4">
            <input
              type="number"
              value={inputMoney}
              onChange={(e) => this.setState({ inputMoney: e.target.value })}
              placeholder="Enter amount"
              className="border p-2 w-full"
            />
            {warning && <p className="text-red-500">{warning}</p>}
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={this.handleCheckout}
              disabled={!!warning}
            >
              Checkout
            </button>
          </div>
          {changeMessage && (
            <p className="text-green-500 mt-4">{changeMessage}</p>
          )}
        </div>
      </Modal>
    );
  }
}
