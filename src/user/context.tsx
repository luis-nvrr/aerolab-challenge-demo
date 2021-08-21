import {Center} from "@chakra-ui/layout";
import {CircularProgress} from "@chakra-ui/react";
import React from "react";

import productApi from "~/product/api";
import {Product} from "~/product/types";

import api from "./api";
import {User} from "./types";

interface Context {
  state: {
    user: User;
  };
  actions: {
    addPoints: (amount: number) => Promise<void>;
    redeem: (product: Product) => Promise<void>;
  };
}

const UserContext = React.createContext({} as Context);

const UserProvider: React.FC = ({children}) => {
  const [user, setUser] = React.useState<User>();
  const [status, setStatus] = React.useState<"pending" | "resolved" | "rejected">("pending");

  const handleRedeem = async (product: Product) => {
    if (!user) return;

    const res = await productApi.redeem(product);

    setUser({...user, points: user.points - product.cost});
  };

  const handleAddPoints = async (amount: number) => {
    if (!user) return;

    await api.points.add(amount);
    setUser({...user, points: user.points + amount});
  };

  React.useEffect(() => {
    api.fetch().then((user) => {
      setUser(user);
      setStatus("resolved");
    });
  }, []);

  if (!user || status === "pending") {
    return (
      <Center padding={12}>
        <CircularProgress isIndeterminate color="primary.500" />
      </Center>
    );
  }

  const state: Context["state"] = {
    user,
  };

  const actions = {
    addPoints: handleAddPoints,
    redeem: handleRedeem,
  };

  return <UserContext.Provider value={{state, actions}}>{children}</UserContext.Provider>;
};

export {UserContext as default, UserProvider as Provider};
