import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import SourceForm from "main/components/KanbanPopulator/SourceForm"
import DestinationForm from "main/components/KanbanPopulator/DestinationForm"
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

  const onSubmitSource = async (data) => {
    console.log(data);
  }

  const onSubmitDestination = async (data) => {
    console.log(data);
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Kanban Board Populator</h1>
        <h2>Specify Source</h2>
        <SourceForm onSubmit={onSubmitSource}/>
        <h2>Specify Destination and new Kanban Board Name</h2>
        <DestinationForm onSubmit={onSubmitDestination}/>
      </div>
    </BasicLayout>
  )
}