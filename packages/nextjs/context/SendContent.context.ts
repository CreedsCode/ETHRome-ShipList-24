import { createContext } from "react";

const SendContentContext = createContext<{
  file: any;
  setFile: (file: any) => void;
}>({
  file: undefined,
  setFile: () => {},
});

export default SendContentContext;
