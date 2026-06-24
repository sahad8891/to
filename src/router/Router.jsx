import { createBrowserRouter } from "react-router";

import Home from "../page/home/Home.jsx";
import TodoApp from "../components/todo/TodoApp.jsx";
import About from "../page/about/About.jsx";
import Counter from "../page/counter/Counter.jsx";
import Layout from "../Layout/Layout.jsx";
    
    
export const Router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                // Main Todo application (replaces the earlier Home landing)
                element: <TodoApp />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "counter",
                element: <Counter />,
            },
    ],
},
]);
export default Router;
        

