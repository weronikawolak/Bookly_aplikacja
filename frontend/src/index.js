// import React from "react";
// import ReactDOM from "react-dom";
// import "./styles.css"; // Importujemy CSS globalnie
// import App from "./App";

// ReactDOM.render(<App />, document.getElementById("root"));

import "./styles.css"; // Importujemy CSS globalnie
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
