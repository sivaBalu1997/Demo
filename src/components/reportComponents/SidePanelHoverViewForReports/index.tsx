import React, { useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './style.scss';

interface NavigationItem {
  id: string;
  label: string;
  path: string;
}

const SidePanelHoverViewForReports: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const history = useHistory();
  const location = useLocation();
  const panelRef = useRef<HTMLDivElement>(null);

  const navItems: NavigationItem[] = [
    { id: 'sales', label: 'Sales', path: '/sales-reports' },
    { id: 'check-in', label: 'Check-in', path: '/check-in-reports' },
    { id: 'reports-and-insights', label: 'Reports & Insights', path: '/old-reports' },
  ];

  const handleNavigation = (item: NavigationItem) => {
    if (location.pathname !== item.path) {
      history.push(item.path);
    }
    onClose(); // Close panel after navigating
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <nav className="navigation-hover-view-reports" ref={panelRef}>
      <ul className="navigation-hover-view-reports__list">
        {navItems.map((item) => (
          <li key={item.id} className="navigation-hover-view-reports__item">
            <div
              onClick={() => handleNavigation(item)}
              className={`navigation-hover-view-reports__link ${
                location.pathname === item.path ? 'active' : ''
              }`}
            >
              {item.label}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidePanelHoverViewForReports;
