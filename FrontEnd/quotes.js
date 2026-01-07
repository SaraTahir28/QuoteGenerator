//we need to fetch quotes from backend instead of from hardcoded data so we remove that 

/*removing this pickFromArray function as well as this functionality will be a part of our backend 
function pickFromArray(choices) {
  return choices[Math.floor(Math.random() * choices.length)];
} */

 //converting this to a function that fetches from backend 
async function displayRandomquote(){
  try{
  const response = await fetch("https://mscgsco4cg4wkok4g4go0s0c.hosting.codeyourfuture.io/") //talking to backend with a GET request, which only sends back data.
  const data = await response.json() //expecting data to be sent as structured JSON. 

  document.getElementById("quote").textContent = data.quote;
  document.getElementById("author").textContent = data.author;
  }
  catch(error){
    console.error("Failed to fetch the quote",error)
    document.getElementById("quote").textContent = "Error fetching quote.";
    document.getElementById("author").textContent = "";
  }
}
document.getElementById("new-quote").addEventListener("click", () => {
  displayRandomquote();
});

document.getElementById("add-quote-form").addEventListener("submit",async(e)=>{
  e.preventDefault() //prevents page from refreshing on form submission
  const quote = document.getElementById("new-quote-text").value;
  const author = document.getElementById("new-quote-author").value;
  //Adding Validation to check both author and quote are added
  if (!quote.trim() || !author.trim()) 
    { alert("Both quote and author are required."); return;
    }
  try { 
    const response = await fetch("https://mscgsco4cg4wkok4g4go0s0c.hosting.codeyourfuture.io/", {
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ quote, author }) }); 
    const text = await response.text(); 
    console.log("Server response:", text); 

    alert("Quote added!"); e.target.reset(); // clears the form 
     } 
    catch (error) { 
      console.error("Failed to add quote:", error); alert("Error adding quote"); 
    } 
  });


displayRandomquote()
