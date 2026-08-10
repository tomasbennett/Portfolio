
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


const router = createBrowserRouter([
  {
    path: homePageRoute,
    element:
      <AuthProvider>
        <GeneralHomeLayout />
      </AuthProvider>,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "error",
        element: <ErrorPageLayout />,
      },
      {
        element:
          <NotAuthenticatedRoute>
            <Outlet />
          </NotAuthenticatedRoute>,
        children: [
          {
            element: <SignInLayout />,
            children: [
              {
                path: "login",
                handle: {
                  title: "Login",
                }
              },
              {
                path: "register",
                handle: {
                  title: "Register",
                }
              }
            ]
          }
        ]
      },
      {
        element:
          <ProtectedRoute>
            <SocketProvider>
              <Outlet />
            </SocketProvider>
          </ProtectedRoute>,
        children: [
          {
            element: <SidebarsLayout />,
            children: [
              {
                index: true,
                element: <div>Home Layout</div>
              },
              {
                path: searchPageRoute,
                element: <SearchUsersLayout />
              }
            ]
          },
        ]
      }
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
