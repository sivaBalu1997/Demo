import React, { useRef, useEffect, useContext } from "react";
import "./NavSlider.scss"; // Import a CSS file for styling
import PricingSlider from "../PricingSlider/PricingSlider";
import AvailabilitySlider from "../AvailibilitySlider/AvailabilitySlider";
import Inventory from "../Inventory/Inventory";
import CustomizeSlider from "../CustomizeSlider/CustomizeSlider";
import { Contextpagejs } from "../../../pages/productCatalog/contextpage";

interface NavMenuProps {
  pen?: true; 
  sidebartext: string | null;
  eye?: boolean;
  trash?: boolean;
  SideBarData?: SideBarData[];
}
interface SideBarData {
  id: number;
  itemName: string;
  code: string;
  type: string;
  mealType: string;
  dietary: string;
  cusine: string;
  pricingdetails: {
    Dinein1: string[];
    Pickup1: string[];
    Delivery1: string[];
    Dinein2: string[];
    Pickup2: string[];
    Delivery2: string[];
    Inventory1: string[];
    Customize1: string[];
  };
}

const NavMenu: React.FC<NavMenuProps> = ({
  pen,
  eye,
  sidebartext,
}) => {
  const { menuItems, active, setActive } = useContext(Contextpagejs);

  // Create refs for each section
  const pricingRef = useRef<HTMLDivElement | null>(null);
  const availabilityRef = useRef<HTMLDivElement | null>(null);
  const inventoryRef = useRef<HTMLDivElement | null>(null);
  const customizeRef = useRef<HTMLDivElement | null>(null);

  const handleItemClick = (item: string) => {
    setActive(item);
    scrollToComponent(item);
  };

  useEffect(() => {
    if (sidebartext) {
      setActive(sidebartext);
      scrollToComponent(sidebartext);
    }
  }, [sidebartext, setActive]);

  const scrollToComponent = (item: string) => {
    switch (item) {
      case "Pricing":
        pricingRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "Availability":
        availabilityRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "Inventory":
        inventoryRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "Customize":
        customizeRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActive(entry.target.getAttribute("data-section") || "");
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, 
    });

    if (pricingRef.current) observer.observe(pricingRef.current);
    if (availabilityRef.current) observer.observe(availabilityRef.current);
    if (inventoryRef.current) observer.observe(inventoryRef.current);
    if (customizeRef.current) observer.observe(customizeRef.current);

    return () => {
      if (pricingRef.current) observer.unobserve(pricingRef.current);
      if (availabilityRef.current) observer.unobserve(availabilityRef.current);
      if (inventoryRef.current) observer.unobserve(inventoryRef.current);
      if (customizeRef.current) observer.unobserve(customizeRef.current);
    };
  }, []);

  return (
    <>
      <nav className={`nav-menu`}>
        <ul className="nav-list">
          {menuItems.map((item: string, index: number) => (
            <li
              key={index}
              className={`nav-item ${active === item ? "active" : ""}`}
              onClick={() => handleItemClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
      <div className="type-div"></div>
      <div className="navmenu-container">
        <div ref={pricingRef} className="section" data-section="Pricing">
          <PricingSlider />
        </div>
        <div
          ref={availabilityRef}
          className="section"
          data-section="Availability"
        >
          <AvailabilitySlider />
        </div>
        <div ref={inventoryRef} className="section" data-section="Inventory">
          <Inventory  />
        </div>
        <div ref={customizeRef} className="section" data-section="Customize">
          <CustomizeSlider />
        </div>
      </div>
    </>
  );
};

export default NavMenu;
