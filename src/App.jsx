import './index.css'
import LandingPage from './pages/LandingPage'
import LogInWithPhone from './pages/LogInWithPhone'
import { createBrowserRouter,Outlet,RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import LoginGoogle from './pages/LoginGoogle'
import HomePage from './pages/HomePage'
import SearchResultsPage from './pages/SearchResultsPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import ProtectedRoute from './utils/ProtectedRoute'


const App=()=>{
  return(
      <>
      <Outlet />
      </>
     
  )
}

const appRouter = createBrowserRouter(
  [
    {
      path:"/",
      element:<App/>,
      children:[
        {
          path:"/",
          element:[<LandingPage/>]
        },
        {
          path:"/login",
          element:[<LoginGoogle/>]
        },
        {
          path:"/login-phone",
          element:[<LogInWithPhone/>]
        },
        {
          path:"/homepage",
          element:(
            // <ProtectedRoute>
              <HomePage />
            // </ProtectedRoute>
          )
        },
        {
          path:"/search",
          element:(
            // <ProtectedRoute>
              <SearchResultsPage />
            // </ProtectedRoute>
          )
        },
        {
          path: "/product/:prodId",
          element: (
            // <ProtectedRoute>
              <ProductPage />
            // </ProtectedRoute>
          )
        },
        {
          path: "/cart",
          element: (
            // <ProtectedRoute>
              <CartPage />
            // </ProtectedRoute>
          )
        }
      ]
    }
  ]
)


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);