import { Card, Collection, Member } from "./Card";
import { User } from "./User";

let user = new User();

let collections = {
  sowhat: new Collection("SoWhat"),
  heartAttack: new Collection("HeartAttack"),
};

let members = {
  gowon: new Member(11, "Gowon", "GW"),
  chuu: new Member(10, "Chuu", "CH"),
};

let cards = [
  new Card(members.gowon, collections.sowhat),
  new Card(members.chuu, collections.sowhat),
  new Card(members.chuu, collections.heartAttack),
  new Card(members.chuu, collections.heartAttack),
];

user.cards.addCard(...cards);

console.log("gowon", user.cards.smartSearch("gowon"), "\n\n\n");
console.log("chuu", user.cards.smartSearch("chuu"), "\n\n\n");
console.log("sowhat", user.cards.smartSearch("sowhat"), "\n\n\n");
console.log("heartattack chuu", user.cards.smartSearch("heartattack chuu"), "\n\n\n");
console.log("gowon sowhat", user.cards.smartSearch("gowon sowhat"), "\n\n\n");
console.log("sowhat#gowon", user.cards.smartSearch("sowhat#gowon"), "\n\n\n");
console.log("gw", user.cards.smartSearch("gw"), "\n\n\n");
console.log("ch random bullshit heartattack", user.cards.smartSearch("ch random bullshit heartattack"));
