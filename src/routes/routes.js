import React, { lazy } from 'react'
import { HomeRedirect } from './RouteUtils'
import RouteController from './RouteController'
const Dashboard = lazy(() => import('../Screens/Baimax'))
const LoginForm = lazy(() => import('../screens/LoginForm'))
const Home = lazy(() => import('../Components/NavBar'))

const routes = [
    {
        path: "/",
        exact: true,
        component: HomeRedirect
    },
    {
        path: "/login",
        exact: true,
        render: props => <LoginForm {...props} />
    },
    {
        path: "/Baimax",
        render: props => <RouteController component={Home} {...props} />,
        routes: [
            {
                path: "/Baimax",
                exact: true,
                render: props => <RouteController component={Dashboard} {...props} />
            }
        ]
    }
]

export default routes