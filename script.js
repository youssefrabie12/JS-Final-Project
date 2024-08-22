const iconOpenClose= document.getElementById("icon-open-close");
const navOut= document.getElementById("nav-out");
const listInOut= document.getElementById("list-in-out");
const categories= document.getElementById("categories");
const area= document.getElementById("area");
const ingerdients= document.getElementById("Ingerdients");
const contactUs= document.getElementById("contactU");
const apiDiv= document.getElementById("apiDiv");
const imgApi= document.getElementById("imgApi");
const divIApi= document.getElementById("divIApi");
const submitBtn= document.getElementById("submitBtn");
const Input= document.getElementsByClassName("cInput");
const divinAreaApi= document.getElementById("divinAreaApi");
apiDiv.style.marginLeft="6.5%";
firstApiWOpen();
removeCLag();


function wait(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

function removeCLag(){
    listInOut.style.backgroundColor= "#212529";
    listInOut.style.backgroundColor= "#212529";
    listInOut.style.backgroundColor= "#212529";
}
function checkSlide(){
    removeCLag();
    if (listInOut.classList.contains("in-list")){
        listInOut.classList.remove("in-list");
        listInOut.classList.add("list");
        listInOut.style.width="26%";
        removeCLag();
    }
    else {
        listInOut.classList.remove("list");
        listInOut.classList.add("in-list");
        removeCLag();    
        removeCLag();
    }
    /////
    if (navOut.classList.contains("in-nav")){
        navOut.classList.remove("in-nav");
        navOut.style.marginLeft="0%";
    }
    else {
        navOut.classList.add("in-nav");
        navOut.style.marginLeft="25.50%";
    } 
    removeCLag();
}
function changeIcon(){
    if (iconOpenClose.src.includes("bars-solid.svg")){
        iconOpenClose.setAttribute("src", "x-solid.svg")
        
    }
    else {
        iconOpenClose.setAttribute("src", "bars-solid.svg")
    } 
}
function reset(){
    listInOut.classList.remove("in-list");
    listInOut.classList.add("list");
    listInOut.style.width="26%";
    navOut.classList.remove("in-nav");
    navOut.style.marginLeft="0%";
    iconOpenClose.setAttribute("src", "bars-solid.svg")
    removeCLag();
}
iconOpenClose.addEventListener("click", function(){
    removeCLag();
    checkSlide();
    changeIcon();
})

async function firstApiWOpen(){
    let apiFetch= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`);
    let fetchData= await apiFetch.json();
    if(fetchData.meals.length !== 0){
        console.log(fetchData.meals);
        let htmlData= "";
        for (let i=0; i<fetchData.meals.length; i++){
            htmlData+= `        
            <div class="col-md-3 mt-3" id="divApi">
                <img src="${fetchData.meals[i].strMealThumb}" id="imgApi">
                <div id="hover-up">
                    <h2 class="mt-5">${fetchData.meals[i].strMeal}</h2>
                </div>
            </div>`
        }
        apiDiv.innerHTML= htmlData;
        reset();
    }
}
categories.addEventListener("click", async function (){
    let apiFetch= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let fetchData= await apiFetch.json();
    if(fetchData.categories.length !== 0){
        console.log(fetchData.categories);
        let htmlData= "";
        for (let i=0; i<fetchData.categories.length; i++){
            const des= fetchData.categories[i].strCategoryDescription.slice(0,20);
            htmlData+= `  
            <div id="divCApi">      
                <img src=${fetchData.categories[i].strCategoryThumb} id="imgCategoryApi">
                <div id="hover-up-C">
                    <h2 class="mt-3 text-center">${fetchData.categories[i].strCategory}</h2>
                    <p class= "text-center">${des}</p>
                </div>
            </div>`
        }
        apiDiv.innerHTML= htmlData;
        reset();
        const h2C= document.querySelectorAll("#hover-up-C h2");
        if(h2C){
            h2C.forEach((h2, index) => {
                h2.addEventListener('click', async(e) => {
                        let target = e.target.textContent;
                        console.log(target);
                        let apiCFetch= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${target}`);
                        let fetchCData= await apiCFetch.json();
                        if(fetchCData.meals.length !== 0){
                            console.log(fetchCData.meals);
                            let htmlData= "";
                            for (let i=0; i<fetchCData.meals.length; i++){
                                htmlData+= `        
                                <div class="col-md-4 mt-3 text-center" id="divinAreaApi" style="margin-left= 19%;">
                                    <img src=${fetchCData.meals[i].strMealThumb} id="imgiAApi">
                                    <div id="hover-up-iA">
                                        <h3 class="mt-3">${fetchCData.meals[i].strMeal}</h3>
                                    </div>
                                </div>`
                            }
                            apiDiv.innerHTML= htmlData;
                            reset();
                        }
                    })}
                );
            }
    }
})
area.addEventListener("click", async function (){
    let apiFetch= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let fetchData= await apiFetch.json();
    if(fetchData.meals.length !== 0){
        console.log(fetchData.meals);
        let htmlData= "";
        for (let i=0; i<fetchData.meals.length; i++){
            htmlData+= `        
            <div class="col-md-3 mt-3 text-center" id="divAreaApi" style="margin-left= 19%;">
                <img src="house-laptop-solid.svg" id="imgAreaApi">
                <button class="h2Area"><h2 class="text-center" style="color: #fff;">${fetchData.meals[i].strArea}</h2></button>
            </div>`
        }
        apiDiv.innerHTML= htmlData;
        reset();
        const h2Area= document.querySelectorAll(".h2Area");
        if(h2Area){
            h2Area.forEach((button, index) => {
                button.addEventListener('click', async(e) => {
                        let target = e.target.textContent;
                        console.log(target);
                        let apiAFetch= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${target}`);
                        let fetchAData= await apiAFetch.json();
                        if(fetchAData.meals.length !== 0){
                            console.log(fetchAData.meals);
                            let htmlData= "";
                            for (let i=0; i<fetchAData.meals.length; i++){
                                htmlData+= `        
                                <div class="col-md-4 mt-3 text-center" id="divinAreaApi" style="margin-left= 19%;">
                                    <img src=${fetchAData.meals[i].strMealThumb} id="imgiAApi">
                                    <div id="hover-up-iA">
                                        <h3 class="mt-3">${fetchAData.meals[i].strMeal}</h3>
                                    </div>
                                </div>`
                            }
                            apiDiv.innerHTML= htmlData;
                            reset();
                        }
                    })}
                );
            };
    }
        }
)
ingerdients.addEventListener("click", async function (){
    let apiFetch= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let fetchData= await apiFetch.json();
    if(fetchData.meals.length !== 0){
        console.log(fetchData.meals);
        let htmlData= "";
        for (let i=0; i<24; i++){
            const des= fetchData.meals[i].strDescription.slice(0,200);
            htmlData+= `    
            <div id="divHIApi">
                <div class="text-white text-center" id="divIApi">
                <h3 class="text-center" style="color: #fff;">
                    <img src="drumstick-bite-solid.svg" class="text-center" id="imgIApi"><br>
                    <span>${fetchData.meals[i].strIngredient}</span>
                </h3>
                <p class="text-white text-center">${des}</p>
                </div>
            </div>`
        }
        apiDiv.innerHTML= htmlData;
        reset();
        const h3I= document.querySelectorAll("#divIApi h3 span");
        if(h3I){
            h3I.forEach((h3, index) => {
                h3.addEventListener('click', async(e) => {
                        let target = e.target.textContent;
                        console.log(target);
                        let apiIFetch= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${target}`);
                        let fetchIData= await apiIFetch.json();
                        if(fetchIData.meals.length !== 0){
                            console.log(fetchIData.meals);
                            let htmlData= "";
                            for (let i=0; i<fetchIData.meals.length; i++){
                                htmlData+= `        
                                <div class="col-md-4 mt-3 text-center" id="divinAreaApi" style="margin-left= 19%;">
                                    <img src=${fetchIData.meals[i].strMealThumb} id="imgiAApi">
                                    <div id="hover-up-iA">
                                        <h3 class="mt-3">${fetchIData.meals[i].strMeal}</h3>
                                    </div>
                                </div>`
                            }
                            apiDiv.innerHTML= htmlData;
                            reset();
                        }
                    })}
                );
            }
    }
})

contactUs.addEventListener("click" , function(){
    let htmlData= "";
    htmlData+= ` 
    <div class="col-12" id="divInput">
        <form>
            <div class="contact mt-5 h-75 d-flex justify-content-center align-items-center">
                <div class="container w-75 text-center">
                    <div class="row gx-8">
                        <div class="col-md-6">
                            <input type="text" class="cInput form-control" placeholder="Enter Your Name"><br>
                        </div>
                        <div class="col-md-6">
                            <input type="email" class="cInput form-control" placeholder="Enter Your Email"><br>
                        </div>
                        <div class="col-md-6">
                            <input type="text" class="cInput form-control" placeholder="Enter Your Phone"><br>
                        </div>
                        <div class="col-md-6">
                            <input type="number" class="cInput form-control" placeholder="Enter Your Age"><br>
                        </div>
                        <div class="col-md-6">
                            <input type="password" class="cInput form-control" placeholder="Enter Your Password"><br>
                        </div>
                        <div class="col-md-6">
                            <input type="password" class="cInput form-control" placeholder="Repassword"><br>
                        </div>
                    </div>
                    <button id="submitBtn" class="btn btn-outline-danger px-2 text-center" type="submit">Submit</button>
                </div>
            </div>
        </form>
    </div>`
    apiDiv.innerHTML= htmlData;
    reset();
})
// submitBtn.onclick=
//     firstApiWOpen()
//     reset();

