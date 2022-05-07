import { createGlobalState } from "react-hooks-global-state";

import React from "react";

const { setGlobalState, useGlobalState } = createGlobalState({
  defaultUrl: "http://localhost:8000/index.php",
});

// const [count, setCount] = useGlobalState('url');
export { setGlobalState, useGlobalState };
