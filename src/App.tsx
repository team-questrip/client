import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Frame from "./design/Frame";
import RecommendedPlaceSearch from "./pages/RecommendedPlaceSearch";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import DetailPage from "./pages/DetailPage";

const queryClient = new QueryClient();

function App() {
  const placeId = useParams();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Frame>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:placeId" element={<DetailPage />} />
          </Routes>
        </Frame>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
