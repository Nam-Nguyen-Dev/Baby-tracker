const deleteText = document.querySelectorAll('.del')

Array.from(deleteText).forEach(e => {
    e.addEventListener('click', deleteWeight)
})

async function deleteWeight(){
    const poundsText = this.parentNode.childNodes[1].innerText
    const repsText = this.parentNode.childNodes[4].innerText
    const setsText = this.parentNode.childNodes[7].innerText
    console.log(poundsText, repsText, setsText)

    try{
        const response = await fetch('deleteWeight', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'poundsFromJS': poundsText,
                'repsFromJS': repsText,
                'setsFromJS': setsText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
    catch(err){
        console.log(err)
    }
}