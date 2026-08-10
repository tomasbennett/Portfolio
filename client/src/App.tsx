
import { Navigate, Outlet, RouterProvider, createBrowserRouter, replace } from 'react-router-dom'
import { GeneralHomeLayout } from './layouts/GeneralHomeLayout'
import { SignInLayout } from './features/auth/layouts/SignInLayout'
import { NotAuthenticatedRoute, ProtectedRoute } from './features/auth/components/ProtectedRoute'
import { ErrorElement } from './features/error/services/ErrorElement'
import { ErrorPageLayout } from './features/error/layouts/ErrorLayout'
import { AuthProvider } from './features/auth/contexts/AuthContext'
import { ErrorProvider } from './features/error/contexts/ErrorContext'
import { SocketProvider } from './contexts/SocketHandlerContext'
import { homePageRoute, profilePageRoute, searchPageRoute } from './constants/routes'
import { profileStateQueryKey } from './features/profile/constants/profileStateQueryKey'
import { IProfileSections } from './features/profile/models/IProfileSections'
import { SearchUsersLayout } from './features/search/layouts/SearchUsersLayout'
import { SidebarsLayout } from './layouts/SidebarsLayout'
import { HomeLayout } from './features/home/layouts/HomeLayout'


const router = createBrowserRouter([
  {
    path: homePageRoute,
    element: <GeneralHomeLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "error",
        element: <ErrorPageLayout />,
      },
      {
        index: true,
        element: <HomeLayout />
      },
    ]
  }
]);






function App() {



  return (
    <>
      <ErrorProvider>

        <RouterProvider router={router} />

      </ErrorProvider>

    </>
  )
}

export default App
