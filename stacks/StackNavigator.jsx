import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../components/Home/Home";
import Login from "../components/Nav/Login";
import Register from "../components/Nav/Register";
import User from "../components/User/User";
import UserList from "../components/User/UserList";
import UserSwaps from "../components/User/UserSwaps";
import Messages from "../components/Messages";
import UserAgreement from "../components/Nav/UserAgreement";
import Marketplace from "../components/Marketplace";
import Privacy from "../components/Nav/Privacy";
import AddItem from "../components/User/AddItem";
import CameraPage from "../components/CameraPage";
import MessageList from "../components/MesssageList";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Group>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="Marketplace" component={Marketplace} />
        <Stack.Screen name="My List" component={UserList} />
        <Stack.Screen name="Swaps" component={UserSwaps} />
        <Stack.Screen name="Messages" component={MessageList} />
        <Stack.Screen name="Conversation" component={Messages} />
        <Stack.Screen name="User Agreement" component={UserAgreement} />
        <Stack.Screen name="Privacy" component={Privacy} />
      </Stack.Group>

      <Stack.Group
        screenOptions={{ headerShown: false, presentation: "modal" }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Add Item" component={AddItem} />
        <Stack.Screen name="Camera" component={CameraPage} />
        {/* AddItem, LeaveComment?  */}
      </Stack.Group>
    </Stack.Navigator>
  );
};
export default StackNavigator;
