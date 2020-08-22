export class Member {
  constructor(
    public number: number,
    public name: string,
    public shortName: string
  ) {}

  hasName(name: string): boolean {
    return (
      this.name.toLowerCase() === name || name === this.shortName.toLowerCase()
    );
  }
}

export class Collection {
  constructor(public name: string) {}

  hasName(name: string): boolean {
    return this.name.toLowerCase() === name;
  }
}

export class Card {
  hearts = 0;

  constructor(public member: Member, public collection: Collection) {}

  addHearts(hearts: number) {
    this.hearts += hearts;
  }

  static generateIdentifier(collection: Collection, member: Member): string {
    return `${collection.name}#${member.name}`;
  }

  get identifier(): string {
    return Card.generateIdentifier(this.collection, this.member);
  }
}
