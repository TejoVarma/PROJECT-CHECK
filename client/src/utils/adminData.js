const URL = "http://localhost:4000";

export async function getCars(){
    return await fetch(`${URL}/admin/cars`,{
        headers : {
            "authorization" : JSON.parse(localStorage.getItem('adminToken'))
        }
    })
    .then(res=>res.json())
    .catch(err=>alert(err.message))
};
export async function getCarById(id){
    return await fetch(`${URL}/admin/cars/${id}`,{
        headers : {
            "authorization" : JSON.parse(localStorage.getItem('adminToken'))
        }
    })
    .then(res=>res.json())
    .catch(err=>alert(err.message))
};

export async function addNewCar(car) {
    return await fetch(`${URL}/admin/newcar`,{
        method : "POST",
        headers : {
            "authorization" : JSON.parse(localStorage.getItem('adminToken'))
        },
        body : car
    })
    .then(res => res.json())
    .catch(err => alert(err.message));
}

export async function editCar(car,id){
    return await fetch(`${URL}/admin/car/${id}`, {
        method : "PUT",
        headers : {
            "authorization" : JSON.parse(localStorage.getItem('adminToken'))
        },
        body : car
    })
    .then(res=>res.json())
    .catch(err => alert(err.message))
}
export async function deleteCar(id){
    return await fetch(`${URL}/admin/car/${id}`, {
        method : "DELETE",
        headers : {
            "authorization" : JSON.parse(localStorage.getItem('adminToken'))
        },
    })
    .then(res=>res.json())
    .catch(err => alert(err.message))
}