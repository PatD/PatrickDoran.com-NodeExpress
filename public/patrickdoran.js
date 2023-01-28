

// modal for work items
const modalWorkItems = document.getElementById('work').getElementsByClassName('workitem')

// add event listner to open modal
for(let i = 0; i < modalWorkItems.length; i++) {
  modalWorkItems[i].addEventListener("click", function() {
    let iplus = i + 1 // javascript starts with zero
    let dialogToToggle = document.getElementById('dialog'+iplus)
    dialogToToggle.showModal();
  })
}

// Close modal for work items
const closeWorkItems = document.getElementById('work').getElementsByClassName('closeworkitem')

// add event listner to close modal
for(let i = 0; i < closeWorkItems.length; i++) {
    closeWorkItems[i].addEventListener("click", function() {
      let iplus = i + 1 // javascript starts with zero
      let dialogToToggle = document.getElementById('dialog'+iplus)
      dialogToToggle.close();
    })
  }
