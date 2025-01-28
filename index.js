// your code goes here ...
document.addEventListener("DOMContentLoaded", function () {
  var householdList = document.querySelector(".household");
  var householdMembers = [];
  var debugContainer = document.querySelector(".debug");
  var form = document.querySelector("form");
  var addButton = form.querySelector(".button.info");

  // set attributes for accessibility
  householdList.setAttribute("aria-label", "Current Household Members");
  form.setAttribute("aria-label", "Describe a household");
  form.setAttribute("action", "/submit/mockURL");
  form.setAttribute("method", "POST");

  // add button logic
  addButton.addEventListener("click", function (event) {
    event.preventDefault();
    var age = document.getElementById("age").value;
    var rel = document.getElementById("rel").value;
    var smoker = document.getElementById("smoker").checked;

    if (!age) {
      alert("Age is required. Please enter a valid age.");
      return;
    }
    if (age <= 0) {
      alert("Age must be greater than 0. Please enter a valid age.");
      return;
    }
    if (!rel) {
      alert("Relationship is required. Please select a relationship.");
      return;
    }

    var person = {
      age: age,
      rel: rel,
      smoker: smoker,
    };

    householdMembers.push(person);
    updateHouseholdList();
    form.reset();
  });

  // update household list to display members
  function updateHouseholdList() {
    while (householdList.firstChild) {
      householdList.removeChild(householdList.firstChild);
    }

    houseMemberCount = householdMembers.length;
    for (var i = 0; i < houseMemberCount; i++) {
      var li = document.createElement("li");
      li.innerHTML =
        "Age: " +
        householdMembers[i].age +
        ", " +
        "Relationship: " +
        householdMembers[i].rel +
        ", " +
        "Smoker: " +
        (householdMembers[i].smoker ? "Yes" : "No") +
        " ";

      var deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "Delete Member";
      deleteBtn.setAttribute("data-index", i);
      deleteBtn.setAttribute("class", "button is-danger is-small");
      deleteBtn.addEventListener("click", removeHouseholdMember);

      li.appendChild(deleteBtn);
      householdList.appendChild(li);
    }
  }

  // logic to remove household member
  function removeHouseholdMember(event) {
    var index = event.target.getAttribute("data-index");
    householdMembers.splice(index, 1);
    updateHouseholdList();
  }

  // submit button logic
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (householdMembers.length === 0) {
      alert("No members added to house. Please add at least one member.");
      return;
    }
    debugContainer.textContent = JSON.stringify(householdMembers, null, 2);
    debugContainer.style.display = "block";
  });
});
