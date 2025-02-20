# Questrip

## 소개

외국인 관광객을 대상으로 한 로컬 여행정보 추천 애플리케이션입니다. 유저의 현재 위치를 감지하고 그 위치를 기반으로 가까운 순으로 정렬하여 관광지를 추천합니다.

## 설치 및 실행 방법

1. 저장소를 복제합니다:

   ```bash
   git clone https://github.com/team-questrip/client.git

   ```

2. 프로젝트 폴더로 이동합니다:
   ```bash
   cd client
   ```
3. 필요한 의존성을 설치합니다:
   ```bash
   npm install
   ```
4. 개발 서버를 시작합니다:
   ```bash
   npm run dev
   ```

## 빌드 방법

1. 프로젝트를 빌드 합니다:
   ```bash
   npm run build
   ```

## 트러블 슈팅

### [박소미](https://github.com/confidential-nt)

#### 자동화된 배포 파이프라인 구축

프론트엔드 개발 완료 후, 백엔드 개발자가 매번 S3에 빌드된 파일을 업로드하는 비효율적인 과정을 해결하기 위해  **GitHub Actions에서 S3에 파일을 배포하고 CloudFront 캐시를 무효화하는 자동화 태스크를 `.yml` 파일로 작성**.

##### 🚀 선택한 기술 스택 및 배경  
- **EC2 제외**: 정적 파일 배포에는 서버가 필요하지 않음.  
- **Amplify 제외**: S3 및 CloudFront를 자동 지원하지만, 추가적인 관리 기능이 필요하지 않아 직접 CI/CD 구성.  
- **최종 결정**: S3, CloudFront, GitHub Actions 조합으로 CI/CD 구축하여 **배포 자동화 및 캐시 무효화 적용**.

#### 렌더링 속도 개선
- [Profiler로 리액트 앱 성능 개선해보기](https://velog.io/@youyoy689/FE-%ED%8A%B8%EB%9F%AC%EB%B8%94%EC%8A%88%ED%8C%85-Profiler%EB%A1%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%95%B1-%EC%84%B1%EB%8A%A5-%EA%B0%9C%EC%84%A0%ED%95%B4%EB%B3%B4%EA%B8%B0)
