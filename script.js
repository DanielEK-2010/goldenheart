const activities = [
 {id:1,title:"Community Clean-up Day",category:"organised",tag:"Environment",time:"2–3 hours",place:"Your neighbourhood",desc:"Work with a local group to clean public spaces and encourage responsible waste habits.",impact:"Cleaner shared spaces and stronger community awareness.",image:"https://unhabitatmyanmar.org/wp-content/uploads/2023/06/IMG_E6238-scaled.jpg"},
 {id:2,title:"Reading Buddy Programme",category:"organised",tag:"Education",time:"1–2 hours/week",place:"Community learning centre",desc:"Read stories and practise literacy with children in a supportive learning environment.",impact:"More confidence, literacy practice, and positive learning experiences.",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeVP6DusHPucd4EkryBuVIIe8xtuVHy1VwQdSZx20wHQ&s=10"},
 {id:3,title:"Food Bank Support",category:"organised",tag:"Community",time:"Half a day",place:"Food bank",desc:"Help sort, pack, and distribute food parcels through a trusted organisation.",impact:"Food support reaches households more efficiently.",image:"https://bucket-api.baznas.go.id/bucket-api/file?bucket=bzn-fdr-smb-p5739641&file=attachments/berita/MTYyODE3MjI0ODc0NzY.jpeg"},
 {id:4,title:"Riverbank Clean-up",category:"local",tag:"Environment",time:"2–4 hours",place:"Local river area",desc:"Collect litter safely with a community team and learn how waste affects waterways.",impact:"Cleaner riverbanks and greater awareness of water pollution.",image:"https://dvgddkosknh6r.cloudfront.net/live/media/img/1761454006-IMG-20251025-WA0025.jpg"},
 {id:5,title:"Help at a Community Library",category:"local",tag:"Education",time:"Flexible",place:"Public or community library",desc:"Organise books, assist younger readers, or help run a reading session.",impact:"A more welcoming space for learning and access to books.",image:"https://i0.wp.com/pustakalanalibrary.wordpress.com/wp-content/uploads/2024/05/screen-shot-2024-05-30-at-12.56.03.png?ssl=1"},
 {id:6,title:"Support Local UMKM",category:"local",tag:"Community",time:"A few hours",place:"Local market or online",desc:"Help small local businesses with product photos, simple promotion, or event support.",impact:"Greater visibility and practical support for local entrepreneurs.",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS3nG9O2UE3yfgYvwrtE9H5O9Wvk44MsC7qJpERTv6OqxMdfL_N-SZmbc&s=10"},
 {id:7,title:"Community Garden",category:"local",tag:"Environment",time:"1–3 hours",place:"Community garden",desc:"Plant, water, and maintain shared green spaces with neighbours.",impact:"Greener neighbourhoods and stronger community connections.",image:"https://humas.sinjaikab.go.id/v1/uploads/posts/2026/06/69f2b8daa5f0c55d.jpeg"},
 {id:8,title:"Elderly Companionship",category:"local",tag:"People",time:"1–2 hours",place:"Community centre",desc:"Spend time listening, chatting, or assisting with activities at a community centre.",impact:"Social connection and a more inclusive community.",image:"https://www.tzuchi.or.id/inliners/1697771299-foto-1-foto7-img-20231015-wa0086-edt.jpg"},
 {id:9,title:"Disaster Relief Donations",category:"local",tag:"Community",time:"Event-based",place:"Verified local organisation",desc:"Help collect, sort, or promote requested supplies through a trusted relief group.",impact:"Useful support can reach affected communities in an organised way.",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1N0_J859EXNRwYOesq2QvuoPOQ128e01ml2qlyOCywyZSUBOVluYo8eI&s=10"},
 {id:10,title:"Digital Skills for All",category:"global",tag:"Education",time:"Flexible online",place:"Online",desc:"Share beginner-friendly digital skills or learning resources through a vetted programme.",impact:"More people can access practical digital learning.",image:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85"},
 {id:11,title:"Global Climate Campaign",category:"global",tag:"Environment",time:"Flexible",place:"Online / local events",desc:"Support credible climate initiatives by raising awareness and joining community actions.",impact:"More informed communities and collective environmental action.",image:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=85"},
 {id:12,title:"Language Exchange Volunteer",category:"global",tag:"Education",time:"1 hour/week",place:"Online programme",desc:"Practise languages with learners in a structured, respectful exchange.",impact:"Language confidence and cross-cultural understanding.",image:"https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85"}
];

const categoryNames = { organised: "Organised", local: "Indonesia", global: "Global" };
let activeFilter = "all";

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

function card(a) {
  return `<article class="activity-card">
    <div class="card-image" style="background-image:url('${a.image}')">
      <span class="card-label">${a.tag}</span>
    </div>
    <div class="card-body">
      <h3>${a.title}</h3>
      <p>${a.desc}</p>
      <div class="card-footer">
        <span class="card-meta">◷ ${a.time}</span>
        <div class="card-actions">
          <button class="mini-button" data-details="${a.id}">Details</button>
          <button class="mini-button" data-join="${a.id}">Join ↗</button>
        </div>
      </div>
    </div>
  </article>`;
}

function renderSection(id, cat) {
  const target = $(id);
  if (target) {
    target.innerHTML = activities.filter(a => a.category === cat).slice(0, 3).map(card).join("");
  }
}

function renderResults() {
  const q = $("#search-input").value.trim().toLowerCase();
  const list = activities.filter(a => 
    (activeFilter === "all" || a.category === activeFilter) && 
    `${a.title} ${a.tag} ${a.desc} ${a.place}`.toLowerCase().includes(q)
  );
  
  $("#results").innerHTML = list.map(card).join("");
  $("#result-count").textContent = `${list.length} ${list.length === 1 ? "opportunity" : "opportunities"}`;
  $("#empty-state").hidden = list.length !== 0;
}

function showDetails(id) {
  const a = activities.find(x => x.id === Number(id));
  if (!a) return;
  
  $("#dialog-content").innerHTML = `
    <div class="card-image" style="background-image:url('${a.image}')"></div>
    <p class="eyebrow">${categoryNames[a.category] || a.category} · ${a.tag}</p>
    <h2>${a.title}</h2>
    <p>${a.desc}</p>
    <p><strong>Why it matters:</strong> ${a.impact}</p>
    <div class="dialog-meta">
      <span>◷ ${a.time}</span>
      <span>⌖ ${a.place}</span>
    </div>
    <button class="button button-dark" data-join="${a.id}">Join this activity ↗</button>
  `;
  $("#activity-dialog").showModal();
}

function showJoin(id) {
  const a = activities.find(x => x.id === Number(id));
  if (!a) return;
  
  $("#join-activity-name").textContent = a.title;
  $("#join-form").dataset.activity = a.title;
  $("#activity-dialog").close();
  $("#join-dialog").showModal();
}

// Event Listeners
document.addEventListener("click", e => {
  const d = e.target.closest("[data-details]");
  const j = e.target.closest("[data-join]");
  const f = e.target.closest("[data-filter]");
  
  if (d) showDetails(d.dataset.details);
  if (j) showJoin(j.dataset.join);
  if (f && f.classList.contains("filter-link")) {
    activeFilter = f.dataset.filter;
    $$(".filter").forEach(b => b.classList.toggle("active", b.dataset.filter === activeFilter));
    renderResults();
  }
  if (e.target.classList.contains("dialog-close")) e.target.closest("dialog").close();
});

$$(".filter").forEach(b => b.addEventListener("click", () => {
  activeFilter = b.dataset.filter;
  $$(".filter").forEach(x => x.classList.toggle("active", x === b));
  renderResults();
}));

$("#search-input").addEventListener("input", renderResults);
$("#clear-search").addEventListener("click", () => {
  $("#search-input").value = "";
  renderResults();
});

$("#surprise-btn").addEventListener("click", () => {
  const pool = activities.filter(a => activeFilter === "all" || a.category === activeFilter);
  const a = pool[Math.floor(Math.random() * pool.length)];
  if (a) showDetails(a.id);
});

$("#join-form").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.currentTarget;
  const data = new FormData(f);
  const subject = encodeURIComponent(`GoldenHeart volunteering: ${f.dataset.activity}`);
  const body = encodeURIComponent(`Activity: ${f.dataset.activity}\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nMessage: ${data.get("message") || "(No message)"}`);
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
});

// Mobile Navigation Toggle
const toggle = $(".menu-toggle"), nav = $(".nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  toggle.textContent = open ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.textContent = "☰";
}));

// --- VOLUNTEER SIGN-UP FORM ---

// Put the email address that should receive registrations here (optional).
// If left empty, the email draft opens without a recipient.
const CONTACT_EMAIL = "";

const signupForm = $("#signup-form");
const signupActivity = $("#signup-activity");

// Fill the activity dropdown from the activities list
if (signupActivity) {
  const groups = Object.keys(categoryNames).map(cat => {
    const options = activities
      .filter(a => a.category === cat)
      .map(a => `<option value="${a.title}">${a.title}</option>`)
      .join("");
    return `<optgroup label="${categoryNames[cat]}">${options}</optgroup>`;
  }).join("");

  signupActivity.innerHTML =
    `<option value="" disabled selected>Select an activity</option>` +
    `<option value="Any activity (I'm flexible)">Any activity (I'm flexible)</option>` +
    groups;
}

if (signupForm) {
  signupForm.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(signupForm);

    const subject = encodeURIComponent(`GoldenHeart volunteer registration: ${data.get("activity")}`);
    const body = encodeURIComponent(
`Volunteer registration

Activity: ${data.get("activity")}
Full name: ${data.get("name")}
Email: ${data.get("email")}
Phone / WhatsApp: ${data.get("phone")}
Age: ${data.get("age")}
City: ${data.get("city")}
Availability: ${data.get("availability")}

Why I want to join:
${data.get("message")}`
    );

    $("#signup-success").hidden = false;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    signupForm.reset();
  });
}

// Initial Rendering
renderSection("#organised-cards", "organised");
renderSection("#local-cards", "local");
renderSection("#global-cards", "global");
renderResults();
