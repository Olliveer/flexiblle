import { createUserMutation, getUSerQuery } from "@/graphql";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV === "production";
const apiUrl = isProduction
  ? (process.env.NEXT_PUBLIC_GRAFBASE_URL as string)
  : "http://127.0.0.1:4000/graphql";

const apiKey = isProduction
  ? (process.env.NEXT_PUBLIC_GRAFBASE_KEY as string)
  : "letmein";

const serverUrl = isProduction
  ? (process.env.NEXT_PUBLIC_SERVER_URL as string)
  : "http://localhost:3000";

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    // client.request
    return await client.request(query, variables);
  } catch (error) {
    throw error;
  }
};

export const getUser = (email: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getUSerQuery, { email });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader("x-api-key", apiKey);
  const variables = {
    input: {
      name,
      email,
      avatarUrl,
    },
  };

  return makeGraphQLRequest(createUserMutation, variables);
};