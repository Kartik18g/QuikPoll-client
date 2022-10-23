import { useState } from "react";
import axios from "../../utils/axios";

const AddQuestion = ({ poll }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [duration, setDuration] = useState(30);

  const [option, setOption] = useState("");

  const handleOption = (e) => {
    e.preventDefault();
    if (option.trim() !== "") setOptions((prev) => [...prev, option]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: response } = await axios.post(`/poll/${poll}/addQuestion`, {
        question,
        options,
        duration,
      });
      if (!response.success) {
        window.alert(response.message);
      } else {
        setOptions((prev) => []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <h1>AddQuestion</h1>
    //   <label>Question</label>
    //   <textarea onChange={e=>setQuestion(e.target.value)} type="text" name="question" id="question" />
    //   <br />
    //   <input
        // onChange={(e) => setDuration(e.target.value)}
    //     type="range"
    //     min="30"
    //     max="300"
    //   />
    //   <br />
    //   <label>AddOptions</label>

    //   <input
    //     onChange={(e) => setOption(e.target.value)}
    //     type="text"
    //     name=""
    //     id=""
    //   />
    //   <button onClick={handleOption}>Add</button>
    //   <ol type="A">
    // {options.map((option, index) => {
    //   return <li>{option}</li>;
    // })}
    //   </ol>

    //   <br />
    //   <button type="submit">Submit</button>
    // </form>
    <form onSubmit={handleSubmit} className="my-10 bg-gray-100 p-4 rounded-md">
      <div class="mb-6">
        <label
          for="question"
          class="block mb-2 text-sm font-medium text-gray-900 "
        >
          Question
        </label>
        <textarea
          type="question"
          id="question"
          class="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
          placeholder="Enter your question"
          required
        />
      </div>
      <div class="mb-6">
        <label
          for="default-range"
          class="block mb-2 text-sm font-medium text-gray-900 "
        >
          Duration : {duration} seconds
        </label>
        <input

          id="default-range"
        onChange={(e) => setDuration(e.target.value)}
          type="range"
          min="30"
          max="300"
          class="w-2/3 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer "
        ></input>
      </div>

      <div class="mb-6">
        <label
          for="options"
          class="block mb-2 text-sm font-medium text-gray-900 "
        >
          Add Options
        </label>
        <div className="flex">
          <input
            onChange={(e) => setOption(e.target.value)}
            type="text"
            id="options"
            class="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5  "
            placeholder="Add options"
            required
          />
          <button
            onClick={handleOption}
            type="submit"
            class=" mx-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add
          </button>
        </div>
      </div>
      <div class="mb-6">
        <ol class="space-y-1 max-w-md list-decimal list-inside text-gray-900 dark:text-gray-400">
          {options.map((option, index) => {
            return (
              <li>
                <span class="font-semibold text-gray-900">{option}</span>{" "}
              </li>
            );
          })}
        </ol>
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add Question
      </button>
    </form>
  );
};

export default AddQuestion;
