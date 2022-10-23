import { useState } from "react";
import axios from "../../utils/axios";

const AddUser = ({ setUser, user }) => {
  const [name, setName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: response } = await axios.post("/user", {
        name: name,
      });
      const { success, data, message } = response;
      if (success) {
        setUser(data.user);
      } else {
        window.alert(message);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
     <div
      style={{ height: "100vh" }}
      className="w-screen h-full flex-col  bg-[#1A1A1A] bg-dark flex justify-center items-center "
    >
      <h1 class=" px-5 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          QuikPoll
        </span>{" "}
      </h1>

      <form class="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div class="-space-y-px rounded-md shadow-sm">
            <div>
              <label for="name" class="sr-only">
                Name
              </label>
              <input
               onChange={(e) => setName(e.target.value)}
                id="email-address"
                name="name"
                type="name"
                required
                class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter your name"
              />
            </div>
            <br />
          <button
            type="submit"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </>
  )
};

export default AddUser;
