// DOM Manipulation (Part 1)

// Part 1: Main element
const mainEl = document.querySelector("main");
mainEl.style.backgroundColor = "var(--main-bg)";
mainEl.innerHTML = "<h1>DOM Manipulation</h1>";
mainEl.classList.add("flex-ctr");

// Part 2: Top menu
const topMenuEl = document.getElementById("top-menu");
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
topMenuEl.classList.add("flex-around");

// Part 3: Menu buttons
const menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

menuLinks.forEach((link) => {
  const a = document.createElement("a");
  a.setAttribute("href", link.href);
  a.textContent = link.text;
  topMenuEl.appendChild(a);
});

// DOM Manipulation (Part 2)

// Part 3: Creating the Submenu
const subMenuEl = document.getElementById("sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
subMenuEl.classList.add("flex-around");
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

// Part 4: Adding Menu Interaction
const topMenuLinks = topMenuEl.querySelectorAll("a");

// Helper function to build the submenu
function buildSubmenu(subLinks) {
  subMenuEl.innerHTML = "";
  subLinks.forEach((lnk) => {
    const a = document.createElement("a");
    a.setAttribute("href", lnk.href);
    a.textContent = lnk.text;
    subMenuEl.appendChild(a);
  });
}

topMenuEl.addEventListener("click", function (evt) {
  evt.preventDefault();
  const clickElement = evt.target;

  if (clickElement.tagName !== "A") return;

  const linkObject = menuLinks.find(
    (link) => link.text === clickElement.textContent
  );

  topMenuLinks.forEach((link) => {
    if (link !== clickElement) {
      link.classList.remove("active");
    }
  });

  clickElement.classList.toggle("active");

  if (clickElement.classList.contains("active") && linkObject.subLinks) {
    buildSubmenu(linkObject.subLinks);
    subMenuEl.style.top = "100%";
    mainEl.innerHTML = "<h1>DOM Manipulation</h1>"; 
  } else {
    subMenuEl.style.top = "0";
    if (linkObject.text === "about") {
      mainEl.innerHTML = `<h1>${linkObject.text}</h1>`;
    } else {
      mainEl.innerHTML = "<h1>DOM Manipulation</h1>";
    }
  }
});

// Part 5: Adding Submenu Interaction
subMenuEl.addEventListener("click", function (event) {
  event.preventDefault();

  let clickChild = event.target;

  if (clickChild.tagName !== "A") return;

  console.log(clickChild.textContent);

  subMenuEl.style.top = "0";

  topMenuLinks.forEach((link) => link.classList.remove("active"));

  mainEl.innerHTML = `<h1>${clickChild.textContent}</h1>`;
});