import { useEffect, useState } from "react";
import { toPercent } from "../utils";
import axios from "../utils/axios";

const Question = ({ question, user, index, len , isAdmin }) => {
  var currDate = new Date();
  var endDate = new Date(question.createdAt);
  endDate.setSeconds(endDate.getSeconds() + question.duration);

  const [option, setOption] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: response } = await axios.post(
        `/poll/${question.poll}/vote`,
        {
          userId: user._id,
          questionId: question._id,
          optionId: option,
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  const answered = question.votes.includes(user._id);
  const [timeLeft, setTimeLeft] = useState(
    ((endDate - currDate) / 1000).toFixed(0)
  );
  const [interval, setIntv] = useState(null);

  useEffect(() => {
    if (!answered && currDate < endDate) {
      const intv = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      setIntv(intv);
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(interval);
    }
  }, [timeLeft]);

  return (
    <>
      <div className="flex m-4 p-2 flex-col items-start w-full">
        <h4 className="mt-10 text-xl text-white">
          Question {index + 1} of {len} : {question.text}{" "}
          <div className="text-white">
            {!answered && timeLeft > 0 && <>⏰ {timeLeft} seconds</>}
          </div>
        </h4>
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          {question.options.map((option, index) => (
            <div
              key={index}
              className="flex space-between items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white/10 rounded-xl bg-white/5"
            >
              <input
                disabled={answered || timeLeft <= 0}
                defaultChecked={answered && option.votes.includes(user._id)}
                onChange={(e) => setOption(e.target.id)}
                type="radio"
                name={question._id}
                id={option._id}
                className="w-6 h-6 bg-black"
              />
              <div className="flex w-full justify-between px-4">
                <p className="ml-6 text-white">{option.text}</p>
                {(answered || timeLeft || isAdmin <= 0) && (
                  <>
                    <div class="w-1/2 bg-gray-200 rounded-full h-2.5 relative top-2 dark:bg-gray-700">
                      <div
                        class="bg-indigo-600 h-2.5 rounded-full dark:bg-indigo-500"
                        style={{
                          width: toPercent(
                            option.votes.length,
                            question.votes.length
                          ),
                        }}
                      ></div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
          <button
            className={`w-[49%] mx-auto text-white py-3 ${
              answered || timeLeft < 0 ? "bg-gray-600" : "bg-indigo-600"
            } rounded-lg mt-4`}
            disabled={answered || timeLeft <= 0}
            type="submit"
          >
            {answered ? "Voted" : timeLeft <= 0 ? "Time's up" : "Vote"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Question;
