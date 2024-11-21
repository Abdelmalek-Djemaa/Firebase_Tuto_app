import React, { useEffect, useState, useCallback } from "react";
import { BsToggleOn, BsToggleOff, BsSearch, BsCardText } from "react-icons/bs"; 
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {ReactTyped} from "react-typed";

import { IoAddCircleOutline} from "react-icons/io5";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdOutlineDeleteOutline } from "react-icons/md";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { BiTaskX } from "react-icons/bi";

const MainApp = ({ setShowMainApp }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");
  const [queryExecuted, setQueryExecuted] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);


  const fetchTasks = useCallback(async () => {
    const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const taskList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTasks(taskList);
  }, []);

  const addTask = async () => {
    if (newTask.trim()) {
      try {
        const queryText = `addDoc(collection(db, "tasks"), { text: "${newTask}", completed: false, createdAt: new Date() });`;
        setQueryExecuted(queryText);
        await addDoc(collection(db, "tasks"), {
          text: newTask,
          completed: false,
          createdAt: new Date(),
        });
        setNewTask("");
        fetchTasks();
        toast.success("Task added successfully!");
      } catch (error) {
        toast.error("Failed to add task. Please try again.");
      }
    } else {
      toast.warning("Task cannot be empty!");
    }
  };
  

  const toggleTaskCompletion = async (taskId, currentStatus) => {
    try {
      const queryText = `updateDoc(doc(db, "tasks", "${taskId}"), { completed: ${!currentStatus} });`;
      setQueryExecuted(queryText);
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, { completed: !currentStatus });
      fetchTasks();
      toast.success(`Task marked as ${!currentStatus ? "completed" : "incomplete"}!`);
    } catch (error) {
      toast.error("Failed to update task status. Please try again.");
    }
  };
  

  const deleteTask = async (taskId) => {
    try {
      const queryText = `deleteDoc(doc(db, "tasks", "${taskId}"));`;
      setQueryExecuted(queryText);
      const taskRef = doc(db, "tasks", taskId);
      await deleteDoc(taskRef);
      fetchTasks();
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete task. Please try again.");
    }
  };

  const saveEditedTask = async (taskId) => {
    if (editedTaskText.trim()) {
      try {
        const queryText = `updateDoc(doc(db, "tasks", "${taskId}"), { text: "${editedTaskText}" });`;
        setQueryExecuted(queryText);
        const taskRef = doc(db, "tasks", taskId);
        await updateDoc(taskRef, { text: editedTaskText });
        setEditingTaskId(null);
        setEditedTaskText("");
        fetchTasks();
        toast.success("Task updated successfully!");
      } catch (error) {
        toast.error("Failed to update task. Please try again.");
      }
    } else {
      toast.warning("Task text cannot be empty!");
    }
  };
  

  const fetchFilteredTasks = async (searchQuery) => {
    if (!searchQuery.trim()) {
      toast.warning("Search query cannot be empty!");
      return;
    }
  
    try {
      const q = query(
        collection(db, "tasks"),
        where("text", ">=", searchQuery),
        where("text", "<=", searchQuery + "\uf8ff"),
        orderBy("text")
      );
  
      const querySnapshot = await getDocs(q);
      const taskList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      if (taskList.length === 0) {
        toast.info("No results found for your search.");
      }
  
      setTasks(taskList);
    } catch (error) {
      toast.error("Failed to fetch tasks. Please try again.");
    }
  };
  

  const handleSearch = () => {
    const firebaseQuery = `query(collection(db, "tasks"), where("text", "<=", "${searchQuery}"), where("text", ">=", "${searchQuery}\\uf8ff"), orderBy("text"))`;
    setQueryExecuted(firebaseQuery); // Display the Firebase query
    fetchFilteredTasks(searchQuery); // Fetch filtered tasks from Firebase
  };
  
    

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center w-full h-full z-[999] p-4 font-medium bg-[#171717] bg-opacity-60">
      <motion.div
        className="flex relative flex-col justify-center items-center max-w-xl w-full bg-[#171717] bg-opacity-95 shadow-xl shadow-[#4CCD99] rounded-3xl py-6 px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
      >
        <button
            onClick={setShowMainApp}
            className="absolute right-3 top-7 transform -translate-y-1/2 hover:scale-105 rounded-full p-1 bg-[#4CCD99] duration-300"
          >
            <AiOutlineFullscreenExit size={18} />
        </button>
        <span className="text-2xl border-b-2 rounded-full px-8 py-3">To do app example</span>
        <div className="relative w-full pb-1 pt-3 px-1">
          <input
            type="text"
            placeholder="Enter a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="w-full p-2.5 pr-12 sm:text-sm text-xs rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#4CCD99]"
          />
          <button
            onClick={addTask}
            className="absolute right-3 sm:top-10 top-9 transform -translate-y-1/2 p-1 rounded-full text-white hover:bg-[#3BB281] transition-all duration-300"
          >
            <IoAddCircleOutline size={26} />
          </button>
        </div>
        <div className="relative w-full px-1 pb-4">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2.5 pr-12 sm:text-sm text-xs rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#4CCD99]"
          />
          <button
            onClick={handleSearch}
            className="absolute right-3 sm:top-7 top-6 transform -translate-y-1/2 p-2 rounded-full text-white hover:bg-[#3BB281] transition-all duration-300"
          >
            <BsSearch size={18} />
          </button>
        </div>
        <ul className="w-full space-y-5 h-44 overflow-auto border-b-2 rounded-2xl py-3 px-1">
          {tasks.length === 0 ? (
            <li className="flex flex-col justify-center items-center h-full">
              <BiTaskX size={50} />
              <span className="text-gray-400 text-center py-2 text-sm">No Tasks</span>
            </li>
          ) : (
            tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center sm:px-4 px-2 rounded-lg bg-gray-800 text-white shadow-md hover:scale-[99%] duration-200"
              >
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={editedTaskText}
                    autoFocus
                    onChange={(e) => setEditedTaskText(e.target.value)}
                    className="w-full bg-gray-800 text-white sm:text-sm text-xs font-normal focus:outline-none"
                  />
                ) : (
                  <span
                    className="flex justify-start items-center sm:text-sm text-xs font-normal cursor-pointer w-full text-start relative"
                    onClick={() => {
                      setEditingTaskId(task.id);
                      setEditedTaskText(task.text);
                    }}
                  >
                    <span className="absolute -top-5 left-1/2 bg-gray-800 rounded-t-full px-4 text-[10px]">
                      {new Date(task.createdAt.seconds * 1000).toLocaleDateString()}
                    </span>
                    <BsCardText size={24} className="pr-2" />
                    {task.text}
                  </span>
                )}
                <div className="flex space-x-2">
                  {editingTaskId === task.id ? (
                    <button
                      onClick={() => saveEditedTask(task.id)}
                      className="text-green-500 hover:scale-105 duration-200"
                    >
                      <FaRegCircleCheck size={22} />
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleTaskCompletion(task.id, task.completed)}
                      className="py-1 rounded-lg text-white transition-all duration-300"
                    >
                      {task.completed ? (
                        <BsToggleOn
                          size={26}
                          className="text-green-500 hover:text-green-400 duration-200"
                        />
                      ) : (
                        <BsToggleOff
                          size={26}
                          className="text-white hover:text-gray-400 duration-200"
                        />
                      )}
                    </button>
                  )}
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="py-1 rounded-lg text-white font-medium"
                  >
                    <MdOutlineDeleteOutline
                      size={30}
                      className="hover:bg-red-400 p-1 rounded-full duration-200"
                    />
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
        <div className="w-full py-2 mt-2">
          <div className="px-5 pt-4 shadow-lg text-gray-100 sm:text-sm text-xs font-mono bg-gray-800 pb-6 rounded-lg h-32">
            <div className="top mb-2 flex">
              <div className="h-3 w-3 bg-red-500 rounded-full"></div>
              <div className="ml-2 h-3 w-3 bg-orange-300 rounded-full"></div>
              <div className="ml-2 h-3 w-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex pb-4 text-start h-full">
              <span className="text-green-400">computer:~$</span>
              <div className="flex-1 typing items-center pl-2">
              <ReactTyped
                      strings={[queryExecuted]}
                      typeSpeed={50}
                      backSpeed={30}
                      backDelay={1000}
                      loop={false}
                  />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        className="text-sm"
      />
    </div>
  );
};

export default MainApp;