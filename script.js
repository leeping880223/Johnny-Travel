const assistant = document.getElementById('assistant');
const closeBtn = assistant.querySelector('.close-btn');
const icon = assistant.querySelector('.icon');
const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const messages = assistant.querySelector('.messages');

// Click circle button to expand
assistant.addEventListener('click', function(e) {
  if (e.target === closeBtn) return;

  if (!assistant.classList.contains('open')) {
    assistant.classList.add('open');
    icon.style.display = 'none';
  }
});

// Click close button to collapse
closeBtn.addEventListener('click', function(e) {
  e.stopPropagation();
  assistant.classList.remove('open');
  icon.style.display = 'flex';
});

// send message
sendBtn.addEventListener('click', function () {
  const msg = userInput.value.trim();
  if (msg !== '') {
    const p = document.createElement('p');
    p.textContent = 'You: ' + msg;
    messages.appendChild(p);
    userInput.value = '';
    messages.scrollTop = messages.scrollHeight;
  }
});

// mpa
let map;
const locations = [
  { name: "捷絲旅台北三重館", lat: 25.055504, lng: 121.489535 },
  { name: "五燈獎豬腳飯", lat: 25.058638, lng: 121.519411 },
  { name: "台灣番薯之丘（蘆洲）", lat: 25.085114, lng: 121.482957 },
  { name: "忠孝碼頭", lat: 25.046786, lng: 121.508949 },
  { name: "口吅品三重二店", lat: 25.059659, lng: 121.497359 },
  { name: "一級棒串燒", lat: 25.064185, lng: 121.495319 },
  { name: "小貨車涼麵", lat: 25.066019, lng: 121.489928 },
  { name: "豐滿早午餐｜三重正義店", lat: 25.062822, lng: 121.492151 },
  { name: "三重蛋餅大王", lat: 25.061276, lng: 121.493059 },
];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: locations[0],
    zoom: 13,
  });

  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({ map });

  // 地標
  locations.forEach((loc, index) => {
    new google.maps.Marker({
      position: { lat: loc.lat, lng: loc.lng },
      map,
      label: `${index + 1}`,
      title: loc.name,
    });
  });

  // 中間點作為停靠點（不包含起點與終點）
  const waypoints = locations.slice(1, locations.length - 1).map((loc) => ({
    location: { lat: loc.lat, lng: loc.lng },
    stopover: true,
  }));

  directionsService.route(
    {
      origin: locations[0],
      destination: locations[locations.length - 1],
      waypoints: waypoints,
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        alert("路線規劃失敗: " + status);
      }
    }
  );
}
