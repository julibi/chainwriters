import { useRouter } from 'next/router';
import { useMemo } from 'react';

export function useGetProjectId() {
  const router = useRouter();
  const projectId = useMemo(() => {
    if (!router.query.projectId) return null;
    return Array.isArray(router.query.projectId)
      ? router.query.projectId[0]
      : router.query.projectId;
  }, [router]);

  return projectId;
}
