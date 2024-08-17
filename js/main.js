let input = document.querySelector(".input");
let notesBox = document.querySelector(".notes-box");
let control = document.querySelector(".control");
let options = document.querySelector(".options");
let filterBox = document.querySelector(".filter-box");
let sortBox = document.querySelector(".sort-box");
let addNote = document.querySelector(".add-note");
let search = document.querySelector(".search-button");
let arr = [];

// localStorage.clear();

if (localStorage.getItem("notes")) {
  arr = JSON.parse(localStorage.getItem("notes"));
  addToPage(arr);
}

// noData()

options.addEventListener("click", (e) => {
  addToPage(arr);
  notesFacilities(e.target);
});

control.addEventListener("click", (e) => {
  if (e.target.classList.contains("input")) {
    e.target.addEventListener("keypress", function (e) {
      if ((input.value != "" && e.keyCode == 13) || e.code == 13) {
        addToArray(input.value);
        input.value = "";

        // notesBox.style.display = "grid"
        // notesBox.style.overflow = "scroll"
      }
    });

    filterBox.style.display = "none";
    sortBox.style.display = "none";
  } else {
    openOptions(e.target);
  }
});

notesBox.addEventListener("click", (e) => {
  removeElement(e);
  checkElement(e);
  editElement(e);

  filterBox.style.display = "none";
  sortBox.style.display = "none";
  // noData()
});

function addToArray(e) {
  let obj = {
    time: new Date().toLocaleString(),
    content: e,
    check: "unchecked",
  };
  arr.unshift(obj);
  addToLocalStorage(arr);
  addToPage(arr);
}

function addToLocalStorage(arr) {
  localStorage.setItem("notes", JSON.stringify(arr));
}

function addToPage(arr) {
  notesBox.innerHTML = "";

  arr.forEach((text, ind) => {
    [...filterBox.children].forEach((e) => {
      if (e.classList.contains("active")) {
        if (e.textContent == "All") {
          let noteBox = document.createElement("div");
          noteBox.className = "note-box";
          let check = document.createElement("span");
          check.className = "check";
          check.innerHTML = `<svg
                          width="20px"
                          height="20px"
                          viewBox="0 -0.5 17 17"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          class="si-glyph si-glyph-checked"
                        >
                          <g
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                          >
                            <path
                              d="M3.432,6.189 C3.824,5.798 4.455,5.798 4.847,6.189 L6.968,8.31 L13.147,2.131 C13.531,1.747 14.157,1.753 14.548,2.144 L16.67,4.266 C17.06,4.657 17.066,5.284 16.684,5.666 L7.662,14.687 C7.278,15.07 6.651,15.064 6.261,14.673 L1.311,9.723 C0.92,9.333 0.92,8.7 1.311,8.31 L3.432,6.189 Z"
                              fill="white"
                              class="si-glyph-fill"
                            ></path>
                          </g>
                        </svg>`;
          noteBox.appendChild(check);
          let note = document.createElement("input");
          note.type = "text";
          note.setAttribute("readonly", "");
          note.className = "note";
          note.value = text.content;
          noteBox.appendChild(note);
          let buttons = document.createElement("div");
          buttons.className = "buttons";
          noteBox.appendChild(buttons);
          let edit = document.createElement("div");
          edit.className = "edit";
          edit.innerHTML = `    <svg
      width="20px"
      height="20px"
      viewBox="-2.4 -2.4 28.80 28.80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0" />

      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke="#ffffff"
        stroke-width="0.288"
      />

      <g id="SVGRepo_iconCarrier">
        <path
          d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
          stroke="#ffffff"
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
          stroke="#ffffff"
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>`;
          buttons.appendChild(edit);
          let remove = document.createElement("div");
          remove.className = "remove";
          remove.innerHTML = `<svg
                        fill="white"
                        width="20px"
                        height="20px"
                        viewBox="0 0 32 32"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>cancel2</title>
                        <path
                          d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"
                        ></path>
                      </svg>`;
          buttons.appendChild(remove);
          let timer = document.createElement("p");
          timer.className = "timer";
          let date = text.time.split(", ")[0];
          let time = text.time.split(", ")[1].split(":").splice(0, 2).join(":");
          timer.textContent = `${date},  ${time}`;
          noteBox.appendChild(timer);
          notesBox.appendChild(noteBox);
          if (text.check != "checked") {
            check.children[0].classList.remove("checked");
            check.parentElement.style.backgroundColor = "#1e81f1";
          } else {
            check.children[0].classList.add("checked");
            check.parentElement.style.backgroundColor = "#789ccf";
          }
        } else if (e.textContent == "Checked" && text.check == "checked") {
          let noteBox = document.createElement("div");
          noteBox.className = "note-box";
          let check = document.createElement("span");
          check.className = "check";
          check.innerHTML = `<svg
                          width="20px"
                          height="20px"
                          viewBox="0 -0.5 17 17"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          class="si-glyph si-glyph-checked"
                        >
                          <g
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                          >
                            <path
                              d="M3.432,6.189 C3.824,5.798 4.455,5.798 4.847,6.189 L6.968,8.31 L13.147,2.131 C13.531,1.747 14.157,1.753 14.548,2.144 L16.67,4.266 C17.06,4.657 17.066,5.284 16.684,5.666 L7.662,14.687 C7.278,15.07 6.651,15.064 6.261,14.673 L1.311,9.723 C0.92,9.333 0.92,8.7 1.311,8.31 L3.432,6.189 Z"
                              fill="white"
                              class="si-glyph-fill"
                            ></path>
                          </g>
                        </svg>`;
          noteBox.appendChild(check);
          let note = document.createElement("input");
          note.type = "text";
          note.setAttribute("readonly", "");
          note.className = "note";
          note.value = text.content;
          noteBox.appendChild(note);
          let buttons = document.createElement("div");
          buttons.className = "buttons";
          noteBox.appendChild(buttons);
          let edit = document.createElement("div");
          edit.className = "edit";
          edit.innerHTML = `    <svg
      width="20px"
      height="20px"
      viewBox="-2.4 -2.4 28.80 28.80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0" />

      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke="#ffffff"
        stroke-width="0.288"
      />

      <g id="SVGRepo_iconCarrier">
        <path
          d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
          stroke="#ffffff"
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
          stroke="#ffffff"
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>`;
          buttons.appendChild(edit);
          let remove = document.createElement("div");
          remove.className = "remove";
          remove.innerHTML = `<svg
                        fill="white"
                        width="20px"
                        height="20px"
                        viewBox="0 0 32 32"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>cancel2</title>
                        <path
                          d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"
                        ></path>
                      </svg>`;
          buttons.appendChild(remove);
          let timer = document.createElement("p");
          timer.className = "timer";
          let date = text.time.split(", ")[0];
          let time = text.time.split(", ")[1].split(":").splice(0, 2).join(":");
          timer.textContent = `${date},  ${time}`;
          noteBox.appendChild(timer);
          notesBox.appendChild(noteBox);

          if (text.check != "checked") {
            check.children[0].classList.remove("checked");
            check.parentElement.style.backgroundColor = "#1e81f1";
          } else {
            check.children[0].classList.add("checked");
            check.parentElement.style.backgroundColor = "#789ccf";
          }
        } else if (e.textContent == "Unchecked" && text.check == "unchecked") {
          let noteBox = document.createElement("div");
          noteBox.className = "note-box";
          let check = document.createElement("span");
          check.className = "check";
          check.innerHTML = `<svg
                          width="20px"
                          height="20px"
                          viewBox="0 -0.5 17 17"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          class="si-glyph si-glyph-checked"
                        >
                          <g
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                          >
                            <path
                              d="M3.432,6.189 C3.824,5.798 4.455,5.798 4.847,6.189 L6.968,8.31 L13.147,2.131 C13.531,1.747 14.157,1.753 14.548,2.144 L16.67,4.266 C17.06,4.657 17.066,5.284 16.684,5.666 L7.662,14.687 C7.278,15.07 6.651,15.064 6.261,14.673 L1.311,9.723 C0.92,9.333 0.92,8.7 1.311,8.31 L3.432,6.189 Z"
                              fill="white"
                              class="si-glyph-fill"
                            ></path>
                          </g>
                        </svg>`;
          noteBox.appendChild(check);
          let note = document.createElement("input");
          note.type = "text";
          note.setAttribute("readonly", "");
          note.className = "note";
          note.value = text.content;
          noteBox.appendChild(note);
          let buttons = document.createElement("div");
          buttons.className = "buttons";
          noteBox.appendChild(buttons);
          let edit = document.createElement("div");
          edit.className = "edit";
          edit.innerHTML = `    <svg
      width="20px"
      height="20px"
      viewBox="-2.4 -2.4 28.80 28.80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0" />

      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke="#ffffff"
        stroke-width="0.288"
      />

      <g id="SVGRepo_iconCarrier">
        <path
          d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
          stroke="#ffffff"
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
          stroke="#ffffff"
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>`;
          buttons.appendChild(edit);
          let remove = document.createElement("div");
          remove.className = "remove";
          remove.innerHTML = `<svg
                        fill="white"
                        width="20px"
                        height="20px"
                        viewBox="0 0 32 32"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>cancel2</title>
                        <path
                          d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"
                        ></path>
                      </svg>`;
          buttons.appendChild(remove);
          let timer = document.createElement("p");
          timer.className = "timer";
          let date = text.time.split(", ")[0];
          let time = text.time.split(", ")[1].split(":").splice(0, 2).join(":");
          timer.textContent = `${date},  ${time}`;
          noteBox.appendChild(timer);
          notesBox.appendChild(noteBox);

          if (text.check != "checked") {
            check.children[0].classList.remove("checked");
            check.parentElement.style.backgroundColor = "#1e81f1";
          } else {
            check.children[0].classList.add("checked");
            check.parentElement.style.backgroundColor = "#789ccf";
          }
        }
      }
    });
  });
}

function checkElement(e) {
  if (e.target.classList.contains("check")) {
    if (!e.target.children[0].classList.contains("checked")) {
      e.target.children[0].classList.add("checked");
      e.target.parentElement.style.backgroundColor = "#789ccf";

      e.target.style.boxShadow =
        "3px 3px 6px 1px #1c1c1c, inset 5px 8px 10px -2px #191a1c, inset -4px -4px 7px -4px #c3c3c326";
      setTimeout(() => {
        e.target.style.boxShadow =
          "4px 3px 6px 1px #1c1c1c, inset -5px -4px 10px -2px #191a1c, inset 5px 5px 7px -4px #c3c3c326";
      }, 100);

      arr.map(function (ele) {
        if (ele.content == e.target.parentElement.children[1].value) {
          ele.check = "checked";
          addToLocalStorage(arr);
        }
      });

      [...filterBox.children].forEach((ele) => {
        if (
          ele.classList.contains("active") &&
          ele.textContent == "Unchecked"
        ) {
          e.target.parentElement.style.display = "none";
        }
      });
    } else {
      e.target.children[0].classList.remove("checked");
      e.target.parentElement.style.backgroundColor = "#1e81f1";
      arr.map(function (ele) {
        if (ele.content == e.target.parentElement.children[1].value) {
          ele.check = "unchecked";
          addToLocalStorage(arr);
        }
      });
      [...filterBox.children].forEach((ele) => {
        if (ele.classList.contains("active") && ele.textContent == "Checked") {
          e.target.parentElement.style.display = "none";
        }
      });
    }
  } else if (e.target.parentElement.classList.contains("check")) {
    if (!e.target.parentElement.children[0].classList.contains("checked")) {
      e.target.classList.add("checked");
      e.target.parentElement.parentElement.style.backgroundColor = "#789ccf";
      e.target.parentElement.style.boxShadow =
        "3px 3px 6px 1px #1c1c1c, inset 5px 8px 10px -2px #191a1c, inset -4px -4px 7px -4px #c3c3c326";
      setTimeout(() => {
        e.target.parentElement.style.boxShadow =
          "4px 3px 6px 1px #1c1c1c, inset -5px -4px 10px -2px #191a1c, inset 5px 5px 7px -4px #c3c3c326";
      }, 100);
      arr.map(function (ele) {
        if (
          ele.content == e.target.parentElement.parentElement.children[1].value
        ) {
          ele.check = "checked";
          addToLocalStorage(arr);
        }
      });
      [...filterBox.children].forEach((ele) => {
        if (
          ele.classList.contains("active") &&
          ele.textContent == "Unchecked"
        ) {
          e.target.parentElement.parentElement.style.display = "none";
        }
      });
    } else {
      e.target.classList.remove("checked");
      e.target.parentElement.parentElement.style.backgroundColor = "#1e81f1";
      arr.map(function (ele) {
        if (
          ele.content == e.target.parentElement.parentElement.children[1].value
        ) {
          ele.check = "unchecked";
          addToLocalStorage(arr);
        }
      });
      [...filterBox.children].forEach((ele) => {
        if (ele.classList.contains("active") && ele.textContent == "Checked") {
          e.target.parentElement.parentElement.style.display = "none";
        }
      });
    }
  } else if (
    e.target.parentElement.parentElement.parentElement.classList.contains(
      "check"
    )
  ) {
    if (
      !e.target.parentElement.parentElement.parentElement.children[0].classList.contains(
        "checked"
      )
    ) {
      e.target.parentElement.parentElement.classList.add("checked");
      e.target.parentElement.parentElement.parentElement.parentElement.style.backgroundColor =
        "#789ccf";
      e.target.parentElement.parentElement.parentElement.style.boxShadow =
        "3px 3px 6px 1px #1c1c1c, inset 5px 8px 10px -2px #191a1c, inset -4px -4px 7px -4px #c3c3c326";
      setTimeout(() => {
        e.target.parentElement.parentElement.parentElement.style.boxShadow =
          "4px 3px 6px 1px #1c1c1c, inset -5px -4px 10px -2px #191a1c, inset 5px 5px 7px -4px #c3c3c326";
      }, 100);
      arr.map(function (ele) {
        if (
          ele.content ==
          e.target.parentElement.parentElement.parentElement.parentElement
            .children[1].value
        ) {
          ele.check = "checked";
          addToLocalStorage(arr);
        }
      });
      [...filterBox.children].forEach((ele) => {
        if (
          ele.classList.contains("active") &&
          ele.textContent == "Unchecked"
        ) {
          e.target.parentElement.parentElement.parentElement.parentElement.style.display =
            "none";
        }
      });
    } else {
      e.target.parentElement.parentElement.classList.remove("checked");
      e.target.parentElement.parentElement.parentElement.parentElement.style.backgroundColor =
        "#1e81f1";
      arr.map(function (ele) {
        if (
          ele.content ==
          e.target.parentElement.parentElement.parentElement.parentElement
            .children[1].value
        ) {
          ele.check = "unchecked";
          addToLocalStorage(arr);
        }
      });
      [...filterBox.children].forEach((ele) => {
        if (ele.classList.contains("active") && ele.textContent == "checked") {
          e.target.parentElement.parentElement.parentElement.parentElement.style.display =
            "none";
        }
      });
    }
  }
}

function openOptions(e) {
  if (e.classList.contains("filter")) {
    sortBox.style.display = "none";
    if (filterBox.style.display == "none") {
      e.classList.add("clicked");
      e.style.boxShadow =
        "3px 3px 6px 1px #1c1c1c, inset 5px 8px 10px -2px #191a1c, inset -4px -4px 7px -4px #c3c3c326";

      setTimeout(() => {
        e.style.boxShadow =
          "4px 3px 6px 1px #1c1c1c, inset -5px -4px 10px -2px #191a1c, inset 5px 5px 7px -4px #c3c3c326";
      }, 100);
      filterBox.style.display = "flex";

      filterBox.addEventListener("click", (e) => {
        if (!e.target.classList.contains("active")) {
          if (e.target.textContent == "All") {
            [...filterBox.children].forEach((e) => {
              e.classList.remove("active");
            });
            e.target.classList.add("active");
            [...sortBox.children].map((e) => {
              if (e.classList.contains("active")) {
                if (e.textContent == "Newest") {
                  addToPage(arr);
                } else if (e.textContent == "Oldest") {
                  addToPage(arr.toReversed());
                } else if (e.textContent == "A - Z") {
                  addToPage(
                    arr.toSorted(function (a, b) {
                      let x = a.content.toLowerCase();
                      let y = b.content.toLowerCase();
                      if (x < y) {
                        return -1;
                      }
                      if (x > y) {
                        return 1;
                      }
                      return 0;
                    })
                  );
                } else if (e.textContent == "Z - A") {
                  addToPage(
                    arr.toSorted(function (a, b) {
                      let x = a.content.toLowerCase();
                      let y = b.content.toLowerCase();
                      if (x < y) {
                        return 1;
                      }
                      if (x > y) {
                        return -1;
                      }
                      return 0;
                    })
                  );
                }
              }
            });
          } else if (e.target.textContent == "Checked") {
            [...filterBox.children].forEach((e) => {
              e.classList.remove("active");
            });
            e.target.classList.add("active");
            [...sortBox.children].map((e) => {
              if (e.classList.contains("active")) {
                if (e.textContent == "Newest") {
                  addToPage(arr);
                } else if (e.textContent == "Oldest") {
                  addToPage(arr.toReversed());
                } else if (e.textContent == "A - Z") {
                  addToPage(
                    arr.toSorted(function (a, b) {
                      let x = a.content.toLowerCase();
                      let y = b.content.toLowerCase();
                      if (x < y) {
                        return -1;
                      }
                      if (x > y) {
                        return 1;
                      }
                      return 0;
                    })
                  );
                } else if (e.textContent == "Z - A") {
                  addToPage(
                    arr.toSorted(function (a, b) {
                      let x = a.content.toLowerCase();
                      let y = b.content.toLowerCase();
                      if (x < y) {
                        return 1;
                      }
                      if (x > y) {
                        return -1;
                      }
                      return 0;
                    })
                  );
                }
              }
            });
          } else if (e.target.textContent == "Unchecked") {
            [...filterBox.children].forEach((e) => {
              e.classList.remove("active");
            });
            e.target.classList.add("active");
            [...sortBox.children].map((e) => {
              if (e.classList.contains("active")) {
                if (e.textContent == "Newest") {
                  addToPage(arr);
                } else if (e.textContent == "Oldest") {
                  addToPage(arr.toReversed());
                } else if (e.textContent == "A - Z") {
                  addToPage(
                    arr.toSorted(function (a, b) {
                      let x = a.content.toLowerCase();
                      let y = b.content.toLowerCase();
                      if (x < y) {
                        return -1;
                      }
                      if (x > y) {
                        return 1;
                      }
                      return 0;
                    })
                  );
                } else if (e.textContent == "Z - A") {
                  addToPage(
                    arr.toSorted(function (a, b) {
                      let x = a.content.toLowerCase();
                      let y = b.content.toLowerCase();
                      if (x < y) {
                        return 1;
                      }
                      if (x > y) {
                        return -1;
                      }
                      return 0;
                    })
                  );
                }
              }
            });
          }
        }
      });
    } else {
      e.classList.remove("clicked");
      e.style.boxShadow =
        "3px 3px 6px 1px #1c1c1c, inset 5px 8px 10px -2px #191a1c, inset -4px -4px 7px -4px #c3c3c326";

      setTimeout(() => {
        e.style.boxShadow =
          "4px 3px 6px 1px #1c1c1c, inset -5px -4px 10px -2px #191a1c, inset 5px 5px 7px -4px #c3c3c326";
      }, 100);
      filterBox.style.display = "none";
    }
  } else if (e.classList.contains("sort")) {
    filterBox.style.display = "none";
    if (sortBox.style.display == "none") {
      e.classList.add("clicked");
      e.style.boxShadow =
        "3px 3px 6px 1px #1c1c1c, inset 5px 8px 10px -2px #191a1c, inset -4px -4px 7px -4px #c3c3c326";

      setTimeout(() => {
        e.style.boxShadow =
          "4px 3px 6px 1px #1c1c1c, inset -5px -4px 10px -2px #191a1c, inset 5px 5px 7px -4px #c3c3c326";
      }, 100);
      sortBox.style.display = "flex";
      sortBox.addEventListener("click", (e) => {
        if (!e.target.classList.contains("active")) {
          if (e.target.textContent == "Newest") {
            [...sortBox.children].forEach((e) => {
              e.classList.remove("active");
            });
            addToPage(arr);
            e.target.classList.add("active");
          } else if (e.target.textContent == "Oldest") {
            [...sortBox.children].forEach((e) => {
              e.classList.remove("active");
            });
            e.target.classList.add("active");
            addToPage(arr.toReversed());
          } else if (e.target.textContent == "A - Z") {
            [...sortBox.children].forEach((e) => {
              e.classList.remove("active");
            });

            addToPage(
              arr.toSorted(function (a, b) {
                let x = a.content.toLowerCase();
                let y = b.content.toLowerCase();
                if (x < y) {
                  return -1;
                }
                if (x > y) {
                  return 1;
                }
                return 0;
              })
            );
            e.target.classList.add("active");
          } else if (e.target.textContent == "Z - A") {
            [...sortBox.children].forEach((e) => {
              e.classList.remove("active");
            });
            addToPage(
              arr.toSorted(function (a, b) {
                let x = a.content.toLowerCase();
                let y = b.content.toLowerCase();
                if (x < y) {
                  return 1;
                }
                if (x > y) {
                  return -1;
                }
                return 0;
              })
            );
            e.target.classList.add("active");
          }
        }
      });
    } else {
      e.classList.remove("clicked");
      e.style.boxShadow =
        "3px 3px 6px 1px #1c1c1c, inset 5px 8px 10px -2px #191a1c, inset -4px -4px 7px -4px #c3c3c326";

      setTimeout(() => {
        e.style.boxShadow =
          "4px 3px 6px 1px #1c1c1c, inset -5px -4px 10px -2px #191a1c, inset 5px 5px 7px -4px #c3c3c326";
      }, 100);
      sortBox.style.display = "none";
    }
  } else {
    filterBox.style.display = "none";
    sortBox.style.display = "none";
  }
}

function removeElement(e) {
  let cnt;
  if (e.target.classList.contains("remove")) {
    cnt = e.target.parentElement.parentElement.children[1].value;

    delNote(cnt);
  } else if (e.target.parentElement.classList.contains("remove")) {
    cnt = e.target.parentElement.parentElement.parentElement.children[1].value;

    delNote(cnt);
  } else if (
    e.target.parentElement.parentElement.classList.contains("remove")
  ) {
    cnt =
      e.target.parentElement.parentElement.parentElement.parentElement
        .children[1].value;

    delNote(cnt);
  }
}

function delNote(cnt) {
  arr = arr.filter((task) => task.content != cnt);
  [...sortBox.children].map((e) => {
    if (e.classList.contains("active")) {
      if (e.textContent == "Newest") {
        addToLocalStorage(arr);
        addToPage(arr);
      } else if (e.textContent == "Oldest") {
        addToLocalStorage(arr);
        addToPage(arr.toReversed());
      } else if (e.textContent == "A - Z") {
        addToLocalStorage(arr);
        addToPage(
          arr.toSorted(function (a, b) {
            let x = a.content.toLowerCase();
            let y = b.content.toLowerCase();
            if (x < y) {
              return -1;
            }
            if (x > y) {
              return 1;
            }
            return 0;
          })
        );
      } else if (e.textContent == "Z - A") {
        addToLocalStorage(arr);
        addToPage(
          arr.toSorted(function (a, b) {
            let x = a.content.toLowerCase();
            let y = b.content.toLowerCase();
            if (x < y) {
              return 1;
            }
            if (x > y) {
              return -1;
            }
            return 0;
          })
        );
      }
    }
  });
}

function editElement(e) {
  if (e.target.classList.contains("edit")) {
    let note = e.target.parentElement.parentElement.children[1];
    note.removeAttribute("readonly");
    note.focus();
    // note.style.backgroundColor = "#789ccf";
    let noteValue = note.value;
    note.addEventListener("keypress", function (e) {
      if (e.code == 13 || e.keyCode == 13) {
        note.blur();
      }
    });
    note.onblur = function () {
      note.setAttribute("readonly", "");
      note.style.backgroundColor = "transparent";
      arr.map((e) => {
        if (e.content == noteValue) {
          e.content = note.value;
        }
      });
      addToLocalStorage(arr);
      addToPage(arr);
    };
  } else if (e.target.parentElement.classList.contains("edit")) {
    let note = e.target.parentElement.parentElement.parentElement.children[1];
    note.removeAttribute("readonly");
    note.focus();
    // note.style.backgroundColor = "#789ccf";
    let noteValue = note.value;
    note.addEventListener("keypress", function (e) {
      if (e.code == 13 || e.keyCode == 13) {
        note.blur();
      }
    });
    note.onblur = function () {
      note.setAttribute("readonly", "");
      note.style.backgroundColor = "transparent";
      arr.map((e) => {
        if (e.content == noteValue) {
          e.content = note.value;
        }
      });
      addToLocalStorage(arr);
      addToPage(arr);
    };
  } else if (e.target.parentElement.parentElement.classList.contains("edit")) {
    let note =
      e.target.parentElement.parentElement.parentElement.parentElement
        .children[1];
    note.removeAttribute("readonly");
    note.focus();
    // note.style.backgroundColor = "#789ccf";
    let noteValue = note.value;
    note.addEventListener("keypress", function (e) {
      if (e.code == 13 || e.keyCode == 13) {
        note.blur();
      }
    });
    note.onblur = function () {
      note.setAttribute("readonly", "");
      note.style.backgroundColor = "transparent";
      arr.map((e) => {
        if (e.content == noteValue) {
          e.content = note.value;
        }
      });
      addToLocalStorage(arr);
      addToPage(arr);
    };
  } else if (
    e.target.parentElement.parentElement.parentElement.classList.contains(
      "edit"
    )
  ) {
    let note =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.children[1];
    note.removeAttribute("readonly");
    note.focus();
    // note.style.backgroundColor = "#789ccf";
    let noteValue = note.value;
    note.addEventListener("keypress", function (e) {
      if (e.code == 13 || e.keyCode == 13) {
        note.blur();
      }
    });
    note.onblur = function () {
      note.setAttribute("readonly", "");
      note.style.backgroundColor = "transparent";
      arr.map((e) => {
        if (e.content == noteValue) {
          e.content = note.value;
        }
      });
      addToLocalStorage(arr);
      addToPage(arr);
    };
  }
}

// function noData() {
//   if (arr.length == 0) {
//     notesBox.innerHTML = '<h4 class="none">No Notes To Show</h4>';
//     notesBox.style.display = "block";
//     notesBox.style.overflow = "visible";
//   } else {
//     notesBox.style.display = "grid";
//     notesBox.style.overflow = "scroll";
//   }
// }

function notesFacilities(e) {
  [...options.children].forEach((ele) => {
    ele.classList.remove("actived");
  });
  e.classList.add("actived");
  e.style.boxShadow =
    "inset 5px 8px 10px -2px #191a1c, inset -4px -4px 7px -4px #c3c3c326";

  setTimeout(() => {
    e.style.boxShadow =
      "inset -5px -4px 10px -2px #191a1c, inset 5px 5px 7px -4px #c3c3c326";
  }, 100);
  input.focus();
  input.addEventListener("keypress", function (e) {
    if ((input.value != "" && e.keyCode == 13) || e.code == 13) {
      addToArray(input.value);
      input.value = "";
    }
  });
  // if (e.classList.contains("add-note")) {
  //   input.addEventListener("keypress", function (e) {
  //     addToPage(arr);
  //     if ((input.value != "" && e.keyCode == 13) || e.code == 13) {
  //       addToArray(input.value);
  //       input.value = "";
  //     }
  //   });
  // } else if (e.classList.contains("search-button")) {
  //   let searchArr = [];
  //   input.addEventListener("input", function () {
  //     if (e.code != 13 && input.value != "") {
  //       notesBox.innerHTML = "";
  //       let cnt = [...input.value];
  //       arr.forEach((e) => {
  //         if (e.content[0].toLowerCase() == cnt[0].toLowerCase()) {
  //           searchArr.push(e);
  //         }
  //       });
  //       addToPage(searchArr);
  //     } else {
  //       searchArr = [];
  //       addToPage(arr);
  //     }
  //   });
  // }
}

// function searchNote(e) {
//   [...options.children].forEach((ele) => {
//     ele.classList.remove("actived");
//   });
//   e.classList.add("actived");
//   e.style.boxShadow =
//     "inset 5px 8px 10px -2px #191a1c, inset -4px -4px 7px -4px #c3c3c326";

//   setTimeout(() => {
//     e.style.boxShadow =
//       "inset -5px -4px 10px -2px #191a1c, inset 5px 5px 7px -4px #c3c3c326";
//   }, 100);
//   input.focus();
// }
