import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBoards } from "../services/boardService";

function Boards() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const data = await getBoards();
      setBoards(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "700px", margin: "0 auto" }}>
      <h1 className="page-title">Boards</h1>

      {boards.map((board) => (
        <Link to={`/boards/${board._id}`} key={board._id} className="board-link-card">
          <h3>{board.name}</h3>
          <p>Workspace: {board.workspaceId}</p>
        </Link>
      ))}
    </div>
  );
}

export default Boards;