# 🏌️ GolfPose

### 📱 산학협력 캡스톤설계II 프로젝트

> **사용자의 골프 스윙을 촬영하여 AI가 분석해주고, 피드백을 제공하는 영상 기반 스윙 분석 어플리케이션**

<p align="center">
  <img width="100%" alt="스크린샷 2025-07-01 오후 2 08 10" src="https://github.com/user-attachments/assets/d3193062-8dfa-47be-84cb-0016d6261441" />
</p>

---

## 🛠 기술 스택

<div style={display: flex}>
  <img src="https://img.shields.io/badge/React_Native-61DAFB.svg?style=for-the-badge&logo=react&logoColor=black" alt="React Native"/>
  <img src="https://img.shields.io/badge/Expo-000020.svg?style=for-the-badge&logo=expo&logoColor=white" alt="Expo"/>
  <img src="https://img.shields.io/badge/Supabase-3ECF8E.svg?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase"/>
  <img src="https://img.shields.io/badge/AWS_S3-569A31.svg?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS S3"/>
</div>

---

## 👥 팀원 소개

| 이름      | 역할  | 담당 업무                                      |
| ------- | --- | ------------------------------------------ |
| **김진홍** | 팀장  | 프로젝트 설계 & 레이아웃 & 다크모드 구현, 파일 업로드 & 분석결과 구현, Supabase & AWS 연동    |
| **김민정** | 팀원 | 로그인, 회원가입 리팩토링, 크레딧 내역 연동, SafeViewArea 적용 |
| **정미진** | 팀원 | 조건부 페이지네이션 개선, 코드검증 및 기기별 조사 및 테스트         |
| **정석현** | 팀원 | 인증 기능, 커스텀 Alert 컴포넌트, 결제 모듈 구현 및 UI 개선    |

---
## 분석 흐름도
<p align="center">
  <img width="100%" alt="스크린샷 2025-07-01 오후 2 07 18" src="https://github.com/user-attachments/assets/4c769d24-364f-4efc-b58a-4b94ed17b512" />
</p>

## 🔥 주요 기능

### 1️⃣ 랜딩페이지 & 회원가입 / 로그인

* 앱 실행 시 로고와 함께 시작하는 랜딩 화면
* 비로그인 시 분석 기능을 미리보기로 확인 가능
* 회원가입 및 이메일 인증 기능 포함
* 인증 미완료 시 로그인 차단 안내 제공

<p align="center">
  <img src="https://github.com/user-attachments/assets/cc975114-1067-4589-85d1-da99cae357b4" width="90%" alt="1번 기능 이미지">
  <img src="https://github.com/user-attachments/assets/3452f296-8fde-4a0a-819d-f69edbf03e73" width="90%" alt="2번 기능 이미지">
</p>

---

### 2️⃣ 분석 요청 플로우

* 기기 내 저장된 영상(mp4/mov/avi)을 선택해 업로드
* 영상 업로드 후 크레딧 차감과 함께 분석 요청 가능
* 분석 중 로딩 화면 제공
  
<p align="center">
  <img src="https://github.com/user-attachments/assets/5218e6d5-74bc-473a-b10f-9c8551c9c8bc" width="90%" alt="3번 기능 이미지">
</p>

---

### 3️⃣ 분석 결과 확인 및 히스토리 관리

* 분석된 영상은 '나의 분석 영상' 탭에 자동 저장
* 날짜별로 영상 리스트와 분석 상태 확인 가능
* 분석 중/완료 여부를 시각적으로 구분

<p align="center">
  <img src="https://github.com/user-attachments/assets/3dd7d316-886e-4eb0-8e35-5f84bca45595" width="90%" alt="4번 기능 이미지">
</p>

---

### 4️⃣ 분석 상세 확인 (2D/3D/관절 그래프)

* 골프 스윙의 프레임별 2D 자세 확인
* 부위별 관절 각도 그래프 제공 (팔, 다리 등)
* 3D 자세 재생 및 복수 영상 동시 비교 기능 포함

<p align="center">
  <img src="https://github.com/user-attachments/assets/da924fa1-1372-4093-8248-77de651d56ae" width="90%" alt="5번 기능 이미지">
</p>

---

### 5️⃣ 마이페이지 및 환경 설정

* 회원 정보 확인 및 닉네임 수정 기능
* 크레딧 사용 내역 확인
* 라이트/다크모드 전환 가능 (Zustand 상태 관리 적용)

<p align="center">
  <img src="https://github.com/user-attachments/assets/81ffca6a-b56f-4802-b9df-afca01efacc6" width="90%" alt="6번 기능 이미지">
</p>

---

### 6️⃣ 크레딧 구매 및 결제 시스템

* Basic / Premium 플랜 선택 후 결제 가능
* NICEPAY 연동을 통한 다양한 카드 결제 옵션 제공

<p align="center">
  <img src="https://github.com/user-attachments/assets/f56e497d-6b7c-43e0-bdb1-1c2d92b0a9b4" width="90%" alt="7번 기능 이미지">
</p>

---

## 🎥 프로젝트 시연 영상

> 썸네일 클릭 시 유튜브로 이동합니다

<table align="center">
  <tr>
    <td align="center" width="50%">
      <a href="https://youtu.be/Y-5wY31P98Q" target="_blank" rel="noopener noreferrer">
        <img src="https://img.youtube.com/vi/Y-5wY31P98Q/0.jpg" alt="시연 영상 1" width="100%">
      </a>
      <br><strong>&lt;시연용&gt;</strong>
    </td>
    <td align="center" width="50%">
      <a href="https://youtu.be/PlHLI7rFYYs" target="_blank" rel="noopener noreferrer">
        <img src="https://img.youtube.com/vi/PlHLI7rFYYs/0.jpg" alt="시연 영상 2" width="100%">
      </a>
      <br><strong>&lt;발표용&gt;</strong>
    </td>
  </tr>
</table>
