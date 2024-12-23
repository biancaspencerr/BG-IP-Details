document.addEventListener("DOMContentLoaded", () => {
  // Handle dropdown visibility on button click
  const dropdownButtons = document.querySelectorAll(".dropdown-btn");
  dropdownButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      const menu = this.nextElementSibling;
      menu.classList.toggle("show");

      // Close all other dropdowns
      document.querySelectorAll(".dropdown-menu").forEach((otherMenu) => {
        if (otherMenu !== menu) {
          otherMenu.classList.remove("show");
        }
      });
    });
  });

  // Close dropdown menus when clicking outside
  document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown-menu").forEach((menu) => {
      menu.classList.remove("show");
    });
  });

  // Modal Logic
  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("close-modal");
  const submenuForm = document.getElementById("submenu-form");

  // Open modal when the add button is clicked
  const addButton = document.getElementById("add-button");
  if (addButton) {
    addButton.addEventListener("click", (e) => {
      e.stopPropagation();
      modal.style.display = "block";
    });
  }

  // Close modal logic
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Handle form submission to add submenus
  submenuForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const selectedButton = document.getElementById("button-select").value;
    const dropdownButton = document.querySelector(
      `.dropdown-btn[data-index="${selectedButton}"]`
    );

    if (dropdownButton) {
      const dropdownMenu = dropdownButton.nextElementSibling;

      // Collect input data
      const nameInput = document.getElementById("name-input").value.trim();
      if (!nameInput) {
        alert("Please enter a valid Name!");
        return;
      }

      const inputs = document.querySelectorAll(".submenu-input");
      let newSubMenuHTML = `<ul class="sub-menu">`;
      inputs.forEach((input) => {
        if (input.value.trim()) {
          newSubMenuHTML += `<li><strong>${
            input.name
          }:</strong> ${input.value.trim()}</li>`;
        }
      });
      newSubMenuHTML += `</ul>`;

      // Append new item to the dropdown menu
      const newListItem = document.createElement("li");
      newListItem.innerHTML = `${nameInput}${newSubMenuHTML}`;
      dropdownMenu.appendChild(newListItem);

      // Reset form and close modal
      submenuForm.reset();
      modal.style.display = "none";
    } else {
      alert("Please select a valid dropdown button!");
    }
  });

  // Predefined colors array
  const colors = [
    "#c3c3c3",
    "#fffdab",
    "#ffca92",
    "#818181",
    "#aaefcf",
    "#fff74c",
    "#ff7c00",
    "#1e955e",
    "#ffd400",
    "#a4c8db",
    "#9cdb98",
    "#9cdb98",
    "#5b5b5b",
    "#0099b0",
    "#dcdcdc",
    "#dcdcdc",
    "#ffd400",
    "#ffd400",
  ];

  // Select all dropdown buttons
  const buttons = document.querySelectorAll(".dropdown-btn");

  // Apply colors dynamically
  buttons.forEach((button) => {
    // Get the index from the data attribute
    const index = parseInt(button.getAttribute("data-index"), 10);

    // Retrieve the color based on the index (looping if needed)
    const color = colors[(index - 1) % colors.length]; // Adjust for 0-based array indexing

    // Apply the color to the button
    button.style.backgroundColor = color;
    button.style.color = "#333"; // Ensure contrast for text
  });
});
