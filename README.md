# 실시간 화면 번역기 크롬 확장 프로그램 / Real-Time Screen Translator Chrome Extension

[한국어](#한국어) | [English](#English)

---

## 한국어

### 1. 설명
본 코드는 웹서핑 중 마우스 드래그로 원하는 텍스트를 즉시 번역하거나, 웹페이지 전체의 주요 텍스트 요소를 스캔하여 실시간으로 오버레이 번역을 제공하는 크롬 확장 프로그램(Manifest V3)입니다. 사용하기 편리한 플로팅 UI 버튼과 Google 번역 API 기반의 비동기 요청 처리를 통해 가볍고 빠르게 작동합니다.

### 2. 작동 원리
* **플로팅 인터페이스 (`content.css`, `content.js`)**: 웹페이지 우측 하단에 고정된 플로팅 버튼(`🌐 번역 박스 켜기`)과 모던한 다크모드 기반의 컨트롤 박스를 DOM에 직접 동적 주입합니다.
* **드래그 텍스트 번역**: 사용자가 웹페이지 상에서 텍스트를 마우스로 드래그하고 `mouseup` 이벤트가 발생하면, 선택된 텍스트를 구글 비공식 번역 API 엔드포인트(`translate.googleapis.com`)로 전송하여 타겟 언어로 실시간 변환 후 박스에 출력합니다.
* **실시간 화면 번역 삽입 (`liveScreenBtn`)**: 
  * `p`, `span`, `h1~h4`, `a`, `li` 등 주요 텍스트 노드를 순회합니다.
  * 중복 번역 및 중첩 충돌을 방지하기 위해 `dataset.translated` 속성 체크와 부모/자식 요소 유효성 검사를 수행합니다.
  * 번역된 결과를 원문 뒤에 작은 태그(`live-translated-tag`) 형태로 깔끔하게 덧붙입니다.
  * 사용자가 실시간 번역을 끄거나 재클릭할 경우, 동적으로 추가했던 번역 태그들을 완벽히 원상복구(제거)합니다.
* **크롬 확장 구조 (`manifest.json`)**: Manifest V3 표준을 준수하며, `activeTab` 및 `scripting` 권한을 활용해 모든 웹사이트 주소(`<all_urls>`)에서 `content.js`와 `content.css`를 주입하여 작동합니다.

### 3. 사용 방법
1. 프로젝트 폴더에 `manifest.json`, `content.js`, `content.css` 파일들을 동일한 위치에 저장합니다.
2. 크롬 브라우저에서 `chrome://extensions/` 주소로 이동합니다.
3. 우측 상단의 **'개발자 모드 (Developer mode)'**를 활성화합니다.
4. 좌측 상단의 **'압축 해제된 확장 프로그램을 로드합니다 (Load unpacked)'** 버튼을 클릭하고 해당 프로젝트 폴더를 선택합니다.
5. 아무 웹페이지나 방문한 뒤 우측 하단의 **'🌐 번역 박스 켜기'** 버튼을 눌러 번역 패널을 열어 사용합니다.

---

## English

### 1. Description
This code is a Chrome browser extension (Manifest V3) that allows users to instantly translate selected text via mouse dragging or perform a live, in-page overlay translation by scanning key text elements on any webpage. Built with a user-friendly floating UI and asynchronous Google Translate API integration, it operates quickly and lightweight.

### 2. How It Works
* **Floating Interface (`content.css`, `content.js`)**: Dynamically injects a fixed floating button (`🌐 번역 박스 켜기`) at the bottom-right corner of the webpage along with a modern dark-mode control box into the DOM.
* **Selection Translation**: When a user drags and selects text on a webpage, triggering the `mouseup` event, the selected text is sent to the unofficial Google Translate API endpoint (`translate.googleapis.com`), translated into the target language, and displayed inside the panel.
* **Live Screen Translation (`liveScreenBtn`)**:
  * Traverses core text nodes such as `p`, `span`, `h1~h4`, `a`, and `li`.
  * Prevents redundant translation and nested conflicts using `dataset.translated` checks and parent/child element validation.
  * Appends the translated text neatly right next to the original text using a styled tag (`live-translated-tag`).
  * Completely removes and cleans up all dynamically injected translation tags when the user toggles the live translation off.
* **Chrome Extension Architecture (`manifest.json`)**: Complies with the Manifest V3 standard, using `activeTab` and `scripting` permissions to inject `content.js` and `content.css` across all URLs (`<all_urls>`).

### 3. How to Use
1. Save `manifest.json`, `content.js`, and `content.css` together in the same directory folder.
2. Open the Chrome browser and navigate to `chrome://extensions/`.
3. Enable **'Developer mode'** in the top-right corner.
4. Click **'Load unpacked'** in the top-left corner and select your project folder.
5. Visit any webpage and click the **'🌐 번역 박스 켜기'** button at the bottom right to open the translation panel and start using it.

---

## 📌 저작권 및 출처 / Copyright & Attribution

* **모든 저작권 (All Copyrights):** 비가드 (Bigad)
* **조건 (Conditions):** 
  * 본 코드의 **수정은 엄격히 불가**합니다. (Modification is strictly prohibited.)
  * 배포하는 것은 무관하나, **반드시 제작자가 본인(비가드)임을 명확히 알아볼 수 있도록 출처를 표기**해야 합니다. (Distribution is permitted, but you must clearly credit the creator, Bigad.)

## 🔗 채널 및 커뮤니티 / Channels & Community
* **YouTube:** [https://www.youtube.com/@Bigad2007](https://www.youtube.com/@Bigad2007)
* **Discord:** [https://discord.gg/bE5fAxyNWj](https://discord.gg/bE5fAxyNWj)

## ☕ 후원 / Donations
* **BTC (Bitcoin):** `bc1qk3y9ksxh97z7x5a9vf2tcp5376gdzhymzmrnyx`
