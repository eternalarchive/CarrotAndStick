# Carrot and Stick

### **GitHub Commit** **독려 애플리케이션**

<br/>

### 1. 팀 소개 

- 팀명 : 채찍과 당근
  - 팀장 : 김준혁
  - 팀원 : 정다희, 박홍빈 

<br/>

### 2. 팀 주제

Git Commit 수에 따른 캐릭터 표정 변화 어플리케이션 입니다. 사용자의 학습 욕구를 도모하기 위해 만들었습니다.

<br/>

### 3. 주제 선정 이유

**기능적인 측면 :** 

 GITHUB 관리를 위해 자신의 목표 커밋 수에 따라 스스로를 채찍질 하고, 스스로에게 칭찬(당근)을 할 수 있는 애플리케이션이 있다면 좋지 않을까?

**기술적인 측면 :** 

 이 애플리케이션 구현을 위해서 Git API와 여러 라이브러리를 직접 사용해보고, 프론트엔드 와 백엔드를 직⚬간접적으로 구축하여 어플리케이션의 흐름을 경험 할 수 있다. 

<br/>

### 4. 프로젝트 요구 사항

- W3C에서 제공한 MarkUp Validation Service 에서 이상이 없을 것.
- 최대한 시멘틱 하게 작성할 것.
- Express + Mongo DB로 백엔드 구축
- 여러 라이브러리 경험
- GitHub API 로드 및 가공
- 캐릭터 및 로고 렌더링 ( SVG 활용 )
- todo list 기능을 이용한 닉네임별로 관리되는 Git Daily Planner 개발

<br/>

### 5. 구현 기술

<img src="https://user-images.githubusercontent.com/31315644/69511508-b9c43f00-0f83-11ea-89bf-1889e46b1555.png" alt="Stack" style="zoom:50%;" />

<br/>

### 6.  MVP Flow Chart

![Flowchart](https://user-images.githubusercontent.com/31315644/69511730-ba110a00-0f84-11ea-8851-1c021e760493.png)

<br/>

### 7.  Mark Up 

![DomTree](https://user-images.githubusercontent.com/31315644/69511505-b9c43f00-0f83-11ea-86ce-cb4d61ede45b.png)

<br/>

### 8. 구현 일정 

![일정](https://user-images.githubusercontent.com/31315644/69507650-9e9f0280-0f76-11ea-8956-2a279a15e1db.png)

<br/>

### 9. 프로젝트 구현 영상

[![CARROT & STICK](https://user-images.githubusercontent.com/31315644/69508271-a1025c00-0f78-11ea-9d61-e21af8414095.jpeg)](https://www.youtube.com/watch?v=1WLIm9ZVbT4&feature=youtu.be)

( 이미지 클릭 시 유튜브로 이동됩니다. )

<br/>

### 10. 한계점 및 보완점

<img src="https://user-images.githubusercontent.com/31315644/69507654-a199f300-0f76-11ea-9ae4-69a3da28a08c.png" style="zoom:48%;" /> 

#### ( Git Api 에서 DDOS 공격을 방지하고자 IP 단위로 접근 수를 제한하고 있다. )

**한계점 1 :**

⇢ 인증되지 않은 유저로 Git Api의 접근

**보완점 : **

⇢ 비밀번호 필요 ( limit 초기화 ) 

⇢ Git 개발자 도구에서 사용자가 인증하도록 요구 ( limit 6000 번 할당 )

**⇢ 사용자가 실시간으로 새로고침 버튼을 누름 으로서 최대한 limit을 사용하지 않도록 함.**

<br/>

**한계점 2 :** 

⇢ Git Api의 데이터를 실시간으로 감시할 수 없음. 

**보완점 :** 

⇢ 일정 시간 이상 시 직속적으로 Api를 Get한다. ( setInterval 함수 사용 )

⇢ 프레임워크를 이용한다. ( Vue.js 의 watch 기능 등등 )

**⇢ 사용자가 실시간으로 새로고침 버튼을 누르게 요구.**

<br/>

![Contribution](https://user-images.githubusercontent.com/31315644/69511504-b92ba880-0f83-11ea-9efe-2d940ec23a4d.png)

<img src="https://user-images.githubusercontent.com/31315644/69507667-a5c61080-0f76-11ea-8db0-a91485c8417f.png" style="zoom:50%;" />