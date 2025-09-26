const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', function(msg) {
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

// upload profile
const upload = document.getElementById('upload');
upload.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch('/upload', {method:'POST', body:formData});
  const data = await res.json();
  const profileArea = document.getElementById('profileArea');
  profileArea.innerHTML = `<img src="${data.filename}" width="100" />`;
});
