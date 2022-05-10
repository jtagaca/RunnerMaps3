import { createGlobalState } from "react-hooks-global-state";

import React from "react";

const { setGlobalState, useGlobalState } = createGlobalState({
  defaultUrl: "https://cs.csub.edu/~jtagaca/test/index.php",
  users: [],
});

// const [count, setCount] = useGlobalState('url');
export { setGlobalState, useGlobalState };
