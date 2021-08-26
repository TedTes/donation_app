let users = [
  { id: 4, firstName: "ted", lastName: "tes", email: "tedtfu@gmail.com" },
  { id: 5, firstName: "Jef", lastName: "Jack", email: "jefjack@gmail.com" },
  { id: 6, firstName: "Jen", lastName: "Jacn", email: "jenjacn@gmail.com" },
];

const donations = [
  { id: 1, userId: 4, amount: 1222, tip: 11 },
  { id: 2, userId: 5, amount: 1333, tip: 12 },
  { id: 3, userId: 6, amount: 12334, tip: 13 },
];

module.exports = { donations, users };
