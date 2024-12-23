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
  const dropdownItems = document.querySelectorAll(".dropdown-menu li");
  dropdownItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      const subMenus = this.querySelectorAll(".sub-menu, .sub-menu2");
      subMenus.forEach((subMenu) => subMenu.classList.add("show"));
      this.style.backgroundColor = "#f0f0f0"; // Change the background color on hover
    });

    item.addEventListener("mouseleave", function () {
      const subMenus = this.querySelectorAll(".sub-menu, .sub-menu2");
      subMenus.forEach((subMenu) => subMenu.classList.remove("show"));
      this.style.backgroundColor = ""; // Revert the background color
    });
  });

  // Close dropdown menus when clicking outside
  document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown-menu").forEach((menu) => {
      menu.classList.remove("show");
    });
  });
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
