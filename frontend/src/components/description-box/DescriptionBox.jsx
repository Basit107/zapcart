import React from "react";
import './description-box.css'

const DescriptionBox = () => {
    return (
        <div className="description-box">
            <div className="description-box-navigator">
                <div className="descriptionbox-nav-box">Description</div>
                <div className="descriptionbox-nav-box fade">Reviews</div>
            </div>
            <div className="descriptionbox-description">
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam ipsa cupiditate eum. 
                    Ipsam ullam error autem! At eaque voluptas harum
                     explicabo obcaecati vitae, sint
                      exercitationem magni, consequatur a nihil laboriosam.
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                    Unde asperiores deserunt voluptate consectetur quibusdam neque quisquam 
                    ipsum facilis, a quae, animi aspernatur, nesciunt possimus maiores modi ratione magnam pariatur dicta?
                </p>
            </div>
        </div>
    )
}

export default DescriptionBox;