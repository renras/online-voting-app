import { useState, useEffect } from "react";
import { Candidate } from "types/candidate";
import axios from "axios";

const useCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const candidates = await axios.get(
          `${process.env.REACT_APP_HOST}/candidates/`
        );

        if (candidates) setCandidates(candidates.data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { candidates, isError, isLoading };
};

export default useCandidates;
