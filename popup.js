let scrapeEmails = document.getElementById

('scrapeEmails');

//handler to recieve emails from contact scriptn

chrome.runtime.onMessage.addListener((request, sender , sendResponse)=>{
    


    let emails = request.emails;
   if(emails == null || emails.length==0){
    let li = document.createElement('li');
    li.innerText = "No emails  found";
    List.appendChild(li);
   }else{

    emails.forEach((email)=>{

        let li = document.createElement('li');
        li.innerText = email;
        List.appendChild(li);
    });
   }

})

scrapeEmails.addEventListener("click" , async() =>{
  // get current active tab 

  let [tab] =await chrome.tabs.query({ active : 
    true, currentWindow: true});

// Execute script to parse emails on page 
chrome.scripting.executeScript({
target: {tabId : tab.id},
func: scrapeEmailsFromPage,

});
  })
// Function to scrape emails

function scrapeEmailsFromPage(){

    const emailRegEx =/[\w\.=-]+@[\w\.-]+\.[\w]{2,3}/gim;

    let emails= document.body.innerHTML.match
    (emailRegEx);

    alert(emails);

    chrome.runtime.sendMessage({emails});
}
