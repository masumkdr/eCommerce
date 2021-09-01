let courses = new Courses();
let cartItem = document.querySelector('.cartItem');
let allCourses = document.querySelector('.allCourses');


document.addEventListener("DOMContentLoaded", fetchProducts);
allCourses.addEventListener("click", viewCoursePage);
cartItem.addEventListener("click", (e) => {
    let id = e.target.closest('.card').getAttribute('id')
    courses.getCourses()
        .then(courses => {
            courses.forEach(course => {
                if(course.id == id) {
                   // ui.showCourseDetails(course);
                    let name = course.name.toLowerCase().replace(/\s/g, '_');
                    location.assign(`course_details.html#${course.id}#${name}`)
                }
            });
        })
});


function fetchProducts() {
    courses.getCourses()
    .then(courses => {
        courses.forEach(course => {
            if(course.id == 1 || course.id == 2 ||course.id == 3) {
                ui.showCourses(course, cartItem);
            }
        });
    })
}



function viewCoursePage() {
    console.log("clicked")
    location.href = "courses.html";
 
}
