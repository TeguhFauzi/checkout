export class VendingMachine {
  private items: {
    [key: string]: { price: number; stock: number; image: string };
  } = {
    Biscuit: { price: 6000, stock: 10, image: "/assets/biskuit.jpg" },
    Chips: { price: 8000, stock: 10, image: "/assets/chips.jpg" },
    Oreo: { price: 10000, stock: 10, image: "/assets/oreo.jpg" },
    Tango: { price: 12000, stock: 10, image: "/assets/tango.jpg" },
    Chocolate: { price: 15000, stock: 10, image: "/assets/cokelat.jpg" },
  };

  private acceptedDenominations: number[] = [2000, 5000, 10000, 20000, 50000];
  private insertedMoney: number = 0;

  public insertMoney(amount: number): void {
    if (this.acceptedDenominations.includes(amount)) {
      this.insertedMoney += amount;
      console.log(`Inserted: ${amount}. Total: ${this.insertedMoney}`);
    } else {
      console.log(`Denomination not accepted: ${amount}`);
    }
  }

  public selectItem(itemName: string): void {
    const item = this.items[itemName];
    if (!item) {
      console.log(`Item not found: ${itemName}`);
      return;
    }

    if (item.stock <= 0) {
      console.log(`Item out of stock: ${itemName}`);
      return;
    }

    if (this.insertedMoney < item.price) {
      console.log(`Insufficient funds. Please insert more money.`);
      return;
    }

    item.stock -= 1;
    this.insertedMoney -= item.price;
    console.log(`Dispensed: ${itemName}. Change: ${this.insertedMoney}`);
    this.returnChange();
  }

  private returnChange(): void {
    if (this.insertedMoney > 0) {
      console.log(`Returning change: ${this.insertedMoney}`);
      this.insertedMoney = 0;
    }
  }

  public checkStock(itemName: string): number {
    const item = this.items[itemName];
    if (!item) {
      console.log(`Item not found: ${itemName}`);
      return 0;
    }
    return item.stock;
  }

  public updateStock(itemName: string, quantity: number): void {
    const item = this.items[itemName];
    if (item) {
      item.stock -= quantity;
    }
  }

  public getItems() {
    return this.items;
  }
}
