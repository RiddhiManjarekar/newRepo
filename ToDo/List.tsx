import { useState, useEffect } from "react";

export default function List() {
  const [list, setList] = useState<string[]>([]);
  const [inputData, setInputData] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  useEffect(() => {
    const savedList = localStorage.getItem("myList");
    if (savedList) {
      setList(JSON.parse(savedList));
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(list));
  }, [list]);

  
  const handleAdd = () => {
    if (inputData) {
      setList([...list, inputData]);
      setInputData("");
    }
  };


  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditData(list[index]);
  };

  const handleSaveEdit = () => {
    if (editIndex !== null) {
      const updatedList = list.map((item, index) =>
        index === editIndex ? editData : item
      );
      setList(updatedList);
      setEditIndex(null);
      setEditData("");
    }
  };

  
  const handleDelete = (index: number) => {
    setList(list.filter((item, i) => i !== index));
  };


  const handleDeleteAll = () => {
    setIsModalOpen(true);
  };

  
  const confirmDeleteAll = () => {
    setList([]);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <input type="text" value={inputData} onChange={(e) => setInputData(e.target.value)} placeholder="Enter item"/>
      <button onClick={handleAdd}>Add</button>

      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input type="text" value={editData} onChange={(e) => setEditData(e.target.value)}/>
                <button onClick={handleSaveEdit}>Save</button>
              </>
            ) : (
              <>
                {item}
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>

     
      {list.length > 0 && <button onClick={handleDeleteAll}>Delete All</button>}

      {isModalOpen && (
        <div>
          <p>Are you sure you want to delete all items?</p>
          <button onClick={confirmDeleteAll}>Yes</button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
