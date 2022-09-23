import { useState, useEffect } from "react";
import { Vote } from "types/vote";
import axios from "axios";

const useVotes = () => {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const votes = await axios.get(`${process.env.REACT_APP_HOST}/votes/`);

        if (votes) setVotes(votes.data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { votes, isError, isLoading };
};

export default useVotes;
