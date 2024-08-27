import { createBrowserRouter, redirect } from "react-router-dom";
import { DashboardRoute } from "./Dashboard.route";
import { UserService } from "../services/user.service";
import { RoutesService } from "../services/routes.service";

export const router = createBrowserRouter([
    {
        path: "/",
        async loader() {
            return redirect(RoutesService.dashboardRoute)
        }
    },
    {
        path: RoutesService.dashboardRoute,
        Component: DashboardRoute,
        async loader() {
            try {
                const userData = await UserService.getUser()
                return userData
            } catch (error) {
                return null
            }
        }
    },
    {
        path: "*",
        loader() {
            return redirect('/')
        }
    },
]);

