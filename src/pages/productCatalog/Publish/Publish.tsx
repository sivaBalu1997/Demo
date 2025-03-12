import React from "react";
import SidePanel from "pages/SidePanel";
import "./Publish.scss";
interface FoodItem {
  id: number;

  name: string;
  code: string;
  createdBy: string;
}

const foodItems: FoodItem[] = [
  {
    id: 1,
    name: "Veg Burger Pizza",
    code: "12345",
    createdBy: "Aarapalayam",
  },
  {
    id: 2,
    name: "Veg Burger Pizza",
    code: "12345",
    createdBy: "Aarapalayam",
  },
  {
    id: 3,
    name: "Veg Burger Pizza",
    code: "12345",
    createdBy: "Aarapalayam",
  },
  {
    id: 4,
    name: "Veg Burger Pizza",
    code: "12345",
    createdBy: "Aarapalayam",
  },
  {
    id: 5,
    name: "Veg Burger Pizza",
    code: "12345",
    createdBy: "Aarapalayam",
  },
  {
    id: 6,
    name: "Veg Burger Pizza",
    code: "12345",
    createdBy: "Aarapalayam",
  },
  {
    id: 7,
    name: "Veg Burger Pizza",
    code: "12345",
    createdBy: "Aarapalayam",
  },
  {
    id: 8,
    name: "Veg Burger Pizza",
    code: "12345",
    createdBy: "Aarapalayam",
  },
];
const baseImageUrl = process.env.REACT_APP_IMAGE_DOMAIN;
const Publish = () => {
  return (
    <div style={{ display: "flex", overflowX: "hidden" }}>
      <SidePanel />

      <div className="Publish-page-main">
        <div className="Publish-page-heading">
          <h1>Food items draft</h1>
        </div>
        <div className="Publish-page-Table">
          <table>
            <thead className="Publish-page-Thead">
              <tr>
                <th>Image</th>
                <th>Item Name</th>
                <th>Code</th>
                <th>Created by</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody className="Publish-page-Tbody">
              <>
                {foodItems.map((item) => (
                  <tr key={item.id} className="Publish-page-Tbody-row">
                    <td className="Publish-page-image">
                      <img
                        src={
                          baseImageUrl +
                          "photo/2023/07/12/20/40/ai-generated-8123328_640.png"
                        }
                        alt={item.name}
                        className="image"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.code}</td>
                    <td>{item.createdBy}</td>
                    <td className="Action-Buttons">
                      <button className="button review">REVIEW</button>
                      <button className="button publish">PUBLISH</button>
                      <button className="button delete">DELETE</button>
                    </td>
                  </tr>
                ))}
              </>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Publish;
