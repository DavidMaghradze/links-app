import React, { useState, useContext, useCallback, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { LinksList } from "../components/LinksList";
import Container from "@material-ui/core/Container";
export const Links = () => {
  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const [links, setLinks] = useState();

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request("/api/link", "GET", null, {
        Authorization: `Bearer ${token}`
      });
      setLinks(fetched);
    } catch (err) {}
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, fetchLinks);

  return (
    <Container fixed>
      <LinksList links={links} />
    </Container>
  );
};
