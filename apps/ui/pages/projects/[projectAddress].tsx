import React, { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useGetProjectDetails } from '../../state/projects/hooks';


// TODO
// this view is different dependent on who is having a look at it
// the author
// a contributor
// anyone else

const ProjectDetailView = () => {
  const router = useRouter();
  const { projectAddress } = router.query;
  const getProjectDetails = useGetProjectDetails();

  const callGetProjectDetails = useCallback(async(projectAddress: string) => {
    const result = await getProjectDetails(projectAddress);
  }, [getProjectDetails]);

  useEffect(() => {
    if (projectAddress) {
      // @ts-ignore
      callGetProjectDetails(projectAddress)
    }
  }, [projectAddress, callGetProjectDetails]);
  return (
    <div>ProjectDetailView</div>
  )
}

export default ProjectDetailView