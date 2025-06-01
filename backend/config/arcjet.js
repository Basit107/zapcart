import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import {ARCJET_KEY} from "./env.js";

const aj = arcjet({
    //   site key from https://app.arcjet.com
  key: ARCJET_KEY,
  characteristics: ["ip.src"], // Track requests by IP
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: "LIVE" }),
    // Create a bot detection rule
    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        "CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
      ],
    }),
    // Create a token bucket rate limit.
    tokenBucket({
      mode: "LIVE",
      refillRate: 10, // Refill 5 tokens per interval
      interval: 2, // Refill every 10 seconds
      capacity: 60, // Bucket capacity of 10 tokens
    }),
  ],
});

export default aj;