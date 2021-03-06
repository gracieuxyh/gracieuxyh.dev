---
title: 쿠키와 세션 그리고 스토리지
date: 2019-12-22 18:27:13
category: Web
---

HTTP는 비상태기반(stateless) 프로토콜이다.

자, 이게 뭔 소리냐면 클라이언트와 서버가 상호 간에 했던 리퀘스트, 리스폰스의 상태를 관리를 안한다는 뜻이다. 과거에 했던 통신을 기억하지 못하므로 과거의 통신을 기반으로 현재의 리퀘스트를 처리를 할 수 없다는 것을 말한다.

이런 방식의 장점으로는 상태를 유지할 필요가 없으니까 **서버 컴퓨터의 CPU나 메모리 같은 리소스의 소비를 억제**할 수 있다. 근데 상태를 기억해야할 필요가 있을 때가 있다면 어떡할까? 분명 새로운 페이지로 이동할 때 마다 매번 로그인을 해야한다는 것은 말도 안되는 일이다.

이러한 특징을 살리면서 위와 같은 문제를 해결하기 위해 **쿠키**란 것이 도입되었다.

## 쿠키

쿠키는 리퀘스트와 리스폰스에 쿠키 정보를 추가하여 클라이언트의 상태를 파악하기 위한 도입되었으며 클라이언트의 로컬(브라우저)에 저장되는 key-value 형태의 작은 텍스트 데이터 파일이다. 보통 이름(key), 값(value), 만료 날짜, 경로 정보 등을 포함한다.

### 쿠키 프로세스

![cookie-process-1](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/web/cookie-process-1.png)

브라우저가 특정 웹 페이지에 접속하거나 리소스를 요청한다. 그러면 서버는 요청받은 웹 페이지나 리소스와 함께 쿠키도 발행하여 함께 전송한다.

클라이언트는 전송받은 쿠키를 로컬에 저장한다.

![cookie-process-2](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/web/cookie-process-2.png)

그 다음 번에 클라이언트가 같은 웹 페이지(서버)에 접속하거나 리소스를 요청할 때 갖고있던 쿠키를 함께 보낸다. 서버는 클라이언트가 보낸 쿠키를 확인하여 어느 클라이언트에서 접속했는지 서버 상의 기록을 확인하여 이전 상태를 알 수 있다.

쿠키는 자동 로그인, 오늘 또는 일정 기간 동안 더 이상 창을 보지 않음, 쇼핑몰의 장바구니 등에 이용된다.

### 쿠키의 단점

완벽한 기술은 없듯 쿠키도 단점이 존재한다.

1. 용량

   쿠키는 클라이언트에 최대 300개까지 저장할 수 있으며 한 쿠키의 용량은 최대 4kb로 제한된다. 또 하나의 도메인 당 20개의 값을 가질 수 있다.

2. 보안

   클라이언트의 로컬에도 저장되고 HTTP 요청에도 함께 포함되어 전송된다. 전송될 때 별다른 암호화를 거치지 않으므로 로컬이나 요청이 도청 당하면 개인정보가 유출되는 등의 문제가 발생할 수 있다.

3. 리소스

   작은 용량이지만 매 HTTP 요청에 포함되어 전송되므로 필요하지 않을 경우엔 리소스의 낭비라고 볼 수 있다.

## 세션

세션은 통신을 위해 클라이언트와 서버가 **연결된 순간부터 통신이 종료될 때까지의 시간**을 의미한다.

클라이언트가 서버에 접속하면 서버는 세션 객체를 생성하여 클라이언트마다 고유한 ID를 부여한다. 이 세션 ID는 세션 쿠키라고도 불리며 쿠키를 통해 오고가지만 쿠키와는 달리 정보를 서버에 저장하므로 보안적인 면에서는 쿠키보다 뛰어나며 용량의 제한 또한 존재하지 않는다. 세션이 종료될 때 세션 ID값 또한 파기된다.

쿠키는 정보가 클라이언트에 존재하고 이를 통해 요청을 하므로 속도가 빠르나 세션은 정보가 서버에 존재하므로 서버 리소스가 이용되기 때문에 비교적 느린 속도를 낸다. 세션이 보안적으로 뛰어나고 용량 제한도 없으나 무분별한 세션 사용은 서버 리소스를 필요 이상으로 소비할 수 있으므로 용도에 맞게 잘 사용하여야한다.

세션은 쿠키를 이용하는 한 방식 중 하나일 뿐 쿠키와 세션은 반대 관계에 있지 않다. 어떤 서비스를 어떻게 운영할 것이냐를 고려하여 목적에 맞게 이용하면 된다. 주로 로그인 인증 정보 유지에 쓰인다.

> 클라이언트는 다수이고 서버는 소수, 클라이언트는 믿을 수 없고 중요한 정보나 처리는 서버에서 다뤄야한다는 것을 인지해두자.

## 스토리지

스토리지는 HTML5에서 추가된 스펙으로 쿠키와 마찬가지로 key-value 형태로 데이터를 저장하는 저장소이다. 쿠키의 문제점을 보완하기 위해 등장한 기술이므로 쿠키의 단점 대부분을 보완했다.

스토리지는 브라우저마다 상이하지만 표준 스펙에 의하면 5mb 정도가 권장되어 용량도 꽤 큰 편이고 HTTP 요청에 포함되지 않아서 서버의 리소스 낭비를 고려할 필요도 없다. 표준을 지켜서 설계한다면 보안을 강화할 수도 있다.

스토리지는 로컬 스토리지와 세션 스토리지로 나눌 수 있는데 이 둘의 차이는 **영구성**이다.

로컬 스토리지는 특별히 지우지 않는 한 브라우저에 계속 남아있지만 세션 스토리지는 브라우저가 종료되면 알아서 제거된다. 스토리지는 HTML5에 추가된 기술인만큼 브라우저, 디바이스 등 환경을 많이 타서 제대로 작동하지 않을 수도 있다.
