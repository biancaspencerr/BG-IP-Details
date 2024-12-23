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

  // Handle sub-menu visibility
  const attachSubMenuListeners = (item) => {
    item.addEventListener("mouseenter", function () {
      const subMenus = this.querySelectorAll(".sub-menu2");
      subMenus.forEach((subMenu) => subMenu.classList.add("show"));
      this.style.backgroundColor = "#f0f0f0"; // Change the background color
    });

    item.addEventListener("mouseleave", function () {
      const subMenus = this.querySelectorAll(".sub-menu2");
      subMenus.forEach((subMenu) => subMenu.classList.remove("show"));
      this.style.backgroundColor = ""; // Reset background color
    });
  };

  // Attach listeners to existing items
  const dropdownItems = document.querySelectorAll(".dropdown-menu li");
  dropdownItems.forEach(attachSubMenuListeners);

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

    const selectedButtonIndex = document.getElementById("button-select").value;
    const dropdownMenu = document.querySelector(
      `.dropdown-btn[data-index="${selectedButtonIndex}"]`
    )?.nextElementSibling;

    if (dropdownMenu) {
      // Collect input data
      const inputs = document.querySelectorAll(".submenu-input");
      let name = "";
      let detailsHTML = '<ul class="sub-menu2">';
      inputs.forEach((input) => {
        if (input.value.trim()) {
          if (input.name === "Name") {
            name = input.value;
          } else {
            detailsHTML += `<li><strong>${input.name}:</strong> ${input.value}</li>`;
          }
        }
      });
      detailsHTML += "</ul>";

      if (name) {
        // Add the new item with submenu
        const newItem = document.createElement("li");
        newItem.innerHTML = `${name} ${detailsHTML}`;
        dropdownMenu.appendChild(newItem);

        // Add hover functionality for the new item
        attachSubMenuListeners(newItem);
      }

      // Reset form and close modal
      submenuForm.reset();
      modal.style.display = "none";
    } else {
      alert("Please select a valid dropdown button!");
    }
  });
});
