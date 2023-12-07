import { useEffect, useState } from 'react';
import axiosInstance from 'src/utils/axios';

export const useZoom = (resourceUrl: string) => {
  const [resources, setResources] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get(resourceUrl);
        setResources(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    })();
  }, [resourceUrl]);

  return { resources, error, loading };
};
