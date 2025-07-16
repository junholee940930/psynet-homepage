# PSYNET 홈페이지 배포 가이드

## 📁 프로젝트 구조
```
psynet-homepage/
├── index.html              (메인 홈페이지)
├── api/
│   └── submit-notion.js     (노션 API 서버리스 함수)
├── package.json            (프로젝트 설정)
├── vercel.json             (Vercel 배포 설정)
└── README.md               (이 파일)
```

## 🚀 배포 단계

### 1. 프로젝트 준비
```bash
# 새 폴더 생성
mkdir psynet-homepage
cd psynet-homepage

# 파일들 생성 (위의 코드들을 각각 저장)
# - index.html
# - api/submit-notion.js
# - package.json
# - vercel.json
```

### 2. Git 저장소 설정
```bash
git init
git add .
git commit -m "Initial commit"

# GitHub 저장소 연결
git remote add origin https://github.com/your-username/psynet-homepage.git
git push -u origin main
```

### 3. Vercel 배포
```bash
# Vercel CLI 설치
npm install -g vercel

# 프로젝트 배포
vercel

# 질문에 답변:
# - Link to existing project? N
# - Project name: psynet-homepage
# - Directory: ./
# - Want to override settings? N
```

### 4. 환경변수 설정

Vercel 대시보드 (vercel.com/dashboard)에서:

1. 프로젝트 선택
2. Settings 탭
3. Environment Variables 섹션
4. 다음 변수들 추가:

```
NOTION_TOKEN=secret_xxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxx
```

### 5. 재배포
```bash
# 환경변수 추가 후 재배포
vercel --prod
```

## 🔑 노션 설정

### 노션 통합(Integration) 생성
1. https://www.notion.so/my-integrations 접속
2. "New integration" 클릭
3. 이름: "PSYNET Homepage"
4. 토큰 복사 → `NOTION_TOKEN`에 사용

### 데이터베이스 권한 부여
1. 노션 데이터베이스 페이지에서 "Share" 클릭
2. "Invite" → 생성한 Integration 선택
3. 데이터베이스 ID 복사 → `NOTION_DATABASE_ID`에 사용

## 📋 데이터베이스 컬럼 설정

노션 데이터베이스에 다음 컬럼들을 생성하세요:

| 컬럼명 | 타입 | 옵션 |
|--------|------|------|
| 이름 | Title | 필수 |
| 이메일 | Email | 필수 |
| 전화번호 | Text | 필수 |
| 관심분야 | Text | 선택 |
| 아이디어 | Text | 선택 |
| 리그 | Select | 라이브스코어, 하이데어 |
| 신청일 | Date | 자동 |
| 상태 | Select | 신규, 검토중, 채택, 반려 |

## 🧪 테스트

배포 완료 후:
1. 홈페이지 접속
2. 리그 참여 버튼 클릭
3. 신청폼 작성 후 제출
4. 노션 데이터베이스에서 데이터 확인

## 🔧 문제 해결

### 노션 API 오류
- `unauthorized`: 토큰이나 권한 확인
- `object_not_found`: 데이터베이스 ID 확인
- `validation_error`: 컬럼명이나 타입 확인

### Vercel 배포 오류
```bash
# 로그 확인
vercel logs

# 로컬 테스트
vercel dev
```

## 📞 지원

문제가 발생하면 Vercel 대시보드의 Functions 탭에서 로그를 확인하세요.
