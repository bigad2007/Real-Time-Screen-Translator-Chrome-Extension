// 페이지에 플로팅 버튼과 탭 기반 번역/정보 박스 HTML 주입
const container = document.createElement('div');
container.id = 'translator-root';
container.innerHTML = `
  <button id="translator-float-btn">🌐 번역 메뉴 켜기</button>
  <div id="translator-box" class="hidden">
    <div class="translator-header">
      <span>실시간 번역 & 개발자 정보</span>
      <div class="translator-controls">
        <select id="target-lang">
          <option value="ko">한국어</option>
          <option value="en">English</option>
          <option value="ja">日本語</option>
          <option value="zh-CN">中文</option>
        </select>
      </div>
    </div>
    
    <!-- 탭 네비게이션 버튼 영역 -->
    <div class="translator-tabs">
      <button class="tab-btn active" data-target="tab-dev">👨‍💻 개발자 정보</button>
      <button class="tab-btn" data-target="tab-translate">🌐 화면 번역</button>
    </div>

    <!-- 탭 1: 개발자 및 유저 정보 카테고리 -->
    <div class="tab-content active" id="tab-dev">
      <div class="dev-info-card">
        <h3>🛡️ Developer Info</h3>
        <p><b>개발자(저작권자):</b> 비가드 (Bigad)</p>
        <p style="font-size: 11px; color: #94a3b8; margin-top: 4px;">
          * 본 프로그램의 모든 저작권은 비가드에게 있습니다. 수정은 불가하며 배포는 자유로우나 출처를 명확히 표기해야 합니다.
        </p>
        <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 8px 0;">
        <div class="dev-links">
          <a href="https://www.youtube.com/@Bigad2007" target="_blank" class="dev-link-btn youtube">📺 유튜브 채널</a>
          <a href="https://discord.gg/bE5fAxyNWj" target="_blank" class="dev-link-btn discord">🎮 디스코드 서버</a>
        </div>
        <div class="donation-box">
          <span style="font-size: 11px; color: #f97316; font-weight: bold;">☕ 후원하기 (BTC)</span>
          <div class="btc-address" title="클릭하여 복사">bc1qk3y9ksxh97z7x5a9vf2tcp5376gdzhymzmrnyx</div>
        </div>
      </div>
    </div>

    <!-- 탭 2: 기존 화면 번역 기능 카테고리 -->
    <div class="tab-content" id="tab-translate">
      <div class="translator-content" id="translator-text">
        1. 글자를 드래그하면 하단 박스에 번역됩니다.<br>
        2. 아래 버튼을 누르면 중복 없이 깔끔하게 실시간 번역이 삽입됩니다!
      </div>
      <div class="translator-footer">
        <span id="translator-status" style="font-size:11px; color:#94a3b8;">대기 중...</span>
        <div class="btn-group">
          <button id="translate-selection-btn">선택 영역 번역</button>
          <button id="live-screen-btn">화면 위 실시간 번역 삽입</button>
        </div>
      </div>
    </div>
  </div>
`;
document.body.appendChild(container);

const floatBtn = document.getElementById('translator-float-btn');
const transBox = document.getElementById('translator-box');
const statusText = document.getElementById('translator-status');
const contentText = document.getElementById('translator-text');
const langSelect = document.getElementById('target-lang');
const liveScreenBtn = document.getElementById('live-screen-btn');

let isLiveRunning = false;
let translatedElements = [];

// 플로팅 버튼 클릭 시 박스 켜기/끄기
floatBtn.addEventListener('click', () => {
  transBox.classList.toggle('hidden');
  if (transBox.classList.contains('hidden')) {
    floatBtn.textContent = '🌐 번역 메뉴 켜기';
  } else {
    floatBtn.textContent = '메뉴 숨기기 (-)';
  }
});

// 탭 전환 로직
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    
    btn.classList.add('active');
    const targetId = btn.getAttribute('data-target');
    document.getElementById(targetId).classList.add('active');
  });
});

document.querySelector('.btc-address').addEventListener('click', (e) => {
  navigator.clipboard.writeText(e.target.textContent);
  alert('비트코인 후원 주소가 복사되었습니다!');
});

document.addEventListener('mouseup', async () => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0 && !transBox.classList.contains('hidden')) {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    document.querySelector('[data-target="tab-translate"]').classList.add('active');
    document.getElementById('tab-translate').classList.add('active');

    contentText.textContent = `[드래그 텍스트]\n${selectedText}`;
    statusText.textContent = '번역 중...';
    
    try {
      const targetLang = langSelect.value;
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(selectedText)}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data && data[0]) {
        const translated = data[0].map(item => item[0]).join('');
        contentText.innerHTML = `<b>[원문]</b><br>${selectedText}<br><br><b>[번역]</b><br><span style="color:#f97316;">${translated}</span>`;
        statusText.textContent = '번역 완료';
      }
    } catch (err) {
      statusText.textContent = '번역 실패';
    }
  }
});

// 실시간 번역 삽입 기능
liveScreenBtn.addEventListener('click', async () => {
  if (isLiveRunning) {
    translatedElements.forEach(item => {
      if (item.tag && item.tag.parentNode) {
        item.tag.remove();
      }
    });
    translatedElements = [];
    isLiveRunning = false;
    liveScreenBtn.textContent = '화면 위 실시간 번역 삽입';
    liveScreenBtn.classList.remove('active');
    statusText.textContent = '실시간 번역 꺼짐';
    return;
  }

  isLiveRunning = true;
  liveScreenBtn.textContent = '실시간 번역 끄기';
  liveScreenBtn.classList.add('active');
  statusText.textContent = '중복 제거 및 번역 중...';

  const targetLang = langSelect.value;
  const textElements = document.querySelectorAll('p, span, h1, h2, h3, h4, a, li, label, b, strong');
  let count = 0;

  for (let el of textElements) {
    if (!isLiveRunning) break;
    if (el.dataset.translated || el.querySelector('.live-translated-tag')) continue;
    
    let hasNestedConflict = false;
    let parent = el.parentElement;
    while (parent && parent !== document.body) {
      if (parent.dataset.translated) {
        hasNestedConflict = true;
        break;
      }
      parent = parent.parentElement;
    }
    if (hasNestedConflict) continue;

    const text = el.innerText ? el.innerText.trim() : '';
    if (text.length > 1 && text.length < 100) {
      try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
        const res = await fetch(url);
        
        if (!res.ok) {
          await new Promise(r => setTimeout(r, 300));
          continue;
        }

        const json = await res.json();
        if (json && json[0]) {
          const translatedText = json[0].map(item => item[0]).join('');
          const tag = document.createElement('span');
          tag.className = 'live-translated-tag';
          tag.textContent = `(${translatedText})`;
          
          el.appendChild(tag);
          el.dataset.translated = "true";
          translatedElements.push({ el, tag });
          count++;

          await new Promise(r => setTimeout(r, 50));
        }
      } catch (e) {}
    }
  }
  statusText.textContent = `실시간 번역 완료 (${count}개 적용)`;
});
