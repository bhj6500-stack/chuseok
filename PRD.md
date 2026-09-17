# PRD (추석)
1. 만드는 것 (한 줄): 귀성길 노선을 선택하면 그 노선의 돌발상황·정체 상태를 보고 국도 우회를 추천하고, 노선 중 최저가 휴게소·맛집·특색 메뉴·CCTV까지 한 화면에서 보여주는 귀성길 안내판
2. 누가 · 언제 · 무엇을 보나: 사내님과 외부 사용자가 추석 연휴(2026-09-25~27) 이동 전이나 이동 중에 고른 노선의 상황을 본다
3. 추석에 겪는 불편: 귀성길 정체·돌발상황 때문에 국도로 갈지 판단이 안 서고, 어디서 기름을 싸게 넣을지·뭘 먹을지 노선별로 따로 찾아야 한다
4. 쓰는 API (없으면 "없음"): 전부 실시간 데이터만 쓰고, 브라우저가 API를 직접 부르지 않도록 Vercel 서버리스 함수(`api/*.js`)가 매번 새로 받아온다.
   - 실시간 돌발상황: https://data.ex.co.kr/openapi/burstInfo/realTimeSms (key=test) → `/api/burst`
   - 휴게소 유가: https://data.ex.co.kr/openapi/business/curStateStation (key=test) → `/api/price`
   - 실시간 속도: https://data.ex.co.kr/openapi/odtraffic/trafficAmountByRealtime (key=test) → `/api/speed`
   - 서울 출발 예상 소요시간: https://data.ex.co.kr/openapi/safeDriving/forecast (key=test) → `/api/eta` (지금 시점 값만 제공, 미래 시간대 예측은 안 됨. 대신 화면에서 60초마다 값을 쌓아 시간대별 기록표로 보여줌)
   - 휴게소 위치 좌표: https://data.ex.co.kr/openapi/locationinfo/locationinfoRest (key=test) → `/api/location`. 휴게소 유가 데이터와 관리번호로 연결해 실제 지도(OpenStreetMap+Leaflet) 위에 표시
   - CCTV: 로드플러스(roadplus.co.kr)로 연결하는 버튼으로 대체 (화면 안에서 바로 재생하지는 않음)
5. 화면: 맨 위 출발지·도착지 선택(휴게소 주소에서 실제로 뽑은 시·군 91곳 + 고속도로가 안 닿는 지역 몇 곳은 "국도 구간 있음"으로 표시) 또는 노선 직접 선택 / 그 아래 (1) 전국 현황·정체 구간 (2) 서울 출발 예상 소요시간 + 60초마다 쌓이는 시간대별 기록표 (3) 그 노선 돌발상황 건수 + 국도 우회 추천 문구 + 혼잡 구성 막대 (4) 그 노선 휴게소 유가 최저가 (5) "실시간 지도 · 고속도로망" 카드 하나로 통합: 실제 좌표 지도 위에 휴게소 유가를 점으로, 같은 노선을 선으로 잇고, 선택한 노선만 굵게 강조 + 지금 상태 배너 (6) CCTV는 로드플러스 링크 버튼. 60초마다 화면이 실시간 데이터로 다시 갱신된다. 더미(예시) 자료는 쓰지 않는다.
6. 공개 범위: 외부 → 실시간 공공데이터만으로 Vercel에 공개
7. 이게 되면 성공: 노선을 고르면 그 노선의 돌발상황 건수·유가 최저가·우회 추천 문구가 뜨고, 외부 주소로 열어도 확인된다
