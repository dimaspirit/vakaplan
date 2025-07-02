import { useParams } from "react-router";

function ProjectPage() {
  let params = useParams();
  
  return (
    <>
      <p>ProjectPage {params.id}</p>
    </>
  )
}

export default ProjectPage