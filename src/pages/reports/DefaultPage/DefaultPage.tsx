import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const DefaultPage = () => {
  const history = useHistory();

  useEffect(() => {
    history.push("/live-reports");
  }, [history]);

  return null;
};

export default DefaultPage;
