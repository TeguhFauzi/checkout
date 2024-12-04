"use client";
import React, { Component } from "react";
import { Card } from "@/app/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { VendingMachine } from "@/app/lib/product/product";
import { Cart } from "@/app/lib/cart/cart";
import { ModalCheckout } from "./(structure)";

const vendingMachine = new VendingMachine();
const cart = new Cart();

class Home extends Component {
  state = {
    message: "",
    isModalOpen: false,
    totalItems: 0,
  };

  componentDidMount() {
    this.setState({ totalItems: cart.getTotalItems() });
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{
      message: string;
      isModalOpen: boolean;
      totalItems: number;
    }>
  ) {
    if (prevState.totalItems !== this.state.totalItems) {
      this.setState({ totalItems: cart.getTotalItems() });
    }
  }

  handleAddItem = (itemName: string) => {
    const currentStock = vendingMachine.checkStock(itemName);
    if (currentStock > 0) {
      cart.addItem(itemName);
      vendingMachine.updateStock(itemName, 1);
      this.setState({
        message: `Added: ${itemName}. Stock left: ${currentStock - 1}`,
        totalItems: cart.getTotalItems(),
      });
    } else {
      this.setState({ message: `Item out of stock: ${itemName}` });
    }
  };

  handleRemoveItem = (itemName: string) => {
    if (cart.getItems()[itemName] > 0) {
      cart.removeItem(itemName);
      vendingMachine.updateStock(itemName, -1);
      this.setState({
        message: `Removed: ${itemName}`,
        totalItems: cart.getTotalItems(),
      });
    }
  };

  handleCheckout = () => {
    cart.clear();
    this.setState({
      totalItems: 0,
      message: "Checkout successful.",
    });
  };

  render() {
    const { message, isModalOpen, totalItems } = this.state;
    const items = vendingMachine.getItems();

    return (
      <div>
        <div className="flex justify-between pb-4">
          <div></div>
          <div>
            <div
              className="relative inline-block cursor-pointer"
              onClick={() => this.setState({ isModalOpen: true })}
            >
              <FontAwesomeIcon
                icon={faShoppingCart}
                size="2x"
                className="text-blue-400"
              />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 rounded-full">
                  {totalItems}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div className="flex flex-wrap">
            {Object.keys(items).map((item) => (
              <Card key={item} title={item}>
                <div>
                  <img src={items[item].image} alt={item} />
                </div>
                <p>Price: {items[item].price}</p>
                <p>Stock: {items[item].stock}</p>
                <div className="flex justify-end">
                  <div>
                    {cart.getItems()[item] > 0 && (
                      <button
                        onClick={() => this.handleRemoveItem(item)}
                        className="pe-4"
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                    )}
                    <button onClick={() => this.handleAddItem(item)}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <p>{message}</p>
        </div>
        <ModalCheckout
          isOpen={isModalOpen}
          onClose={() => this.setState({ isModalOpen: false })}
          cart={cart.getItems()}
          items={items}
          setCheckout={this.handleCheckout}
        />
      </div>
    );
  }
}

export default Home;
