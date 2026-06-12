import React from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

import env from 'dotenv';
env.config();

const Display_service = (props) => {
    console.log(props);
    
    const navigate = useNavigate();

    const handlePhotographerClick = async (name, serviceType) => {
        try {
            const response = await axios.get(`${process.env.VITE_API_BASE_URL}/getStudios`, {
                params: {
                    service: serviceType,
                },
            });
            const studios = response.data;

            console.log(response);


            const matchedStudio = studios.find(
                (studio) => studio.studio_name === name
            );

            if (matchedStudio && matchedStudio._id) {
                navigate(`/getPhotographerImages/${matchedStudio._id}`);
            } else {
                alert("Photographer not found in studios.");
            }
        } catch (error) {
            console.error("Error fetching studios:", error);
        }
    };

    return (
        <p className='display-service'>
            {
                props.parsed.length > 0 ?
                    (<>
                        <strong>{props.serviceType}:</strong>
                        {(() => {
                            let photographers = [];

                            try {
                                let parsed = props.parsed;
                                console.log("parsed", props.parsed);
                                

                                // Handle nested stringified JSON
                                while (typeof parsed === "string") {
                                    parsed = JSON.parse(parsed);
                                }

                                if (Array.isArray(parsed)) {
                                    photographers = parsed;
                                } else if (typeof parsed === "string") {
                                    photographers = [parsed];
                                }
                            } catch (err) {
                                console.error("Failed to parse photographers:", err);
                            }

                            return (
                                <div className='service-display'>
                                    {
                                        Array.isArray(photographers)
                                            ? photographers.map((name, index) => (
                                                <span

                                                    key={index}
                                                    style={{
                                                        marginLeft: "10px",
                                                        color: "black", // note: this overrides earlier "blue"
                                                        cursor: "pointer",
                                                        textDecoration: "none",
                                                        padding: "8px 16px",
                                                        border: "1px solid #dfdfdf",
                                                        borderRadius: "8px",
                                                        whiteSpace: "nowrap",  // ✅ fix
                                                        boxShadow: "0 0 4px, 0 0 4px black"
                                                    }}

                                                    onClick={() => { props.setService(props.serviceType); handlePhotographerClick(name, props.serviceType) }}
                                                >
                                                    {name}
                                                </span>
                                            ))
                                            : null
                                    }
                                </div>
                            )
                        })()}
                    </>) : null
            }
        </p>
    )
}

export default Display_service
