import { Conversations } from './Conversations';
import {Sidebar} from './Sidebar';
import { RightSidebar } from './RightSidebar';
import { ConversationList } from './ConversationList';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <ConversationList/>
      <div className="flex-1 bg-white p-4">
        <Conversations/>
      </div>
      <RightSidebar/>
    </div>
  );
};

export default Dashboard
