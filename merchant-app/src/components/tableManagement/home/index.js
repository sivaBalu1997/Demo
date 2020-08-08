import React from "react";
import Header from "../../common/header";
import Menu from "../menu";
import bookTable from "../../../assets/images/book_table.png";
import assignTable from "../../../assets/images/assign_table.png";
import "../../../styles/table-mangagement/home.scss";
import TableMenu from "../tableMenu";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="home-section">
        <Menu />
        <div className="main-section">
          <div className="table-section">
            <div>
              <img src={bookTable} alt="book" />
              <h3>Book table</h3>
            </div>
            <div>
              <img src={assignTable} alt="assign" />
              <h3>Assign table</h3>
            </div>
          </div>
        </div>
      </div>
      <TableMenu />
    </div>
  );
};

export default Home;
