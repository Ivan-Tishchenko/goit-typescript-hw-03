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

class House {
  private door: boolean;

  constructor(protected key: number) {
    this.door = false;
  }

  public getDoor(): boolean {
    return this.door;
  }

  protected setDoor(): void {
    this.door = !this.door;
  }
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

  public comeIn(person: object): string {
    // персон записується до відповідних змінних..
    return this.getDoor()
      ? "you are come in"
      : "error, door closed";
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

console.log(house.comeIn(person));

export {};
