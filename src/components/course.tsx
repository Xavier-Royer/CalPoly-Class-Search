import PropTypes from 'prop-types';


function Course(course:CourseProps) {
    return (
    <div className="course-container">
    <h3>{course.title} - {course.major_id}</h3>
    
        <div className="details-contianer">
        <div className="description-container">
            <h4>Description</h4>
            <p>{course.description}</p>
        </div>
    
        <div className="extra-info-container">
            <h4>Additional Information</h4>
            
            <div> Course Code: {course.code} </div>

            {course.min_credits != course.max_credits ? <div> Units: {course.min_credits}-{course.max_credits}</div> : <div> Units: {course.max_credits} </div> }

            {course.terms_offered == "NONE" ? null : <div>Terms Offered: {course.terms_offered}</div>}
    
            {course.prerequisites == "NONE" ? null : <p> Prerequisites:  {course.prerequisites }</p> }
        
        
        </div>
        </div>
    
    </div>
    );
}

type CourseProps = {
    major_id: string;
    title: string;
    code: string;
    description: string;
    min_credits: number;
    max_credits: number;
    terms_offered: string;
    prerequisites: string;
}



Course.PropTypes = {
    course: PropTypes.shape({
        major: PropTypes.string,
        title: PropTypes.string,
        code: PropTypes.string,
        description: PropTypes.string,
        minUnits: PropTypes.number,
        maxUnits: PropTypes.number,
        termsOffered: PropTypes.string,
        prerequisites: PropTypes.string,
    })
}


export default Course;