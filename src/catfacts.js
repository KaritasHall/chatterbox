import { useCallback } from "react";
import getServerUrl from "./config";
import "./Catfacts.css";

export default function CatFacts() {
  const url = getServerUrl();

  const getCats = useCallback(async () => {
    await fetch(url + "cats");
  }, [url]);

  return <button className="catbtn" onClick={getCats}>Post a random cat fact!</button>;
}
