import React from "react";

const NoSmallScreen = () => (
    <div
        style={{
            textAlign: "center",
            marginTop: "20vh",
            fontSize: "24px",
            fontWeight: "bold",
            color: "black",
        }}
    >
        <div className="img-div">
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOopV5roGUmicCWM64LzkwGFF6jchIYnZdzQ&s"
                alt="404"
            />
        </div>
        <div className="no-small-screen">For best experience, visit from a larger screen</div>
    </div>
);

export default NoSmallScreen;
