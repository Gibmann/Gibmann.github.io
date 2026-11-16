import { Routes, Route, Navigate } from "react-router";
import AppLayout from "./layouts/App/AppLayout";
import DesktopView from "./views/Desktop/DesktopView";

const App = () => {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route
                    index
                    element={<DesktopView />}
                />
                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />
            </Route>
        </Routes>
    );
};

export default App;
