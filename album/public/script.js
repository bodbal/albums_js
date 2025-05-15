const albumForm = document.getElementById('albumForm');
const albumList = document.getElementById('albumList');
const errorDiv = document.getElementById('error');

let editId = null; 

albumForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const band = document.getElementById('band').value.trim();
  const title = document.getElementById('title').value.trim();
  const year = parseInt(document.getElementById('year').value);
  const genre = document.getElementById('genre').value.trim();

  if (!band || !title || !year || !genre) {
    errorDiv.textContent = 'Minden mező kitöltése kötelező!';
    return;
  }

  errorDiv.textContent = '';

  if (editId !== null) {
    
    await fetch(`/api/albums/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ band, title, year, genre })
    });
    editId = null;
  } else {
    
    await fetch('/api/albums', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ band, title, year, genre })
    });
  }

  albumForm.reset();
  loadAlbums();
});

async function loadAlbums() {
  albumList.innerHTML = '';
  const res = await fetch('/api/albums');
  const albums = await res.json();
  albums.forEach(album => {
    const li = document.createElement('li');
    li.className = 'album-item';
    li.innerHTML = `
      <strong>${album.band} - ${album.title}</strong> (${album.year}, ${album.genre})
      <button onclick="editAlbum(${album.id})">Szerkesztés</button>
      <button onclick="deleteAlbum(${album.id}) id="delete">Törlés</button>
    `;
    albumList.appendChild(li);
  });
}

async function deleteAlbum(id) {
  await fetch(`/api/albums/${id}`, { method: 'DELETE' });
  loadAlbums();
}

async function editAlbum(id) {
  const res = await fetch(`/api/albums/${id}`);
  const album = await res.json();
  document.getElementById('band').value = album.band;
  document.getElementById('title').value = album.title;
  document.getElementById('year').value = album.year;
  document.getElementById('genre').value = album.genre;

  editId = id;
}

loadAlbums();
