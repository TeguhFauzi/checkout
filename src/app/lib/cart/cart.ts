export class Cart {
  private items: { [key: string]: number } = {};

  public addItem(itemName: string): void {
    if (this.items[itemName]) {
      this.items[itemName] += 1;
    } else {
      this.items[itemName] = 1;
    }
  }

  public removeItem(itemName: string): void {
    if (this.items[itemName] > 0) {
      this.items[itemName] -= 1;
    }
  }

  public getItems(): { [key: string]: number } {
    return this.items;
  }

  public getTotalItems(): number {
    return Object.values(this.items).reduce((acc, count) => acc + count, 0);
  }

  public clear(): void {
    this.items = {};
  }
}
