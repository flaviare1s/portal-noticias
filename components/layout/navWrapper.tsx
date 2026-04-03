"use client";

import { useNotFound } from "@/contexts/NotFoundContext";
import Nav from "./nav";

export default function NavWrapper() {
  const { isNotFound } = useNotFound();

  if (isNotFound) {
    return null;
  }

  return <Nav />;
}
