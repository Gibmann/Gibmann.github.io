import { Routes, Route, Navigate } from "react-router";
import AppLayout from "./layouts/App/AppLayout";
import ViewLayout from "./layouts/View/ViewLayout"

import IndexView from "./views/Index/IndexView";

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route element={<ViewLayout />}>
          <Route index element={<IndexView />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
