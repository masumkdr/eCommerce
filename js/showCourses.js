let courseItem = document.querySelector('.courseItem');
let authorDropdown = document.getElementById('authorDropdown');
let categoryDropdown = document.getElementById('categoryDropdown');
let categoryMenu = document.querySelector('.categoryMenu');
let authorMenu = document.querySelector('.authorMenu');
let searchInput = document.querySelector('.searchInput');
let searchIcon = document.querySelector('.searchIcon');
let courses = new Courses();
let category = [];
let author = [];

document.addEventListener("DOMContentLoaded", showAllCourses);
authorDropdown.addEventListener("click", selectAuthorMenu);
categoryDropdown.addEventListener("click", selectAuthorMenu);
searchIcon.addEventListener("click", searchCourses);
courseItem.addEventListener("click", (e) => {
    let id = e.target.closest('.card').getAttribute('id')
    courses.getCourses()
        .then(courses => {
            courses.forEach(course => {
                if(course.id == id) {
                    //ui.showCourseDetails(course);
                    let name = course.name.toLowerCase().replace(/\s/g, '_');
                    location.assign(`course_details.html#${course.id}#${name}`)
                }
            });
        })
});


function showAllCourses() {
    courses.getCourses()
        .then(courses => {
            courses.forEach(course => {
                category.push(course.category);
                author.push(course.author.name)
                ui.showCourses(course, courseItem);
            });
        })
        .then(() => {
            let navbar = document.querySelector('.navbar');
            navbar.classList.add("bg-info", "fixed-top");
        })
        .then(() => {
            let newCategory = [...new Set(category)];
            let newAuthor = [...new Set(author)];
            ui.generateCatAuthorMenu(newCategory, categoryMenu);
            ui.generateCatAuthorMenu(newAuthor, authorMenu);
        })
        
}




function selectAuthorMenu() {
    let dropdownItems = document.querySelectorAll('.dropdown-item');
    console.log(dropdownItems)
    dropdownItems.forEach(downdownItem => {
        downdownItem.addEventListener('click', (e) => {
            console.log(e.target)
            if (e.target.parentElement.parentElement.classList.contains("categoryMenu")) {
                categoryDropdown.innerHTML = e.target.innerHTML;
                let category = categoryDropdown.innerHTML;
                courses.getCourses()
                    .then(courses => {
                        courseItem.innerHTML = ""
                        courses.forEach(course => {
                            if (category == course.category && category != "All") {
                                authorDropdown.innerHTML = "All";
                                ui.showCourses(course, courseItem);
                            } if (category == "All") {
                                ui.showCourses(course, courseItem);
                            }
                        });
                    })
            }
            if (e.target.parentElement.parentElement.classList.contains("authorMenu")) {
                authorDropdown.innerHTML = e.target.innerHTML;
                let author = authorDropdown.innerHTML;
                courses.getCourses()
                    .then(courses => {
                        courseItem.innerHTML = ""
                        courses.forEach(course => {
                            if (author == course.author.name && author != "All") {
                                categoryDropdown.innerHTML = "All";
                                ui.showCourses(course, courseItem);
                            } if (author == "All") {
                                ui.showCourses(course, courseItem);
                            }
                        });
                    })
            }
        })
    })
}


function searchCourses() {
    let filteredCourse = [];
    courseItem.innerHTML = ""
    categoryDropdown.innerHTML = "All";
    authorDropdown.innerHTML = "All";
    courses.getCourses()
        .then(courses => {
            //  courseItem.innerHTML = ""
            courses = courses.filter(course => {
                let name = course.name.toLowerCase();
                let category = course.category.toLowerCase();
                let description = course.description.toLowerCase();
                let author = course.author.name.toLowerCase();
                //let price = course.price;
                let inText = searchInput.value.toLowerCase();
            // console.log(name.includes(inText), name)
                if (name.includes(inText) || category.includes(inText) || description.includes(inText) || author.includes(inText)) {

                    ui.showCourses(course, courseItem)
                    
                }

            });
        })
}

