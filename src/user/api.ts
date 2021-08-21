import {User} from "./types";

export default {
  fetch: (): Promise<User> =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            id: "5a03638052fd231590d04eb5",
            name: "John Kite",
            points: 1000,
            redeemHistory: [],
          }),
        500,
      ),
    ),
  points: {
    add: (amount: number) => Promise.resolve(amount),
  },
};
