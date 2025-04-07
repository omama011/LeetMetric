document.addEventListener("DOMContentLoaded",function(){
    const searchButton=document.getElementById("search-btn");
    const usernameInput=document.getElementById("user-input");
    const statsContainer=document.querySelector(".stats-container");
    const easyProgressCircle=document.querySelector(".easy-progress");
    const mediumProgressCircle=document.querySelector(".medium-progress");
    const hardProgressCircle=document.querySelector(".hard-progress");
   const easyLabel=document.getElementById("easy-label");
   const mediumLabel=document.getElementById("medium-label");
   const hardLabel=document.getElementById("hard-label");
   const cardStatsContainer=document.querySelector(".stats-cards");
   
   //return true or false based on a regex
   function validateUsername(username){
    if(username.trim()===""){
        alert("Username should not be empty");
        return false;
    }
        const regex= /^[a-zA-Z0-9_-]{4,15}$/;
        const isMatching=regex.test(username);
        if(!isMatching){
            alert("Invalid Username");
        }
        return isMatching;
   }
   async function fetchUserDetails(username){
      const url=`https://leetcode-stats-api.herokuapp.com/${username}`;
     try{
        searchButton.textContent="Searching..."
        searchButton.disabled=true;
        const response=await fetch(url);
        if(!response.ok){
            throw new Error("Unable to fetch the user details");
        }
        const parsedData=await response.json();
        console.log("Logging data: ",parsedData);
        displayData(parsedData);
     }
     catch(error){
       statsContainer.innerHTML='<p>No data</p>';
     }
     finally{
      searchButton.textContent="Search";
      searchButton.disabled=false;
     }
   }
   function updateProgress(solved,total,label,circle){
        const progressDegree=(solved/total)*100;
         circle.style.setProperty("--progress-degree",`${progressDegree}%`)
        label.textContent=`${solved}/${total}`;
   }
   function displayData(data){
    const totalSolved = data.totalSolved;
    const totalQuestions = data.totalQuestions;
    const easySolved = data.easySolved;
    const mediumSolved = data.mediumSolved;
    const hardSolved = data.hardSolved;
    const totalEasy = data.totalEasy;
    const totalMedium = data.totalMedium;
    const totalHard = data.totalHard;
    updateProgress(easySolved,totalEasy,easyLabel,easyProgressCircle);
    updateProgress(mediumSolved,totalMedium,mediumLabel,mediumProgressCircle);
    updateProgress(hardSolved,totalHard,hardLabel,hardProgressCircle);
    const cardData=[
        {label:"Overall Submissions",value:totalSolved},
        {label:"Overall Easy Submissions",value:easySolved},
        {label:"Overall Medium Submissions",value:mediumSolved},
        {label:"Overall Hard Submissions",value:hardSolved}
    ] 
    console.log("card data",cardData);
    cardStatsContainer.innerHTML=cardData.map(
      data=>{
        return `
        <div class="card">
        <h3>${value}</h3>
        </div>
        `
      }
    )
   }
   searchButton.addEventListener('click',function(){
    const username=usernameInput.value;
    console.log("loggin username: ",username);
    if(validateUsername(username)){
     fetchUserDetails(username);
    }
   })
})