
***************** npm install 필수 *****************
--------------------------------------------------------------------------------------------------------------
PPT 링크: https://www.tooldi.com/preview/MzI3NDE0NTE2OTg=
--------------------------------------------------------------------------------------------------------------

# 🚗 Parking Place (실시간 주차 관리 시스템)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

> "주차의 스트레스를 줄이고, 관리의 효율을 극대화하다."
> 사용자에게는 실시간 빈자리 정보를, 관리자에게는 직관적인 모니터링 환경을 제공하는 **웹 기반 주차장 관리 프론트엔드 애플리케이션**임.

<br/>

## 🎯 1. 프로젝트 기획 배경
기존 주차장의 비효율적인 빈자리 확인 프로세스를 개선하기 위해 기획됨. 
일반 사용자와 관리자의 뷰(View)를 분리하여, 각자의 역할에 맞는 실시간 주차 현황(Real-time Parking Status)을 시각적으로 제공하고 관리 효율성을 높임.

<br/>

## 🛠 2. 기술 선택과 선택 이유 (Tech Stack)

### Frontend
- **React.js**
  - **선택 이유:** 실시간으로 변하는 주차장 자리 상태(State)를 효율적으로 렌더링하고, 사용자/관리자 모드에 따른 UI 컴포넌트를 재사용하기 위해 채택함.
- **React Router Dom**
  - **선택 이유:** SPA(Single Page Application) 환경에서 사용자 페이지와 관리자 페이지의 라우팅을 명확히 분리하고, 페이지 이동 간 새로고침 없이 빠른 화면 전환을 제공하기 위해 사용함.
- **CSS / Styled-components**
  - **선택 이유:** 직관적인 주차 구역 UI(빈자리, 사용 중 등)를 색상과 애니메이션으로 명확하게 구분하여 시각화하기 위해 활용함.

### Collaboration & Version Control
- **Git & GitHub**
  - **선택 이유:** 팀원 간의 원활한 코드 병합과 역할(User / Manager)에 따른 브랜치(Branch) 분리 전략을 통해 충돌을 최소화하는 협업 환경을 구축함.

<br/>

## 🏗 3. 컴포넌트 아키텍처 및 라우팅 (Architecture)
프론트엔드 중심의 설계로, 권한에 따라 접근할 수 있는 페이지(Route)를 명확히 분리함.

```text
[ Client Browser ]
        |
        |-- (사용자 접속) --> [ User Page ] 
        |                       - 실시간 주차 현황 시각화 맵
        |                       - 잔여 주차 가능 대수 실시간 확인
        |
        |-- (관리자 접속) --> [ Manager Page ]
                                - 전체 주차 구역 실시간 모니터링
                                - 특정 구역 상태 강제 제어 및 관리
```

<br/>

## ✨ 4. 핵심 기능 설명 (Core Features)

### 4-1. 화면 구성 및 주요 기능
| 사용자 뷰 (User View) | 관리자 뷰 (Manager View) |
| :---: | :---: |
| ![user_view] <img width="2475" height="1614" alt="image" src="https://github.com/user-attachments/assets/623845cc-2f41-47ef-afc5-82c69704b299" />
 | ![manager_view] <img width="2498" height="1371" alt="image" src="https://github.com/user-attachments/assets/b37a4abf-a9f7-4977-818c-25949b68a876" />
 |

- **역할 기반 라우팅(Role-based Routing):** 사용자(User)와 관리자(Manager)의 접근 권한을 분리하여 맞춤형 인터페이스를 제공함.
- **실시간 주차 현황 맵(Real-time Status Map):** 주차장 도면을 웹 UI로 구현하여, 사용 중인 자리와 빈자리를 직관적인 색상(ex. Red/Green)으로 렌더링함.
- **관리자 모니터링 시스템:** 전체 주차 구역의 상태를 한눈에 파악하고 제어할 수 있는 관리자 전용 툴킷 제공.

<br/>

## 🚀 5. 트러블 슈팅 (Trouble Shooting)

### 🔥 Issue 1. [협업] 사용자/관리자 기능 병행 개발 시 Git 브랜치 충돌 문제
- **문제:** User 페이지와 Manager 페이지를 팀원들이 동시에 개발하는 과정에서, 공통 컴포넌트나 라우팅 설정 파일(`App.js`)에서 잦은 Merge 충돌(Conflict)이 발생함.
- **원인:** 초기에 명확한 브랜치 전략 없이 메인 브랜치에서 산발적으로 작업이 이루어졌기 때문.
- **해결:** `feature/user`, `feature/manager` 등 기능 및 역할별로 브랜치를 명확히 분리(Branch Strategy)하는 규칙을 수립함. 또한, 공통 레이아웃 컴포넌트를 우선적으로 병합한 뒤 각자 맡은 라우트를 개발하도록 작업 순서를 조정함.
- **배운 점:** 팀 프로젝트에서 코드를 작성하기 전, 역할 분담과 Git 브랜치 전략을 체계적으로 세우는 것이 개발 속도와 안정성에 얼마나 중요한지 체감함.

### 🔥 Issue 2. [상태 관리] 주차 구역 상태 변경에 따른 불필요한 렌더링
- **문제:** 특정 주차 자리 하나만 상태(예: 빈자리 -> 사용 중)가 변경되어도, 전체 주차장 그리드 컴포넌트가 다시 렌더링되면서 화면 버벅임이 발생함.
- **원인:** 최상위 부모 컴포넌트에 주차장 전체 상태 배열(Array)을 두고 하위 컴포넌트들이 이를 Props로 받다 보니, 상태 변경 시 자식 컴포넌트까지 모두 리렌더링됨.
- **해결:** React의 `React.memo`를 활용하여 상태가 변하지 않은 주차 구역 컴포넌트는 리렌더링을 건너뛰도록 최적화함. 
- **배운 점:** 컴포넌트 분리 기준과 상태(State)를 어디에 위치시킬지에 대한 설계가 프론트엔드 성능 최적화에 직결됨을 깊이 이해함.

---
*Created by [권우현, 이혜지, 이효경, 장승연, 조라헬/HANE48, H-JEE1216, 911carpediem, seungyeon8802, rahellyberry] | 2026*
