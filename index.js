window.addEventListener("beforeunload", function () {
  const currentUser = sessionStorage.getItem("currentUser");
  if (currentUser) {
    updateUserStatus(currentUser, false);
    // sessionStorage.removeItem("currentUser");
  }
});

function checkLoginStatus() {
  const currentUser = sessionStorage.getItem("currentUser");
  if (currentUser) {
    document.getElementById("login").style.display = "none";
    document.getElementById("chatsection").style.display = "grid";
    const username = sessionStorage.getItem("currentUser");
    if (username) {
      updateUserStatus(username, true);
    }
    showalluser();
  } else {
    document.getElementById("login").style.display = "block";
  }
}

window.addEventListener("storage", function (e) {
  if (e.key === "login") {
    if (sessionStorage.getItem("currentUser")) {
      showalluser();
      // location.reload();
    } else {
      location.reload();
    }
  }
});

function showalluser(params) {
  let left=document.createElement("div");
  let userImg = document.createElement("img");
  userImg.src = "./icon-5359553_640.webp";
  userImg.alt = "User Image";
  let curr = document.getElementById("currentuser");
  curr.innerHTML = "";
  
  left.appendChild(userImg);

  left.appendChild(document.createTextNode(" "));
  let currentuser = sessionStorage.getItem("currentUser");
  const newContent = document.createTextNode(currentuser);
  left.appendChild(newContent);
  // let activestat = document.createElement("div");

  if (currentuser) {
    let truestate = document.createElement("img");
    truestate.src = "./download.png";
    truestate.className = "x";
    // activestat.appendChild(truestate);
    left.appendChild(truestate);

  }
  curr.appendChild(left)

  let logoutdiv = document.createElement("button");
  logoutdiv.addEventListener("click", logout);
  logoutdiv.innerText = "logout";
  curr.appendChild(logoutdiv);

  let storedLoginData = JSON.parse(localStorage.getItem("login")) || [];
  let currentUser = sessionStorage.getItem("currentUser");
  let alluser = document.getElementById("alluser");
  alluser.innerHTML = "";

  // var input = document.createElement("input");
  // input.setAttribute("type", "text");
  // input.setAttribute("name", "myTextInput");
  // input.setAttribute("placeholder", "Enter text here...");
  // input.setAttribute("id", "search-bar");

  const searchBar = document.getElementById("search-bar");
  searchBar.addEventListener("input", function (e) {
    const searchTerm = e.target.value.trim();
    filterUsers(searchTerm);
    // console.log("Search Term:", searchTerm);
  });

  function filterUsers(searchTerm) {
    const storedLoginData = JSON.parse(localStorage.getItem("login")) || [];
    const currentUser = sessionStorage.getItem("currentUser");
    const alluser = document.getElementById("alluser");

    alluser.innerHTML = "";

    storedLoginData.forEach((user) => {
      if (
        user.username !== currentUser &&
        user.username.toLowerCase().includes(searchTerm)
      ) {
        let newuser = createUserElement(user);
        alluser.appendChild(newuser);
      }
    });
  }

  function createUserElement(user) {
    let newuser = document.createElement("div");
    newuser.addEventListener("click", showchat);
    newuser.id = user.username;
    newuser.value = user.username;

    let userImg = document.createElement("img");
    userImg.src = "./icon-5359553_640.webp";
    userImg.alt = "User Image";
    userImg.value = user.username;

    newuser.appendChild(userImg);

    const newContent = document.createTextNode(user.username);
    newuser.appendChild(newContent);

    let truestate = document.createElement("img");
    if (user.status) {
      truestate.src = "./download.png";
      truestate.className = "y";
    } else {
      truestate.src = "./download.jpg";
      truestate.className = "y";
    }
    newuser.appendChild(truestate);

    return newuser;
  }

  storedLoginData.forEach((user) => {
    if (user.username !== currentUser) {
      let newuser = document.createElement("div");
      newuser.addEventListener("click", showchat);
      // newuser.setAttribute("class", "prihighlight")  ;

      newuser.id = user.username;
      newuser.value = user.username;

      let userImg = document.createElement("img");
      userImg.src = "./icon-5359553_640.webp";
      userImg.alt = "User Image";
      userImg.value = user.username;

      newuser.appendChild(userImg);

      const newContent = document.createTextNode(user.username);
      newuser.appendChild(newContent);

      let truestate = document.createElement("img");
      if (user.status) {
        truestate.src = "./download.png";
        truestate.className = "y";
      } else {
        truestate.src = "./download.jpg";
        truestate.className = "y";
      }
      newuser.appendChild(truestate);

      alluser.appendChild(newuser);
    }
  });


  let chatmessages=document.getElementById("chatMessages");
  chatmessages.innerHTML="";
  let initialdisplay=document.createElement("div");
  initialdisplay.setAttribute("class","initialdisplay");
  let heading=document.createElement("h1");
  let heading2=document.createElement("h1");


  heading.innerText="Welcome..";
  heading2.innerText=currentUser;

  initialdisplay.appendChild(heading);
  initialdisplay.appendChild(heading2);

  chatmessages.appendChild(initialdisplay);

}
let x;
function showchat(e) {
  let highlight=document.getElementsByClassName("highlight");
  for (let i = 0; i < highlight.length; i++) {
    highlight[i].classList.remove("highlight");
  }

  clearInterval(x);
  document.getElementById("formid").style.display = "flex";
  let sendingto = e.target.value;
  e.target.setAttribute("class", "highlight") ;

  let chatbox = document.getElementById("chatbox");
  chatbox.value = sendingto;

  let userImg = document.createElement("img");
  userImg.src = "./icon-5359553_640.webp";
  userImg.alt = "User Image";
  let curr = document.getElementById("chatingwith");
  curr.innerHTML = "";
  curr.appendChild(userImg);

  curr.appendChild(document.createTextNode(" "));

  const newContent = document.createTextNode(sendingto);
  curr.appendChild(newContent);
  filterMessagesByRecipient(sendingto);

  x = setInterval(() => {
    filterMessagesByRecipient(sendingto);
  }, 500);
}

function showSignup(params) {
  document.getElementById("signup").style.display = "block";
  document.getElementById("login").style.display = "none";
}

function showLogin(params) {
  document.getElementById("signup").style.display = "none";
  document.getElementById("login").style.display = "block";
}

function signup(e) {
  e.preventDefault();

  let username = document.getElementById("signupUsername").value;
  let password = document.getElementById("signupPassword").value;

  let loginData = {
    username: username,
    password: password,
    status: false,
  };
  let existingLoginData = JSON.parse(localStorage.getItem("login")) || [];

  let check = existingLoginData.find((user) =>user.username === username
  );
  console.log(check);
  if (check) {
    alert("username allready exist");
  } else {
    existingLoginData.push(loginData);
    localStorage.setItem("login", JSON.stringify(existingLoginData));
    showLogin();
  }

  document.getElementById("signupUsername").value="";
 document.getElementById("signupPassword").value="";
}

function sendMessage(event) {
  event.preventDefault();

  const messageText = document.getElementById("chatInput").value;

  if (!messageText.trim()) {
    alert("Message cannot be empty.");
    return;
  }

  const currentUser = sessionStorage.getItem("currentUser");
  const recipient = document.getElementById("chatbox").value;

  const message = {
    sender: currentUser,
    receiver: recipient,
    text: messageText,
    timestamp: new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }),
  };

  const existingMessages = JSON.parse(localStorage.getItem("messages")) || [];
  existingMessages.push(message);
  localStorage.setItem("messages", JSON.stringify(existingMessages));

  document.getElementById("chatInput").value = "";
  setTimeout(() => {
    scrollChatToBottom();
  }, 500);
}

function displayMessage(message) {
  const chatMessages = document.getElementById("chatMessages");
  const currentUser = sessionStorage.getItem("currentUser");
  const isSender = message.sender === currentUser;
  const messageClass = isSender ? "sender-message" : "receiver-message";

  const messageElement = document.createElement("div");
  messageElement.classList.add("message", messageClass);

  const senderLabel = isSender
    ? ""
    : `<div class="message-sender">${message.sender}</div>`;
  const receiverLabel = isSender
    ? ""
    : `<div class="message-receiver">${message.receiver}</div>`;

  messageElement.innerHTML = `
        ${senderLabel}
        ${receiverLabel}
        <div class="message-text">${message.text}</div>
        <div class="message-timestamp">${message.timestamp}</div>
    `;
  chatMessages.appendChild(messageElement);
}

function logout() {
  const username = sessionStorage.getItem("currentUser");
  if (username) {
    updateUserStatus(username, false);
    sessionStorage.removeItem("currentUser");
  }
  location.reload();
}

function scrollChatToBottom() {
  const chatMessages = document.getElementById("chatMessages");
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function filterMessagesByRecipient(selectedRecipient) {
  const currentUser = sessionStorage.getItem("currentUser");
  const allMessages = JSON.parse(localStorage.getItem("messages")) || [];

  const chatMessages = document.getElementById("chatMessages");
  chatMessages.innerHTML = "";

  allMessages.forEach((message) => {
    if (
      (message.sender === selectedRecipient &&
        message.receiver == currentUser) ||
      (message.receiver == selectedRecipient && message.sender === currentUser)
    ) {
      displayMessage(message);
    }
  });
}

function login(e) {
  e.preventDefault();

  const usernameInput = document.getElementById("loginUsername");
  const passwordInput = document.getElementById("loginPassword");
  const username = usernameInput.value;
  const password = passwordInput.value;
  const storedLoginData = JSON.parse(localStorage.getItem("login")) || [];

  const matchedUser = storedLoginData.find(
    (user) => user.username === username && user.password === password &&user.status===false
  );

  if (matchedUser) {
    handleSuccessfulLogin(matchedUser);
  } else {
    alert("Incorrect username or password or allready logedin");
  }
  usernameInput.value="";
  passwordInput.value=""
}

function handleSuccessfulLogin(user) {
  document.getElementById("login").style.display = "none";
  document.getElementById("chatsection").style.display = "grid";
  sessionStorage.setItem("currentUser", user.username);

  if (!user.status) {
    updateUserStatus(user.username, true);
  }

  showalluser();
}

function updateUserStatus(username, newStatus) {
  const storedLoginData = JSON.parse(localStorage.getItem("login")) || [];
  const modifiedEmployees = storedLoginData.map((obj) => {
    if (obj.username === username) {
      return { ...obj, status: newStatus };
    }
    return obj;
  });
  localStorage.setItem("login", JSON.stringify(modifiedEmployees));
}
