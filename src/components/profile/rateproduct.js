import React, { useState, useEffect } from "react";

const StarRating = ({order, changeRating}) => {   //totalStars = 5
  const [ratingg, setRating] = useState(0); // Current rating
  const [hoveredRating, setHoveredRating] = useState(0); // Temporary hover rating

  useEffect(()=>{
    setRating(order.rating);
    },[order.rating])

  // Handle click on a star
  const handleClick = (index) => {
    setRating(index + 1);
    order.rating=index+1;
    changeRating(order);
  };

  // Handle mouse hover 
  const handleMouseEnter = (index) => {
    setHoveredRating(index + 1);
  };

  // Reset hover state on mouse leave
  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  return (
    <div style={styles.container}>
      {[...Array(5)].map((_, index) => (   //[...Array(totalStars)]
        <span
          key={index}
          style={{
            ...styles.star,
            color:
              index < (hoveredRating || ratingg) ? "#FFD700" : "#D3D3D3", // Highlight hovered or rated stars
          }}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          ★
        </span>
      ))}
      {/* <div style={styles.label}>
        Rating: {rating}/{totalStars}
      </div> */}
    </div>
  );
};

const styles = {
  container: {
    // display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  star: {
    fontSize: "30px",
    cursor: "pointer",
    transition: "color 0.2s ease-in-out",
  },
  label: {
    marginTop: "10px",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default StarRating;
