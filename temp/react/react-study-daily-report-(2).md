---
title: React 학습일지 (2) - Basic
date: 2019-08-20 18:08:52
category: React
---

![react-study-daily-report](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/react/react-study-daily-report.png)

본 게시글은 React를 공부하며 배우고 익히고 느낀 것을 기록한 일지📖입니다.

## JSX

JSX는 [이전 포스트](<https://gracieuxyh.dev/react/react-study-daily-report-(1)/>)에서 간략하게 소개했다. 이번 포스트에서는 JSX의 규칙과 활용 방법에 대해 알아보도록 한다.

#### 1. 태그는 꼭 닫아주어야한다.

HTML 태그는 닫는 태그가 있는 것과 없는 것들이 있다. 전자는 문제가 없지만 후자의 경우엔 꼭 셀프 클로징(Self Closing)을 해줘야한다.

```JSX
<div></div>
<span></span>
<br> {/* 아래처럼 셀프 클로징이 필요하다 */}
<br />
```

![self-closing-example](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/react/jsx1.png)

위와 같이 코드를 작성한다면 아래와 같은 에러 문구를 볼 수 있다.

![tag-closing-err](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/react/err1.png)

단일 태그에는 슬래쉬를 달아서 닫아줘야지 에러가 발생하지 않는다.

#### 2. 두 개 이상의 태그는 꼭 하나의 태그로 감싸야한다.

![tag-wrap-example1](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/react/jsx2.png)

위와 같은 코드는 에러를 발생시킨다. 두 개 이상의 태그는 꼭 하나의 컨테이너 태그로 감싸줘야한다.

![wrap-err](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/react/err2.png)

![tag-wrap-example2](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/react/jsx3.png)

![tag-fragment-example](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/react/jsx4.png)

스타일링이나 레이아웃 때문에 아무 효과도 없는 컨테이너 태그를 사용하고 싶다면 <></>를 쓰면 된다.
이를 프레그먼트(Fragment)라고 한다.

#### 3. 클래스와 인라인 스타일

클래스는 class가 아니라 **className**으로 해야지 문제가 없다.

![class-warn](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/react/warn1.png)

class를 써도 작동은 하지만 경고문이 뜨며 className을 쓰도록 유도한다.

HTML에서 인라인 스타일은 문자열 형태로 삽입이 되었지만 JSX에서는 객체 형태로 삽입이 된다.

![class-and-inline-style-1](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/react/jsx5.png)

물론 객체를 따로 만들어서 아래와 같이 이용해도 된다.

![class-and-inline-style-2](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/react/jsx6.png)

#### 4. 자바스크립트 값과 주석 사용

![javascript-usage-and-comment](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/react/jsx7.png)

자바스크립트의 값을 바인딩하기 위해서 중괄호를 이용한다. 중괄호 사이에 해당 값을 넣어주면 손쉽게 데이터바인딩이 가능하다.

주석은 {/\* \*/} 형태로 쓰이며 태그 내부에서도 쓸 수 있기 때문에 HTML에 비해 편리한 점이 있다.

## props

props는 **prop**ertie**s**의 줄임말로 상위(부모) 컴포넌트에서 하위(자식) 컴포넌트로 전달되는 데이터이다.

![props-1](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/react/props1.png)

자식 컴포넌트를 렌더링하고 거기에 HTML 태그의 property를 설정하는 것처럼 전달할 수 있다.

![props-2](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/react/props2.png)

자식 컴포넌트에서는 전달된 props를 props라는 매개변수로 받아서 사용할 수 있다.

![props-3](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/react/props3.png)

비구조화 할당을 통해서 props라는 매개변수를 생략하고 짧게 쓸 수도 있다.

아래와 같은 결과로 props가 잘 전달되었음을 확인할 수 있다.

![props-4](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/react/props4.png)

그리고 하위 컴포넌트에서 props를 전달받지 못할 경우에 **default props** 값을 설정할 수도 있다.

![props-5](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/react/props5.png)

만약 color props를 전달하지 않았다면 위에서 본 파란색 대신 빨간색의 'Hello gracieuxyh'가 렌더링될 것이다.

## 조건부 렌더링

조건부 렌더링은 말 그대로 조건의 참/거짓 여부에 따라 렌더링 여부를 결정하는 것이다.

![condi-1](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/react/condi1.png)

상위 컴포넌트에서 isMale이란 값을 true로 설정하여 props로 넘겨주었다.

![condi-2](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/react/condi2.png)

삼항 연산자를 사용한다면 값에 따라 서로 다른 것을 보여줄 수 있고 && 연산자를 이용한다면 값의 여부에 따라 해당 태그나 텍스트를 숨길 수 있다.

위 코드의 결과는 아래와 같다.

![condi-3](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/react/condi3.png)

## 배열 렌더링

배열의 경우 map 메소드를 이용하여 간단하게 렌더링할 수 있다.

![array-1](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/react/array1.png)

위 코드의 결과는 아래와 같다. 다만 이렇게 렌더링할 경우 문제가 발생한다.

![array-2](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/react/array2.png)

![key-err](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/react/err3.png)

~~이게뭐야~~ 리스트 내부의 각각의 child는 유니크한 k**ey property**가 필요하다고 한다.

그렇다, 배열의 렌더링이란 배열의 요소들을 렌더링한다는 것인데 여기서 각 요소를 식별할 수 있는 **key**가 필요하다는 뜻이다. 이 key는 요소들마다 고유하게 존재하여 렌더링 성능을 최적화하는데 이용된다. 해당 배열은 배열의 요소를 id를 통해서 구분할 수 있으므로 key 값에 id를 넣어주면 된다.

![array-3](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/react/array3.png)

하지만 id가 없을 경우에는 배열의 index를 key 값으로 넣어줘야한다.

![array-4](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/react/array4.png)

근데 index를 사용할 경우엔 경고만 없어질 뿐 성능 최적화가 되지 않는다. 그러므로 key에 index를 넣는 것을 권장하지 않는다.
