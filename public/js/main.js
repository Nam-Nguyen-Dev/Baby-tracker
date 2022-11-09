const deleteText = document.querySelectorAll('.del')

Array.from(deleteText).forEach(e => {
    e.addEventListener('click', deleteWeight)
})

async function deleteWeight(){
    
}