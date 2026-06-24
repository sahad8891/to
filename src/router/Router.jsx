import { createBrowserRouter } from "react-router";

import Home from "../page/home/Home";
import TodoApp from "../components/todo/TodoApp";
import About from "../page/about/About";
import Counter from "../page/counter/Counter";
import Layout from "../Layout/Layout";
    
    
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
        

