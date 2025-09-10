const FLASH_KEY = '"'"'flashItems'"'"';

function readFlashItems(){
  try{
    const raw = localStorage.getItem(FLASH_KEY);
    if(!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  }catch(e){
    console.error('readFlashItems error', e);
    return [];
  }
}

function writeFlashItems(items){
  localStorage.setItem(FLASH_KEY, JSON.stringify(items));
}

function uid(){
  return '"'"'f_'"'"'+Math.random().toString(36).slice(2,9)+Date.now().toString(36);
}

function renderAdminList(){
  const host = document.getElementById('admin-list');
  host.innerHTML = '';
  const items = readFlashItems();
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'admin-item';
    const img = document.createElement('img');
    img.src = item.imageData || 'https://placehold.co/600x600?text=Flash';
    img.alt = item.title || 'Flash';
    const title = document.createElement('div');
    title.textContent = item.title || '';
    const tags = document.createElement('div');
    tags.className = 'muted';
    tags.textContent = (item.tags || []).join(', ');
    const del = document.createElement('button');
    del.className = 'danger';
    del.textContent = 'Supprimer';
    del.addEventListener('click', () => {
      const next = readFlashItems().filter(x => x.id !== item.id);
      writeFlashItems(next);
      renderAdminList();
    });
    card.append(img,title,tags,del);
    host.appendChild(card);
  });
}

function resetForm(){
  document.getElementById('flash-title').value='';
  document.getElementById('flash-tags').value='';
  document.getElementById('flash-file').value='';
  document.getElementById('flash-preview').src='https://placehold.co/280x280?text=Apercu';
}

function fileToDataUrl(file){
  return new Promise((resolve,reject)=>{
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

window.addEventListener('load', () => {
  document.getElementById('year').textContent=new Date().getFullYear();
  const input = document.getElementById('flash-file');
  const preview = document.getElementById('flash-preview');
  input.addEventListener('change', async () => {
    const file = input.files && input.files[0];
    if(file){
      const dataUrl = await fileToDataUrl(file);
      preview.src = dataUrl;
    }
  });

  document.getElementById('flash-add').addEventListener('click', async () => {
    const title = document.getElementById('flash-title').value.trim();
    const tagsRaw = document.getElementById('flash-tags').value.trim();
    const file = document.getElementById('flash-file').files?.[0] || null;
    if(!file){ alert('Veuillez sélectionner une image.'); return; }
    const imageData = await fileToDataUrl(file);
    const tags = tagsRaw ? tagsRaw.split(',').map(s=>s.trim()).filter(Boolean) : [];
    const item = { id: uid(), title, tags, imageData };
    const list = readFlashItems();
    list.unshift(item);
    writeFlashItems(list);
    resetForm();
    renderAdminList();
  });

  document.getElementById('flash-reset').addEventListener('click', resetForm);
  renderAdminList();
});
