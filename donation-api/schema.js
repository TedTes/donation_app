const gql = require("graphql-tag");
const { buildASTSchema } = require("graphql");

typeDefs = buildASTSchema(gql`
  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
  }
  type Donation {
    id: Int
    amount: Int
    tip: Int
    email: String
  }
  input DonationInputs {
    id: Int = 0
    firstName: String
    lastName: String
    email: String
    amount: Int!
    tip: Int
  }

  type Query {
    getDonations: [Donation]
    getDonation(id: Int!): Donation
  }
  type Mutation {
    createDonation(donation: DonationInputs): [Donation]
    updateDonation(donation: DonationInputs): Int
    deleteDonation(id: Int!): [Donation]
  }
`);

module.exports = typeDefs;
