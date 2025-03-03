import { Navigate, Route, Routes } from "react-router-dom"
import { RecetappPage } from "../pages/RecetappPage"


export const RecetappRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <RecetappPage /> } />

        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )
}