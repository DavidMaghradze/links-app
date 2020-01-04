import React, { useEffect, useState, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { LinkCard } from "../components/LinkCard";
import Container from "@material-ui/core/Container";

export const LinkDetail = () => {
  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState("");
  const linkId = useParams().id;

  const getLink = useCallback(async () => {
    try {
      const data = await request(`/api/link/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
      setLink(data);
    } catch (error) {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  return <Container fixed>{link && <LinkCard link={link} />}</Container>;
};
