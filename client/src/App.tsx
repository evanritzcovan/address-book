import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PersonDetailPage from "@/pages/PersonDetailPage";
import PersonListPage from "@/pages/PersonListPage";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PersonListPage />} />
      <Route path="/persons/:id" element={<PersonDetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
