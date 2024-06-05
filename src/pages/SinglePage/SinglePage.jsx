import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function SinglePage() {
  const { username } = useParams();
  return <div>{username}</div>;
}

export default SinglePage;
