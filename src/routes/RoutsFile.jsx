import { Route, Routes } from "react-router";
import React from "react";
const HomePage = React.lazy(() => import("../components/homePage/HomePage"));
const CreatePage = React.lazy(() => import("../components/createPage/CreatePage"));
const PostPage = React.lazy(() => import("../components/postPage/PostPage"));
const ProfilePage = React.lazy(() => import("../components/profilePage/ProfilePage"));
const SearchPage = React.lazy(() => import("../components/searchPage/SearchPageuthPage"));
const AuthPage = React.lazy(() => import("../components/authPage/AuthPage"));


const RoutesFile = () => {
  return (
    <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/pin/:id" element={<PostPage />} />
        </Routes>

    </>
  )
}

export default RoutesFile