class Courses {
    async getCourses() {
        try {
            let res = await fetch('data/courses.json')
            let data = await res.json();
       //     console.log(data)
            let courses = data.courses;
            return courses;
        } catch (error) {
            console.log(error)
        }
    } 

    async getCoupons() {
        try {
            let res = await fetch('data/coupon.json')
            let data = await res.json();
       //     console.log(data)
            let coupons = data.coupons;
            return coupons;
        } catch (error) {
            console.log(error)
        }
    } 


}