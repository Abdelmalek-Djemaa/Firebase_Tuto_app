import React, { useEffect, useState } from "react";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { BsToggleOn, BsToggleOff } from "react-icons/bs"; // Import toggle icons
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { GoTasklist } from "react-icons/go";

const MainApp = ({ setShowMainApp }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const taskList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTasks(taskList);
  };

  const addTask = async () => {
    if (newTask.trim()) {
      await addDoc(collection(db, "tasks"), {
        text: newTask,
        completed: false,
        createdAt: new Date(),
      });
      setNewTask("");
      fetchTasks();
    }
  };

  const toggleTaskCompletion = async (taskId, currentStatus) => {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, { completed: !currentStatus });
    fetchTasks();
  };

  const deleteTask = async (taskId) => {
    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
    fetchTasks();
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center z-[999] p-4 font-medium bg-[#171717] bg-opacity-60">
      <motion.div
        className="flex flex-col justify-center items-center max-w-xl w-full bg-[#171717] bg-opacity-95 shadow-xl shadow-[#4CCD99] rounded-3xl p-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
      >
        <div className="p-4 text-white rounded-full shadow-2xl shadow-[#4CCD99]">
        <GoTasklist size={45} />
        </div>
        <div className="relative w-full my-2">
          <input
            type="text"
            placeholder="Enter a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="w-full p-3 pr-12 text-sm rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#4CCD99]"
          />
          <button
            onClick={addTask}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-[#4CCD99] text-white hover:bg-[#3BB281] transition-all duration-300"
          >
            <RiStickyNoteAddLine size={20} />
          </button>
        </div>
        <ul className="w-full space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center py-2 px-4 rounded-lg bg-gray-800 text-white shadow-md"
            >
              <span className="text-sm">{task.text}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleTaskCompletion(task.id, task.completed)}
                  className="p-1 rounded-lg text-white transition-all duration-300"
                >
                  {task.completed ? (
                    <BsToggleOn size={26} className="text-green-500 hover:text-green-400 duration-200" />
                  ) : (
                    <BsToggleOff size={26} className="text-white hover:text-gray-400 duration-100" />
                  )}
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-1 rounded-lg text-white font-medium"
                >
                  <MdOutlineDeleteOutline size={24} className="hover:text-red-400" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="w-full py-2 mt-4">
          <div className="px-5 pt-4 shadow-lg text-gray-100 sm:text-sm text-xs font-mono bg-gray-800 pb-6 rounded-lg h-28">
            <div className="top mb-2 flex">
              <div className="h-3 w-3 bg-red-500 rounded-full"></div>
              <div className="ml-2 h-3 w-3 bg-orange-300 rounded-full"></div>
              <div className="ml-2 h-3 w-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex pb-4 text-start">
              <span className="text-green-400">computer:~$</span>
              <p className="flex-1 typing items-center pl-2">
                <TypeAnimation
                  sequence={[
                    "addDoc(collection(db, 'tasks'), { text: newTask, completed: false, createdAt: new Date() });",
                    1000,
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={0}
                  style={{ display: "inline-block" }}
                />
              </p>
            </div>
          </div>
        </div>
        <div
          className="px-4 py-2 mt-4 rounded-full border-2 font-medium sm:text-lg text-sm text-white hover:text-[#4CCD99] hover:border-[#4CCD99] duration-200 cursor-pointer"
          onClick={setShowMainApp}
        >
          Cancel
        </div>
      </motion.div>
    </div>
  );
};

export default MainApp;
