import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

// function to show thinking and loading
function loader(element){
    element.textContent = '';

    loadInterval = setInterval(() => {
      element.textContent += '.';
      if(element.textContent === '....'){
        element.textContent = '';
      }
    }, 300);
}

// function to type out texts letter by letter
function typeText(element, text){
  let index = 0;

  let interval = setInterval(() => {
    if(index < text.length){
      element.innerHTML += text.charAt(index);
      index++
    }else{
      clearInterval(interval);
    }
  }, 20);
}

//Generating a unique ID for each message
function generateUniqueId(){
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

// Implementing chat stripe function for message and response
function chatStripe(isAi, value, uniqueId){
  return (
    `
    <div class="wrapper ${isAi && 'ai'}">
      <div class="chat">
          <div class="profile">
              <img src="${isAi ? bot : user}" 
                  alt="${isAi ? 'bot' : 'user'}"
              />
          </div>
          <div class="message" id="${uniqueId}">${value}</div>
      </div>
    </div>
  `
  );
}

// Creating a function to handle submit
const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  // generte users chat stripe
  chatContainer.innerHTML += chatStripe(flase, data.get('prompt'));

  // Clearing text area input
  form.reset();

  // Generate a bot chat stripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  // Control scrolling effect for new messages
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // fetching message div
  const messageDiv = document.getElementById(uniqueId);

  // Turning on the loader
  loader(messageDiv);
}

form.addEventListener('submit', handleSubmit);

// Add event listener for enter button pressed
form.addEventListener('keyup', (e) => {
  if(e.keyCode === 13){
    handleSubmit(e);
  }
})
