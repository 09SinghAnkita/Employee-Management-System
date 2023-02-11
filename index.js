
(async function(){

    const data = await fetch("./data.json");
    const response = await data.json()
    let list = response

    let selectedEmployee = list[0]
    let selectedEmployeeID = selectedEmployee.id

    const employeeList = document.querySelector(".employeeList")
    const employeeDetails = document.querySelector(".employeeDetails")

    const addButton = document.querySelector(".addButton")
    const addEmployee = document.querySelector(".addEmployee")
    const employeeForm = document.querySelector(".employeeForm")

    const dobInput = document.querySelector(".dob");
    dobInput.max = `${new Date().getFullYear() - 18}-${new Date().toISOString().slice(5, 10)}`  

    // Modal -->Display
    addButton.addEventListener("click", ()=>{
        addEmployee.style.display = "flex"
    })
    addEmployee.addEventListener("click", (e) => {
        if (e.target.className === "addEmployee") {
            addEmployee.style.display = "none";
        }
      });

       //Add employee
       employeeForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        const newEmployeeData = new FormData(employeeForm);
        const newData = [...newEmployeeData.entries()]
        const sendData = {}
        newData.map((item)=>{ 
        sendData[item[0]] = item[1];
        })
        sendData.id = list[list.length-1].id +1;
        sendData.age =   new Date().getFullYear() - sendData.dob.slice(0, 4); 
        sendData.imageUrl = sendData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
        list.push(sendData)
        showEmployeeList()
        employeeForm.reset();
        addEmployee.style.display = "none";
      })


    employeeList.addEventListener("click", (e)=>{
        //select employee
        if(e.target.tagName==="SPAN"){
            selectedEmployee = list.filter((emp)=>emp.id==e.target.id)[0]
            selectedEmployeeID = selectedEmployee.id
            showEmployeeList()
            showDetails()
        }
        //delete employee
    if(e.target.tagName==="I"){
      list= list.filter((item)=>item.id!=e.target.parentNode.id)   
        showEmployeeList()
        if(e.target.parentNode.id==selectedEmployeeID){
            selectedEmployeeID = list[0]?.id || -1
            selectedEmployee = list[0]||{} 
            showDetails()
        }
    }
    })

//show the list
function showEmployeeList(){
    employeeList.innerHTML = "";
    list.forEach(element => {
        const showList = document.createElement("span")  
        if (parseInt(selectedEmployeeID, 10) === element.id) { //To see the selected employee in hilighted --in the list
            showList.classList.add("selected");
            selectedEmployee = element;
          }
        showList.setAttribute("id", element.id)
        showList.innerHTML = `${element.firstName} ${element.lastName} <i class="delete">❌</i>`
        employeeList.append(showList) 
        })
}

showEmployeeList()
    
//show employee details
    function showDetails(){
        if (selectedEmployeeID === -1) { // if no employee return empty list
            employeeDetails.innerHTML = "";
            return;
          }
      employeeDetails.innerHTML = `
       <img src=" ${selectedEmployee.imageUrl}"/>
       <span> ${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age}) </span>
       <div> ${selectedEmployee.email}</div>
       <div> ${selectedEmployee.dob}</div>
       <div> ${selectedEmployee.address}</div>
       <div> ${selectedEmployee.contactNumber}</div> `
    }
    showDetails();

})()