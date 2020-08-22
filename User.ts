import { Card, Collection, Member } from "./Card";

export class CardInventory {
  private cards: Card[] = [];

  private _members: Member[] | undefined;
  private get members(): Member[] {
    if (this._members) return this._members;

    this._members = this.cards.reduce((acc, val) => {
      if (!acc.includes(val.member)) acc.push(val.member);

      return acc;
    }, [] as Member[]);

    return this._members;
  }

  private _collections: Collection[] | undefined;
  private get collections(): Collection[] {
    if (this._collections) return this._collections;

    this._collections = this.cards.reduce((acc, val) => {
      if (!acc.includes(val.collection)) acc.push(val.collection);

      return acc;
    }, [] as Collection[]);

    return this._collections;
  }

  memberNames(): string[] {
    return this.members.map((m) => m.name.toLowerCase());
  }

  memberShortNames(): string[] {
    return this.members.map((m) => m.shortName.toLowerCase());
  }

  collectionNames(): string[] {
    return this.collections.map((c) => c.name.toLowerCase());
  }

  addCard(...cards: Card[]) {
    this.cards.push(...cards);
    this._members = undefined;
    this._collections = undefined;
  }

  searchByIdentifier(id: string): Card[] {
    return this.cards.filter(
      (c) => c.identifier.toLowerCase() === id.toLowerCase()
    );
  }

  searchByMember(memberNumber: number): Card[];
  searchByMember(name: string): Card[];
  searchByMember(member: Member): Card[];
  searchByMember(member: string | number | Member): Card[] {
    if (typeof member === "number") {
      return this.cards.filter((c) => c.member.number === member);
    } else if (member instanceof Member) {
      return this.cards.filter((c) => c.member === member);
    } else {
      return this.cards.filter((c) => c.member.hasName(member));
    }
  }

  searchByCollection(name: string): Card[];
  searchByCollection(collection: Collection): Card[];
  searchByCollection(collection: string | Collection): Card[] {
    if (typeof collection === "string") {
      return this.cards.filter((c) => c.collection.hasName(collection));
    } else {
      return this.cards.filter((c) => c.collection === collection);
    }
  }

  smartSearch(queryString: string): Card[] {
    if (queryString.includes("#")) {
      return this.searchByIdentifier(queryString.replace(/\s+/g, ""));
    } else {
      let member: Member | undefined;
      let collection: Collection | undefined;

      for (let arg of queryString.toLowerCase().split(/\s+/)) {
        if (
          this.memberNames().includes(arg) ||
          this.memberShortNames().includes(arg)
        ) {
          member = this.members.find((m) => m.hasName(arg))!;
        } else if (this.collectionNames().includes(arg)) {
          collection = this.collections.find((c) => c.hasName(arg))!;
        }

        if (member && collection) break;
      }

      if (member && collection) {
        return this.searchByIdentifier(
          Card.generateIdentifier(collection, member)
        );
      } else if (member) {
        return this.searchByMember(member);
      } else if (collection) {
        return this.searchByCollection(collection);
      } else return [];
    }
  }
}

export class User {
  cards: CardInventory = new CardInventory();
}
