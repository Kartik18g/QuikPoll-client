import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSocket from "../contexts/socket/useSocket";
import axios from "../utils/axios";
import Admin from "./Admin/Admin";
import AddUser from "./Forms/AddUser";
import Question from "./Question";
import {toast} from 'react-hot-toast'

const Poll = () => {
  const { id: pollId } = useParams();
  const { socket } = useSocket();
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [isAdmin, setIsAdmin] = useState(false);

  const [poll, setPoll] = useState(null);
  const navigate = useNavigate()
  const getPollData = async () => {
    try {
      const { data: response } = await axios.get(`/poll/${pollId}`);
      if (response.success) {
        setPoll(response.data.poll[0]);
      }else{
        toast.error("Poll not found, redirecting to home page")
        navigate('/')
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on(`new-question/${pollId}`, (data) => {
        console.log("toast")
        toast.success("New question added");
        getPollData();
      });
      socket.on(`new-vote/${pollId}`, (data) => {
        getPollData();
      });
    }
  }, [socket]);

  useEffect(() => {
    getPollData();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);


  return (
    <div className="w-screen bg-dark">
      <h1 class=" px-5 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          QuikPoll
        </span>{" "}
      </h1>

      {user == null ? (
        <AddUser setUser={setUser} suer={user} />
      ) : (
        <>
          <div className="px-5">
            <div className="absolute right-2 top-2">
            <h6 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 text-sm text-sm">
              <span class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
            logged in as {user.name}
              </span>
            </h6>
          </div>
          <Admin user={user} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
          </div>

          {poll && poll.questions && (
            <div className="flex bg-[#1A1A1A] flex-col w-screen px-5 justify-center items-center">
              {poll.questions.length===0 ?<h1 className="text-white"> No questions added yet !!</h1>:poll.questions.map((question, index) => (
                <Question
                isAdmin={isAdmin}
                  user={user}
                  question={question}
                  index={index}
                  len={poll.questions.length}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Poll;
