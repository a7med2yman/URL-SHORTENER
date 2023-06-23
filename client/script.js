const input = document.querySelector('input');
const form = document.querySelector('form');
const baseUrl = 'http://127.0.0.1:5000' ;

form.addEventListener('submit' , (event)=>{

    event.preventDefault();

    const data = {full : input.value};

    fetch(`${baseUrl}/shortUrl` , {
        method : 'Post',
        headers :{
            "Content-Type": 'application/json',
        },
        body : JSON.stringify(data)
    }
    ).then((response)=> response.json())
    .then((data)=> showResult (data) )
    .catch((err)=>console.log(err))
})

const showResult = (data)=>{
    const resultsBox = document.querySelector('.results')
    const paragraphElement = document.querySelector('.results p');
    const linkElement = document.querySelector('a');
    const copyBotton = document.querySelector('.copy');
    const fullUrl = `${baseUrl}/shortUrls/${data.short}`
    resultsBox.classList.add('show');
    paragraphElement.textContent = input.value;
    linkElement.href = fullUrl;
    linkElement.textContent = fullUrl;
    copyBotton.addEventListener('click' , ()=>{
        navigator.clipboard.writeText(fullUrl);
    })
}