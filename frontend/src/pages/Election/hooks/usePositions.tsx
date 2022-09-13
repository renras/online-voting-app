import { useState, useEffect } from "react";
import { Position } from "types/position";
import axios from "axios";

const usePositions = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const positions = await axios.get(
          `${process.env.REACT_APP_HOST}/positions/`
        );

        if (positions) setPositions(positions.data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { positions, isError, isLoading };
};

export default usePositions;
