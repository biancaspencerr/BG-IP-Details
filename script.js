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

  // Handle sub-menu hover effect
  const dropdownItems = document.querySelectorAll(".dropdown-menu li");
  dropdownItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      const subMenus = this.querySelectorAll(".sub-menu, .sub-menu2");
      subMenus.forEach((subMenu) => subMenu.classList.add("show"));
    });

    item.addEventListener("mouseleave", function () {
      const subMenus = this.querySelectorAll(".sub-menu, .sub-menu2");
      subMenus.forEach((subMenu) => subMenu.classList.remove("show"));
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

    // Get the selected dropdown button by its data-index
    const selectedIndex = document.getElementById("button-select").value;
    const dropdownButton = document.querySelector(
      `.dropdown-btn[data-index="${selectedIndex}"]`
    );

    if (dropdownButton) {
      // Get the dropdown menu
      const dropdownMenu = dropdownButton.nextElementSibling;

      // Collect input data
      const inputs = document.querySelectorAll(".submenu-input");
      let newName = "";
      let newDetailsHTML = "<ul class='sub-menu2'>";
      inputs.forEach((input) => {
        if (input.value.trim()) {
          if (input.name === "Name") {
            newName = input.value.trim();
          } else {
            newDetailsHTML += `<li><strong>${
              input.name
            }:</strong> ${input.value.trim()}</li>`;
          }
        }
      });
      newDetailsHTML += "</ul>";

      if (newName) {
        // Add a new list item with submenu
        const newListItem = document.createElement("li");
        newListItem.textContent = newName;
        newListItem.innerHTML += newDetailsHTML;
        dropdownMenu.appendChild(newListItem);

        // Reset form and close modal
        submenuForm.reset();
        modal.style.display = "none";
      } else {
        alert("Please enter a valid Name!");
      }
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

  // Apply colors dynamically
  dropdownButtons.forEach((button) => {
    const index = parseInt(button.getAttribute("data-index"), 10);
    const color = colors[(index - 1) % colors.length];
    button.style.backgroundColor = color;
    button.style.color = "#333"; // Ensure contrast for text
  });
});
