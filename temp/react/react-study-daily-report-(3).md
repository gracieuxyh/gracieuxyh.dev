---
title: React 학습일지 (3) - Hooks
date: 2019-08-22 22:08:53
category: React
---

![react-study-daily-report](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/react/react-study-daily-report.png)

본 게시글은 React를 공부하며 배우고 익히고 느낀 것을 기록한 일지📖입니다.

## Hooks

React Hooks는 React v16.8에 도입된 기능이다.

이전의 리액트는 상태와 라이프 사이클을 다루기 위해서 클래스형 컴포넌트를 쓰는 것이 필연적이었다. 함수형 컴포넌트는 Props를 이용해서 상태를 처리하거나 UI 렌더링을 위해서 쓰이는 등 컴포넌트 간의 역할 구분이 명확했고 이는 상태와 관련된 로직을 재사용하기 어렵게 만들었다.

Hooks를 이용하면 함수형 컴포넌트에서도 상태를 다룰 수 있게 되어 계층 변화 없이 상태 관련 로직을 재사용할 수 있다.

### useState

useState는 함수형 컴포넌트에서도 상태를 다룰 수 있게해주는 기본적인 Hook이다.

```JSX
const [value, setValue] = useState(0) // value = 0
setValue(5) // value = 5
```

위의 예시 코드를 해석하자면

value 라는 **상태**를 0으로 초기화하고 향후에 setValue라는 setter 함수로 상태를 업데이트시킬 수 있다를 의미한다.

> 위와 같은 문법은 비구조화 할당이라고 한다.

### useEffect

useEffect는 컴포넌트가 나타날 때, 사라질 때, 업데이트될 때 등 기존의 라이프사이클에 해당하는 로직들을 구현할 수 있는 Hook이다.

첫 번째 인자에는 함수를 등록하고 두 번째 인자에는 디펜던시 배열을 등록한다. 첫 인자에 등록된 함수 내에서 접근하고 있는 데이터가 있다면 디펜던시 배열에 등록해야한다.

return에 등록된 것은 업데이트가 되기 직전에 호출된다.

```JSX
useEffect(() => {
    // mount
    // 라이브러리 마운트
    // props를 state로 설정
    // setInterval, setTimeout
    // API Call
    // DOM 접근
    return = () => {
        // unmount
        // 라이브러리 인스턴스 제거
        // interval, timeout clear
    }
}, []);
```

### useMemo

useMemo의 Memo는 Memoization(메모이제이션)의 약자이다. useMemo를 사용하면 함수형 컴포넌트 내부에서 발생하는 연산을 최적화할 수 있다.

특정 상태가 변해서 컴포넌트가 리렌더링되는데 그와 관계 없는 다른 값이 계속 호출된다면 성능적으로 좋지 않다. 이를 방지하고자 useMemo를 쓴다.

useEffect와 마찬가지로 첫 번째 인자에 함수를 등록하고 두 번째 인자는 디펜던시 배열을 등록한다. 디펜던시 배열에 등록된 상태가 변할 때만 첫 번째 인자의 함수가 호출된다.

그렇지 않으면 **이전에 연산된 값을 재사용**한다.

```JSX
useMemo(() => {

}, [])
```

> 메모이제이션은 동일한 연산을 반복해야할 때 이전의 연산값을 메모리에 저장하여 연산의 반복을 제거함으로서 속도를 높이는 기술이다.

### useCallback

useMemo가 값의 재사용이라면 useCallback은 함수의 재사용이라고 할 수 있다.

컴포넌트가 리렌더링될 때 마다 함수들 또한 다시 생성되는데 렌더링할 컴포넌트의 수가 많거나 자주 렌더링이 발생한다면 성능 이슈가 생길 수 있다.

그렇기 때문에 useCallback으로 감싸준 함수들은 컴포넌트가 다시 렌더링되어도 재생성 되지 않고 재사용할 수 있게된다.

useEffect, useMemo와 마찬가지로 첫 번째 인자엔 함수, 두 번째 인자엔 디펜던시 배열을 등록하여 의존하는 값들의 변화가 있을 때만 함수가 새로 만들어지고 그렇지 않다면 기존의 함수를 재사용한다.

### useRef

### useReducer
