export interface ModalCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  cart: { [key: string]: number };
  items: { [key: string]: { price: number; stock: number; image: string } };
  setCheckout: (amount: number) => void;
}

export interface ModalCheckoutState {
  inputMoney: number | string;
  warning: string | null;
  changeMessage: string | null;
}

export * from "./Checkout";
