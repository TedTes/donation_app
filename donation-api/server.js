const express = require("express");
const app = express();
const cors = require("cors");
const typeDefs = require("./schema.js");
const { ApolloServer } = require("apollo-server-express");
const { donations, users } = require("./data");

app.use(cors());

const resolvers = {
  Query: {
    getDonations: () => getUpdatedDonations(),
    getDonation: (_, { id }) => {
      id = Number(id);
      const res = donations.filter((donation) => Number(donation.id) === id);

      const user = users.filter((user) => user.id === res[0].userId);

      return { ...res[0], email: user[0].email };
    },
  },
  Mutation: {
    createDonation: (_, { donation }) => {
      let userId = "";
      const existUser = users.find((user) => user.email === donation.email);
      if (!existUser) {
        userId = users.length + 1;
        let user = {
          id: userId,
          firstName: donation.firstName,
          lastName: donation.lastName,
          email: donation.email,
        };
        users.push(user);
      } else userId = existUser.id;
      let donationNew = {
        id: donations.length + 1,
        userId,
        amount: donation.amount,
        tip: donation.tip,
      };
      donations.push(donationNew);

      return getUpdatedDonations();
    },
    updateDonation: (_, { donation }) => {
      const donationIndex = donations.findIndex(
        (dta) => Number(dta.id) === Number(donation.id)
      );
      donations[donationIndex] = { ...donations[donationIndex], ...donation };

      return;
    },
    deleteDonation: (_, { id }) => {
      id = Number(id);
      donations.splice(
        donations.findIndex((dta) => dta.id === id),
        1
      );
      return getUpdatedDonations();
    },
  },
};

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`graphql server running on port ${PORT}`);
  });
}

async function getUpdatedDonations() {
  const result = donations
    .map((donation) => {
      let user = users.find((user) => user.id === donation.userId);
      if (user) return { ...donation, email: user.email };
    })
    .filter((donation) => donation !== undefined);
  return result;
}

startApolloServer(typeDefs, resolvers);
