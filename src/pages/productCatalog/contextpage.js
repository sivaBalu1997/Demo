
import React, { createContext, useState } from 'react';

// Create a context
export const Contextpagejs = createContext();

// Create a provider component
export const Contextpage = ({ children }) => {
    const pages=['Step 1: Primary Details','Step 2: Pricing and kitchen details','Step 3: Item customizations']
    const menuItems = ['Pricing', 'Availability','Inventory','Customize'];
    const [activeCategory, setActiveCategory] = useState('Step 1: Primary Details');
    const [isExpanded, setIsExpanded]=useState()
    const [saveandnext, setsaveandnext]=useState(false);
    const [active, setActive] = useState('');
    const [pen, setPen] = useState(false);


  return (
    <Contextpagejs.Provider value={{ 
      pages,
      activeCategory, 
      setActiveCategory,
      isExpanded,
      setIsExpanded,
      saveandnext,
      setsaveandnext,
      menuItems,
      active,
      setActive,
      pen,
      setPen
    }}>
      {children}
    </Contextpagejs.Provider>
  );
};

