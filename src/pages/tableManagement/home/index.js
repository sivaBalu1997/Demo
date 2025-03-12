import React from "react";
import Header from "../../common/header";
import bookTable from "../../../assets/images/book_table.png";
import assignTable from "../../../assets/images/assign_table.png";
import "../../../styles/table-mangagement/home.scss";
import TableMenu from "../tableMenu";
import SidePanel from "pages/SidePanel/indexOld";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="home-section">
        <SidePanel />
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
