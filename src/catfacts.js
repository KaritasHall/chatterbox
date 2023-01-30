import { useCallback } from "react";
import getServerUrl from "./config";

export default function CatFacts() {
  const url = getServerUrl();

  const getCats = useCallback(async () => {
    await fetch(url + "cats");
  }, [url]);

  return <button className="catbtn" onClick={getCats}>Post random cat fact!</button>;
}
