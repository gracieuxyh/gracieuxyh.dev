---
title: SOP와 CORS
date: 2020-03-27 14:03:55
category: Web
---

프론트엔드 개발을 하다보면 SOP와 CORS를 필연적으로 접하게 된다.

## SOP

Same Origin Policy의 약자로 동일 출처 정책이라고 한다.

자바스크립트 엔진 표준 스펙에 존재하는 동일 출처 정책은 한 출처(origin)에서 로드된 리소스가 다른 출처의 리소스와 상호작용하는 것을 제한하는 보안 방식이다.

이 정책에 따르면 두 리소스의 **프로토콜, 호스트 주소, 포트가 모두 같아야 동일 출처**라고 간주한다.

실제로 특정 서비스를 위해서 개발한 API나 리소스들을 다른 서비스에서 접근해서 이용한다면 문제가 될 것이다. 이런 행위를 방지하고자 동일 출처 정책이 존재한다.

예시를 들어보자. 출처를 `https://example.com/test/index.html` 이라고 가정했을 때 다른 리소스 요청의 결과이다.

| 리소스                                    | 성공/실패 | 원인               |
| ----------------------------------------- | --------- | ------------------ |
| `https://example.com/test/test.html`      | **성공**  |                    |
| `https://example.com/test2/test.html`     | **성공**  |                    |
| `http://example.com/test/test.html`       | 실패      | 프로토콜이 다름    |
| `https://practice.com/test/test.html`     | 실패      | 호스트 주소가 다름 |
| `https://example.com:3030/test/test.html` | 실패      | 포트가 다름        |

이처럼 다른 출처의 리소스에 요청을 하게 될 경우 **cross-domain** 이슈가 발생하게 된다.

웹이 커지고 REST API 등으로 인해 외부 호출 등이 잦아지면서 SOP는 불편한 정책이 되어버렸고 이를 해결하기 위해서 클라이언트 측에서는 몇 가지 메커니즘이 있으며 서버 측에서는 CORS란 메커니즘이 존재한다.

## CORS

Cross Origin Resource Sharing의 약자로 교차 출처 리소스 공유라고 한다.

웹 페이지 상의 제한된 리소스에 대해 최초로 서비스된 도메인 외의 도메인이나 포트가 다른 도메인에서의 요청을 허용하는 구조이다. 즉, SOP로 인해 발생하는 cross-domain 이슈를 해결하기 위한 방법이다.

조금 깊게 들어가자면 클라이언트와 서버가 HTTP 헤더에 담긴 정보를 통해 요청이나 응답을 어떻게 할지 결정하도록 한다. 클라이언트는 CORS를 위해 리퀘스트 헤더에 정보를 추가하고 서버는 클라이언트의 리퀘스트 헤더를 확인하여 리소스 요청을 허가할지 말지 결정한다.

### CORS 프로세스

1. 브라우저는 실제 요청을 하기 전에 OPTIONS Method를 이용해서 preflight request를 서버로 전송한다.

2. 서버는 preflight request를 받아 허용할 옵션을 설정하여 response 헤더를 통해 브라우저에 전달한다.

3. 브라우저는 서버가 보낸 response를 통해 허용되지 않은 요청이면 405 Method Not Allowed를 띄우고 실제 요청은 서버로 전송하지 않는다.

4. 허용된 요청의 경우 실제 요청을 전송한다.

### 클라이언트의 리퀘스트 헤더

- `Origin`: 요청을 보내는 페이지의 출처
- `Access-Control-Request-Methods`: 실제 요청 메소드
- `Access-Control-Request-Headers`: 실제 요청에 포함된 헤더명

### 서버의 리스폰스 헤더

- `Access-Control-Allow-Origin`: 허용할 출처
- `Access-Control-Allow-Credentials`: 클라이언트의 요청이 쿠키를 통해서 인증을 해야하는 경우 true. true를 결과로 받은 클라이언트는 실제 요청 시 서버에 정의된 규격의 인증값이 담긴 쿠키를 같이 보내야한다.
- `Access-Control-Expose-Headers`: 클라이언트 요청에 포함되어도 되는 사용자 정의 헤더
- `Access-Control-Max-Age`: 클라이언트에서 preflight 요청 결과를 캐시하는 시간(초)
- `Access-Control-Allow-Methods`: 요청을 허용하는 메소드
- `Access-Control-Allow-Headers`: 요청을 허용하는 헤더

<br />그 외에도 클라이언트 측에서 해결할 수 있는 방법이 있지만 범용적이지 않으며 **근본적인 해결방법이 아니다**.

1. 크롬 확장 플러그인

   이는 크롬 브라우저에 국한된 해결책 중 하나이다. 크롬 웹 스토어에서 cors를 검색하여 확장 플러그인을 설치하면 된다.

2. 브라우저에서 SOP 확인 취소

   SOP는 브라우저에서 확인하는 것이니 브라우저에서 SOP 확인을 하지 않겠다고 설정하여 해결할 수 있다.

3. JSONP 방식으로 요청하기

   웹 브라우저에서 리소스들은 SOP 확인 없이 로딩이 가능하다. 이런 점을 이용해 서버의 리스폰스를 json 파일로 바꿔서 로딩하는 방식이다. 리소스 파일은 GET 메소드 요청으로만 읽어올 수 있기 때문에 GET 메소드 API 요청만이 가능하다.
