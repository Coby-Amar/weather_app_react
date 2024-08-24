import { createBrowserRouter, redirect } from "react-router-dom";
import { DashboardRoute } from "./Dashboard.route";


export const router = createBrowserRouter([
    {
        path: "/",
        async loader() {
            return redirect('/dashboard')
        }
    },
    {
        path: "/dashboard",
        Component: DashboardRoute
    },
    {
        path: "*",
        loader() {
            return redirect('/')
        }
    },
]);

