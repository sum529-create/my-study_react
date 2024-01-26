import React from "react";
import { Navigate } from "react-router-dom";

const NotFound: React.FC = () => {
  // 디렉토리로 리디렉션
  return <Navigate to="/my-study_react/cultural-event-info/" />;
};

export default NotFound;
