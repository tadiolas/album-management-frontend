import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AlbumList } from "./features/album/components/AlbumList";
import { FamilyList } from "./features/family/components/FamilyList";
import { UserForm } from "./features/login/components/UserForm";
import { PhotoList } from "./features/photo/components/PhotoList";
import { GlobalStateProvider } from "./shared/GlobalStateProvider";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <GlobalStateProvider>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-2xl bg-white p-8 shadow-md">
          <Router>
            <Routes>
              <Route path="/" element={<UserForm />} />
              <Route path="/family" element={<FamilyList />} />
              <Route path="/album/:id" element={<AlbumList />} />
              <Route path="/album/:id/photos" element={<PhotoList />} />
            </Routes>
          </Router>
          <Toaster />
        </div>
      </div>
    </GlobalStateProvider>
  );
}

export default App;
