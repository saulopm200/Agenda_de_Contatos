const addButton = document.getElementById('add_button');
const nameErrorContainer = document.getElementById('name_error');
const telErrorContainer = document.getElementById('tel_error')
const contactContainer = document.getElementById('contacts_container');

let inputName = document.getElementById('input_name');
let inputTel = document.getElementById('input_tel');

const contacts = [];

const regex = /^\d{11}$/

function nameValidation() {
    if (inputName.value === '') {
        nameErrorContainer.innerHTML="*Campo não pode estar vazio!"
        return false
    } else {
        nameErrorContainer.innerHTML = "";
        return true
    }
}
function telValidation() {
    if (inputTel.value === '') {
        telErrorContainer.innerHTML="*Campo não pode estar vazio!"
        return false
    }else if(!inputTel.value.match(regex)) {
        telErrorContainer.innerHTML="Número inválido"
        return false
    } else {
        telErrorContainer.innerHTML = "";
        return true
    }
}
function addContact() {
    const contactName = inputName.value
    const contactNumber = inputTel.value

    contacts.push({ nome: contactName, numero: contactNumber });

    if (contacts.length === 1) { //checar se é o primeiro contato adicionado
        contactContainer.innerHTML = '';
    }
    
    const index = contacts.length - 1;

    const contactRow = document.createElement('tr'); //melhor que usar innerHTML de uma vez 
    contactRow.innerHTML = `
        <td>${contactName}</td>
        <td>${contactNumber}</td>
        <td class="del-container">
            <button class="del" data-index="${index}">X</button>
        </td>
    `;
    contactContainer.appendChild(contactRow); //É uma forma mais clean de modificar o body do HTML

    const deleteButton = contactRow.querySelector(`.del[data-index="${index}"]`);
    deleteButton.addEventListener('click', (e) => {
        const indexToDelete = e.target.getAttribute('data-index');
        contacts.splice(indexToDelete, 1);
        updateContactList();
    });
}
addButton.addEventListener('click', (e) => {
    e.preventDefault()

    if (nameValidation() && telValidation()) {
        addContact()

        inputName.value = '';
        inputTel.value = '';

    } else {
        console.log('fail')
    }
    
    console.log('Botão pressionado')    
    console.log(contacts)
})



function updateContactList() {
    contactContainer.innerHTML = '';

    if (contacts.length === 0) {
        ifEmpty();
    } else {
        contacts.forEach((contact, index) => {
            const contactRow = document.createElement('tr');
            contactRow.innerHTML = `
                <td>${contact.nome}</td>
                <td>${contact.numero}</td>
                <td class="del-container">
                    <button class="del" data-index="${index}">X</button>
                </td>
            `;
            contactContainer.appendChild(contactRow);
            
            const deleteButton = contactRow.querySelector(`.del[data-index="${index}"]`);
            deleteButton.addEventListener('click', (e) => {
                const indexToDelete = e.target.getAttribute('data-index');
                contacts.splice(indexToDelete, 1);
                updateContactList();
            });
        });
    }
}

function ifEmpty() {
    if (contacts.length === 0) {
        contactContainer.innerHTML = `
        <tr>
            <td>
                ----------
            </td>
            <td>
                -----------
            </td>
            <td class="del-container">
                <button class="del" id="delete_button">X</button>
            </td>
        </tr>
        `
    }
}