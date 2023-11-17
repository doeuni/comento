let batteryLevel = 100;// 배터리 레벨과 알람 목록을 저장하는 변수 선언
let alarms = [];

function updateBattery() {// 배터리 레벨을 업데이트하고 화면에 표시하는 함수
  const batteryLevelElement = document.getElementById('battery-level');// html에서 배터리 레벨을 표시하는 요소 가져오기
  batteryLevelElement.textContent = `🔋${batteryLevel}%`; // 배터리 레벨 표시 업데이트

  const clockElement = document.getElementById('clock');// html에서 시계 요소 가져오기

  if (batteryLevel === 0) {// 배경색을 검정으로 변경
    clockElement.style.backgroundColor = 'black';
    clockElement.textContent = '🪫'; // 배터리가 다 닳았을 때 이모티콘으로 변경
  }
}

function updateClock() {// 현재 시간을 업데이트하고 화면에 표시하는 함수
  const now = new Date();
// 시, 분, 초를 가져와서 문자열로 변환
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const timeString = `${hours}:${minutes}:${seconds}`;
  document.getElementById('clock').textContent = timeString;
}
// 알람을 추가하는 함수
function addAlarm() {
  const hours = document.getElementById('hours').value;
  const minutes = document.getElementById('minutes').value;
  const seconds = document.getElementById('seconds').value;

  if (alarms.length < 3 && hours !== '' && minutes !== '' && seconds !== '') {
    alarms.push({ hours, minutes, seconds });
    updateAlarmList();
  } else {
    alert('3개까지의 알람만 추가할 수 있습니다.');
  }
}

function updateAlarmList() {
  const alarmListElement = document.getElementById('alarm-list');
  alarmListElement.innerHTML = '';

  alarms.forEach((alarm, index) => {
    const alarmString = `${alarm.hours}:${alarm.minutes}:${alarm.seconds}`;
    const listItem = document.createElement('div');
    listItem.textContent = `알람 ${index + 1}: ${alarmString}`;
    alarmListElement.appendChild(listItem);
  });
}


// 초기 설정
updateBattery();
updateClock();
setInterval(() => {
  batteryLevel = Math.max(batteryLevel - 1, 0);
  updateBattery();
}, 1000);

setInterval(() => {
  if (batteryLevel > 0) {
    updateClock();
  }
}, 1000);
