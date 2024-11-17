import React, { useEffect, useState, useCallback } from "react";
import { BsToggleOn, BsToggleOff } from "react-icons/bs"; 
import { motion } from "framer-motion";
import { GoTasklist } from "react-icons/go";
import { IoAddCircleOutline } from "react-icons/io5";
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
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

const MainApp = ({ setShowMainApp }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");
  const [queryExecuted, setQueryExecuted] = useState(""); // Full query
  const [typedQuery, setTypedQuery] = useState(""); // The typed query
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  // Simulate typing effect for query
  // Simulate typing effect for query
  useEffect(() => {
    if (queryExecuted) {
      // Reset typedQuery whenever queryExecuted changes
      setTypedQuery("");

      let index = -1;
      const interval = setInterval(() => {
        if (index < queryExecuted.length-1) {
          setTypedQuery((prev) => prev + queryExecuted[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 100); // Adjust typing speed (100ms per character)

      // Manage cursor blinking
      const cursorInterval = setInterval(() => {
        setCursorVisible((prev) => !prev); // Toggle cursor visibility
      }, 500); // Cursor blinks every 500ms

      return () => {
        clearInterval(interval);
        clearInterval(cursorInterval);
      };
    }
  }, [queryExecuted]);

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
      const queryText = `addDoc(collection(db, "tasks"), { text: "${newTask}", completed: false, createdAt: new Date() });`;
      setQueryExecuted(queryText);
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
    const queryText = `updateDoc(doc(db, "tasks", "${taskId}"), { completed: ${!currentStatus} });`;
    setQueryExecuted(queryText);
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, { completed: !currentStatus });
    fetchTasks();
  };

  const deleteTask = async (taskId) => {
    const queryText = `deleteDoc(doc(db, "tasks", "${taskId}"));`;
    setQueryExecuted(queryText);
    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
    fetchTasks();
  };

  const saveEditedTask = async (taskId) => {
    if (editedTaskText.trim()) {
      const queryText = `updateDoc(doc(db, "tasks", "${taskId}"), { text: "${editedTaskText}" });`;
      setQueryExecuted(queryText);
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, { text: editedTaskText });
      setEditingTaskId(null);
      setEditedTaskText("");
      fetchTasks();
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center w-full h-full z-[999] p-4 font-medium bg-[#171717] bg-opacity-60">
      <motion.div
        className="flex flex-col justify-center items-center max-w-xl w-full bg-[#171717] bg-opacity-95 shadow-xl shadow-[#4CCD99] rounded-3xl py-6 px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
      >
        <div className="p-4 text-white rounded-full shadow-2xl shadow-[#4CCD99]">
          <GoTasklist size={45} />
        </div>
        <div className="relative w-full my-2 px-1">
          <input
            type="text"
            placeholder="Enter a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="w-full p-2.5 pr-12 sm:text-sm text-xs rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#4CCD99]"
          />
          <button
            onClick={addTask}
            className="absolute right-3 sm:top-7 top-6 transform -translate-y-1/2 p-1 rounded-full text-white hover:bg-[#3BB281] transition-all duration-300"
          >
            <IoAddCircleOutline size={26} />
          </button>
        </div>
        <ul className="w-full space-y-2 h-40 overflow-auto border-b-2 rounded-lg py-4 px-1">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center px-4 rounded-lg bg-gray-800 text-white shadow-md hover:scale-[99%] duration-200"
            >
              {editingTaskId === task.id ? (
                <input
                  type="text"
                  value={editedTaskText}
                  autoFocus
                  onChange={(e) => setEditedTaskText(e.target.value)}
                  className="w-full bg-gray-800 text-white sm:text-sm text-xs font-normal focus:outline-none "
                />
              ) : (
                <span
                  className="sm:text-sm text-xs font-normal cursor-pointer w-full text-start"
                  onClick={() => {
                    setEditingTaskId(task.id);
                    setEditedTaskText(task.text);
                  }}
                >
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
                    className="p-1 rounded-lg text-white transition-all duration-300"
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
                  className="p-1 rounded-lg text-white font-medium"
                >
                  <MdOutlineDeleteOutline
                    size={30}
                    className="hover:bg-red-400 p-1 rounded-full duration-200"
                  />
                </button>
              </div>
            </li>
          ))}
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
              <p className="flex-1 typing items-center pl-2">
                {/* Display the typed query */}
                <div>{typedQuery} 
                <span
                  className={`cursor-blink ${cursorVisible ? "opacity-100" : "opacity-0"}`}
                >
                  |
                </span>
                </div>
                
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