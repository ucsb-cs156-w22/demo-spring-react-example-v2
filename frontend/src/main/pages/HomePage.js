import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import SourceForm from "main/components/KanbanPopulator/SourceForm"
import { useCurrentUser } from "main/utils/currentUser";
import { useBackend } from "main/utils/useBackend";

export default function HomePage() {

  const { data: currentUser } = useCurrentUser();

  if (!currentUser.loggedIn) {
    return (
      <BasicLayout>
      <p>Not logged in. Please login to use the Kanban Populator</p>
      </BasicLayout>
    )
  } 

  const onSubmit = async (data) => {
    console.log(data);
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Kanban Populator</h1>
        <h2>Specify Source</h2>
        <SourceForm onSubmit={onSubmit}/>
      </div>
    </BasicLayout>
  )
}