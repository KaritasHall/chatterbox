import { useCallback } from "react";
import getServerUrl from "./config";

export default function CatFacts() {
  const url = getServerUrl();

  const getCats = useCallback(async () => {
    await fetch(url + "cats")
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }, [url]);

  return (
    <button className="catbtn" onClick={getCats}>
      Post a random cat fact!
    </button>
  );
}
