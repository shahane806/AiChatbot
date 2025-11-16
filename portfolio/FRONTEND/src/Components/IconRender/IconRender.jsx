import React from 'react';

// Import your icons
import TSI_ICON from '../../Assets/ChatbotIcons/TSI.png';
import DigitRecogIcon from '../../Assets/ChatbotIcons/digit_recog.png';

const IconRender = ({ name }) => {
  // Map the iconName to the actual icon
  const icons = {
    'TSI': TSI_ICON,
    'DigitRecog': DigitRecogIcon,
  };

  // Use the icon from the map or default if not found
  const icon = icons[name];
  return (
    <div>
    <img src={icon} alt={name} style={{ width: "70px", height: "70px", borderRadius: "3px" }}></img>
    </div>
  );
};

export default IconRender;
