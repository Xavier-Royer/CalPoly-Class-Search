import PropTypes from 'prop-types';


function Course(course:CourseProps) {
    return (
    <div className="course-container">
    <h3>{course.title} - {course.major}</h3>
    
        <div className="details-contianer">
        <div className="description-container">
            <h4>Description</h4>
            <p>{course.description}</p>
        </div>
    
        <div className="extra-info-container">
            <h4>Additional Information</h4>

            {course.termsOffered == "NONE" ? null : <div>Terms Offered: {course.termsOffered}</div>}
    
            {course.minUnits != course.maxUnits ? <div> Units: {course.minUnits}-{course.maxUnits}</div> : <div> Units: {course.maxUnits} </div> }
    
            {course.prerequisites == "NONE" ? null : <div> "Prerequisites: " {course.prerequisites }</div> }
        </div>
        </div>
    
    </div>
    );
}

type CourseProps = {
    major: string;
    title: string;
    code: string;
    description: string;
    minUnits: number;
    maxUnits: number;
    termsOffered: string;
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