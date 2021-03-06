function readyUp(){
    //'Object' to do the fetching
    function MyFetch(url, id, element) {
        this.url = url;                 //Assign the url 
        this.id = id;                   //Assign the id
        this.element = element;         //Assign the img-element to the function    

        //Fetch the content of the url and send the acquired J-son object to the assigned function
        this.fetchTheUrl = async() => {
            this.url = this.url+this.id

            // Create a GET request for the character with url https://rickandmortyapi.com/api/character/randomIdWhichWasGenerated
            // Instead of continuing to the next line, wait for the request to finish (await)
            const response = await fetch(this.url);

            // Get the JSON of the response, wait for the request to complete and pass it to "result" variable
            const result = await response.json();

            // Call the done-function and give result as a parameter to it.
            this.done(result);
        }
            

        //Add an eventListener to the img-element and set its src to the img
        this.done = function(result) {

            element.src = result.image;
            element.setAttribute('name', result.name);
            element.addEventListener('click', picked.bind(this));
            element.src = result.image;
            element.name = result.name;
        }
        //Set the answer and and add a listener to it
        function picked(){
            let correctAnswer = document.querySelector('.correctAnswer');
            let correct = correctAnswer.getAttribute("name")
            correctAnswer.classList.add('gm');
            let choice = element.name;
            element.classList.add('choice');
            let question = document.querySelector('.question'); 
            if(choice === correct){
                question.innerHTML = ("Yes! That is "+correct+"!");
            }else{
                question.innerHTML = ('Sorry! You picked '+choice+"!");
            }
        }
    }

    //Simple random integer function
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    //Randomly select one of the images to be the right answer
    function setRightAnswer(imgs){
        let x = getRndInteger(0, 3); 
        let correct = imgs[x];
        correct.classList.add('correctAnswer'); 
    }
    //Print out the question to the player
    function askTheQuestion(){
        let correct = document.querySelector('.correctAnswer').getAttribute("name");
        let question = document.querySelector('.word');
        question.innerHTML = correct+"?";
    }
    //Check if the id has already been taken
    function checkID(id){
        let ret = 1;
        ids.forEach(element => {
            if(element == id){
                ret = -1;
            }
        });
        return ret
    }
    //Get one of the IDs from the API
    function getID(){
        let id = getRndInteger(1, 493);
        let ret = 303;
        if(checkID(id) == -1){
            getID();
        }else{
            ret = id;
        }
        return ret;
    }
    //Retrieve the images(4) and push them to the array
    let imgs = document.querySelectorAll('.charImg');
    let ids = [];

    imgs.forEach(element => {
        let id = getID();
        ids.push(id);
        let f = new MyFetch('https://rickandmortyapi.com/api/character/', id, element);
        f.fetchTheUrl();
    });
    setTimeout(()=>{
        setRightAnswer(imgs);
        askTheQuestion()}, 500)
    
}

//Wait until the window has loaded
window.addEventListener('load', readyUp);