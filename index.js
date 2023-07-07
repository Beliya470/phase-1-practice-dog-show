// main.js
document.addEventListener('DOMContentLoaded', () => {
    const dogForm = document.getElementById('dog-form');
    const dogTable = document.getElementById('dog-table');
    const dogNameInput = document.getElementById('name');
    const dogBreedInput = document.getElementById('breed');
    const dogSexInput = document.getElementById('sex');
  
    dogForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const dogId = dogForm.dataset.dogId;
      const dogData = {
        name: dogNameInput.value,
        breed: dogBreedInput.value,
        sex: dogSexInput.value,
      };
  
      updateDog(dogId, dogData)
        .then(() => {
          dogForm.reset();
          dogForm.removeAttribute('data-dog-id');
          fetchDogs();
        })
        .catch((error) => console.log(error));
    });
  
    dogTable.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const dogRow = e.target.parentNode.parentNode;
        const dogId = dogRow.dataset.dogId;
        const dogName = dogRow.cells[0].textContent;
        const dogBreed = dogRow.cells[1].textContent;
        const dogSex = dogRow.cells[2].textContent;
  
        dogForm.dataset.dogId = dogId;
        dogNameInput.value = dogName;
        dogBreedInput.value = dogBreed;
        dogSexInput.value = dogSex;
      }
    });
  
    fetchDogs();
  });
  
  function fetchDogs() {
    fetch('http://localhost:3000/dogs')
      .then((response) => response.json())
      .then((dogs) => renderDogTable(dogs))
      .catch((error) => console.log(error));
  }
  
  function renderDogTable(dogs) {
    const dogTableBody = document.querySelector('#dog-table tbody');
    dogTableBody.innerHTML = '';
  
    dogs.forEach((dog) => {
      const row = document.createElement('tr');
      row.dataset.dogId = dog.id;
  
      const nameCell = document.createElement('td');
      nameCell.textContent = dog.name;
      row.appendChild(nameCell);
  
      const breedCell = document.createElement('td');
      breedCell.textContent = dog.breed;
      row.appendChild(breedCell);
  
      const sexCell = document.createElement('td');
      sexCell.textContent = dog.sex;
      row.appendChild(sexCell);
  
      const editCell = document.createElement('td');
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editCell.appendChild(editButton);
      row.appendChild(editCell);
  
      dogTableBody.appendChild(row);
    });
  }
  
  function updateDog(dogId, dogData) {
    return fetch(`http://localhost:3000/dogs/${dogId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dogData),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }
  