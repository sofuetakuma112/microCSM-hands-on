// libs/client.js
import { createClient } from 'microcms-js-sdk';

export const client = createClient({
    serviceDomain: 'mbeb0gd30c',
    apiKey: process.env.API_KEY || "",
});