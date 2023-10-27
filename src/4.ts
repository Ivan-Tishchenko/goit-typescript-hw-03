class Key {
  private signature: number;

  constructor() {
    this.signature = Math.random();
  }

  public getSignature(): number {
    return this.signature;
  }
}

class Person {
  private key: number;
  constructor(key: { getSignature: () => number }) {
    this.key = key.getSignature();
  }

  public getKey(): number {
    return this.key;
  }
}

abstract class House {
  private door: boolean;
  protected tenants: Person[] = [];

  constructor(protected key: number) {
    this.door = false;
  }

  public comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
    }
  }

  public getDoor(): boolean {
    return this.door;
  }

  protected setDoor(): void {
    this.door = !this.door;
  }

  abstract openDoor(key: number): void;
}

class MyHouse extends House {
  constructor(key: { getSignature: () => number }) {
    super(key.getSignature());
  }

  public openDoor(key: number): string {
    if (key === this.key) {
      this.setDoor();
      return "sucsesful!!!";
    }
    return "error, try new key";
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

console.log(house.comeIn(person));

export {};
