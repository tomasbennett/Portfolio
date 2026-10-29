
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { GeneralHomeLayout } from './layouts/GeneralHomeLayout'
import { ErrorElement } from './features/error/services/ErrorElement'
import { ErrorPageLayout } from './features/error/layouts/ErrorLayout'
import { ErrorProvider } from './features/error/contexts/ErrorContext'
import { homePageRoute } from './constants/routes'
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
