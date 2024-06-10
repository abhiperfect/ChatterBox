import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../constants/config.jsx";
import { useUserContext } from "../context/UserContext.js";

const useFriendRequestHandlers = () => {
  const { setFriendRequestNotifications } = useUserContext();

  const acceptFriendRequest = async (requestId, status) => {
    try {
      const response = await axios.put(
        `${server}/api/v1/user/acceptrequest`,
        {
          requestId: requestId,
          accept: status,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      toast.success(response.data.message);
      // Update notifications state
      // setFriendRequestNotifications((prev) =>
      //   prev.filter((req) => req._id !== requestId)
      // );
    } catch (error) {
      console.error("Error accepting friend request:", error);
      toast.error("Error accepting friend request");
    }
  };
  return { acceptFriendRequest };
};

export default useFriendRequestHandlers;
