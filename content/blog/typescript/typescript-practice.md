---
title: Typescript 연습하기
date: 2020-02-15 22:04:30
category: Typescript
---

MS에서 개발한 Typescript는 Javascript의 Superset인 언어이다. 확장자는 ts이며 컴파일 결과로 Javascript 코드가 나온다. 실제 서비스는 컴파일 결과물인 .js 파일을 구동한다.

Typescript의 나날이 사용률이 높아지고 있다. Typescript를 도입하여 쓰는 회사들도 작년보다 눈에 띄게 많아졌다. 확실히 웹 서비스를 제공하는 측면에서 Javascript는 동적 타입 언어이기 때문에 런타임이나 개발 과정에서 예상하기 힘든 문제가 생길 가능성을 배제할 수 없다. 사람이 만든 소프트웨어가 완벽한 것이 어디있겠느냐만 타입 선언 기능이 존재하는 Typescript는 Javascript보단 그 확률을 크게 줄일 수 있다.

Typescript를 이용한다면 보다 안정적으로 서비스를 제공할 수 있고 유지보수가 쉬워지기 때문에 웹 생태계에서는 프론트엔드, 백엔드를 넘나들며 많은 사랑을 받고있다. 이 포스트에서는 Typescript를 프론트엔드나 백엔드에서 사용하기 위해서 기본적인 쓰임새를 코드를 통해서 알아보도록 하겠다.

> Typescript의 문법에 대해서 모두 다 다루지도 않는다, 자세히 다루지도 않는다.

## 환경 설정

우선 Typescript를 설치하자. 그리고 연습을 위한 폴더를 만들고 그 안에 app.ts 파일을 만든다.

```bash
npm install -g typescript # 글로벌 설치
mkdir ts-practice # ts-practice 폴더 생성
cd ts-practice # ts-practice 폴더로 이동
npm init -y
```

> 보통 실제 서비스를 운용할 때는 글로벌 설치가 아닌 프로젝트 환경에 Typescript를 설치한다. 또한 Typescript 코드는 프로덕션 환경에서 구동되는 것이 아니기 때문에 Typescript와 관련된 패키지는 쓰일 환경을 고려하여 의존성에 추가하도록 하자.

폴더를 만들었다면 Typescript 설정 파일을 만들어보자.

```bash
tsc --init
```

그러면 `tsconfig.json`란 이름의 파일이 만들어졌다. 확인해보면 아래처럼 많은 옵션들이 주석처리가 되어있을 것이다.

![tsconfig.json](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/typescript/tsconfig.png)

이 많은 양의 옵션에 쫄 필요없다. 우리는 필요한 것만 몇 가지 활성화해주면 된다.

```json
{
  "compilerOptions": {
    "target": "es6", // 컴파일된 코드가 구동될 환경.
    "module": "commonjs", // 모듈 시스템 선택.
    "strict": true, // strict 모드 지원 여부.
    "esModuleInterop": true, // commonjs 모듈 형태의 코드를 es6 모듈 형태로 불러올 수 있게 해준다.
    "outDir": "./dist" // 컴파일 결과물이 저장될 디렉토리 경로.
  }
}
```

## Typescript 코드 작성 및 컴파일

이제 Typescript 코드를 작성해보도록 하자. app.ts파일을 만들고 아래처럼 작성한다.

```typescript
// app.ts
const str: string = '이것은 문자열입니다.';
const num: number = 'zz';
```

우리는 str과 num 변수를 선언했고 각각에 `: string`, `: number`를 붙여 타입을 명시했다. num 변수 밑에는 아래처럼 빨간 줄이 뜰 것이다.

![ts-example-1](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/typescript/ts-example-1.png)

생각하는 그대로 num 변수는 숫자 타입이기 때문에 문자열을 할당할 수 없어서 에러가 발생한다.

> Typescript의 타입은 Javascript와 거의 같은 형태를 제공한다. Javascript의 기본 데이터 타입으로는 Number, String, Boolean, Null, Undefined, Symbol이 있고 Typescript는 이를 number, string, boolean, null, undefined로 지원한다. ~~Symbol은 잘 모르겠다.~~ 이 밖에도 Typescript는 편리를 위해 몇 가지 타입을 더 제공한다.

이제 이 코드를 컴파일 해보자!

```bash
tsc
```

커맨드라인에 tsc를 입력하면 dist 폴더가 생기고 그 안에 app.js 파일이 있는 것을 확인할 수 있다.

```javascript
// app.js
'use strict';
const str = '이것은 문자열입니다.';
const num = 'zz';
```

우리가 만들었던 타입 코드는 사라졌다. 실제 서비스는 Typescript 코드로 작성하고 그것을 컴파일한 결과물(Javascript 코드)을 구동할 것이다. 결과물에서는 타입이 존재하지 않지만 Typescript 코드를 작성하는 과정에서 타입 체크를 진행하므로 에러가 생기는 것을 방지할 수 있다.

## 타입 더 알아보기

Typescript로 작성한 코드를 컴파일하면 어떻게 결과물이 나오는지 확인했다. 이번엔 좀 더 다양한 타입에 대해서 직접 확인해보자.

```typescript
// app.ts
const str: string = 'Hello World';
const isBoolean: boolean = false;

let numbers: number[] = [1, 2, 3, 4, 5]; // 배열은 원소의 타입 뒤에 []를 붙인다.
numbers.push('안녕, 난 문자열이야'); // 숫자 배열에 문자열을 넣으려고 했으므로 에러가 발생한다.

let strOrNum: string | number = 10; // 문자열 또는 숫자 타입을 갖는다.
strOrNum = '문자열도 되지롱';
strOrNum = true; // 정의되지 않은 타입이므로 에러가 발생한다.

let dinner: '돈가스' | '김치볶음밥' | '냉면' = '냉면';
dinner = '스테이크'; // 팔자에도 없는 스테이크를 먹으려고 하면 안된다.

// 함수의 매개변수와 반환값에 대해서도 타입을 설정할 수 있다.
function sum(a: number, b: number): number {
  return a + b; // 숫자를 리턴하지 않으면 에러가 발생한다.
}

function noReturn(): void {
  console.log('아무 것도 반환하지 않을 때는 void 타입을 쓴다');
}

sum(10, 5);
sum(10, '5'); // 숫자 매개변수에 문자열을 전달했으니까 에러가 발생한다.
noReturn();
```

이렇게 기본 자료형의 타입에 대해 알아봤다. 하지만 우리는 객체의 타입에 대해서는 언급하지 않았다. 객체는 한 값이 아닌 여러가지 프토퍼티를 가질 수 있는 컨테이너이므로 어떤 프로퍼티을 가졌냐에 따라서 타입이 다르다고 할 수 있다.

```typescript
function getName(person: { name: string; age: number }): string {
  return person.name;
}
const person = { name: '이순신', age: 30 };
getName(person);
```

위처럼 객체가 가진 프로퍼티가 많을수록 저 타입의 길이는 길어질 것이다. 그렇다면 다른 방법이 없을까?

## 인터페이스(Interface)

### 객체의 타입

C++이나 Java 등을 접하여 객체 지향 프로그래밍 언어를 공부한 적 있는 사람이라면 인터페이스를 쉽게 이해할 수 있을 것이다. 인터페이스는 객체나 클래스의 타입을 위해서 타입의 이름을 지정하는 것이다. 위의 코드를 인터페이스를 통해서 리팩토링해보자.

```typescript
interface Person {
  name: string;
  age: number;
}

function getName(person: Person): string {
  return person.name;
}

const person = { name: '이순신', age: 30 };
getName(person);
```

`Person` 인터페이스는 person 객체의 타입 이름이다. getName 함수에 전달되는 객체는 Person 인터페이스를 충족하기만 하면 된다. 문자열로 된 name과 숫자로 된 age가 존재한다면 다른 프로퍼티를 더 가져도 상관없다.

그러나 객체의 프로퍼티가 항상 필요하진 않고 모든 객체가 똑같은 프로퍼티를 다 갖고 있다는 보장도 없다. 그러므로 선택적인 프로퍼티를 설정해줄 수 있다.

```typescript
interface Person {
  name: string;
  age: number;
  gender?: string; // 프로퍼티 뒤에 ?를 붙여서 선택적 프로퍼티임을 나타낸다.
}

function getName(person: Person): string {
  return person.name;
}

const person = { name: '이순신', age: 30 }; // 전달되는 객체엔 gender 프로퍼티가 없다.
getName(person);
```

인터페이스의 gender 프로퍼티는 선택적이라서 해당 인터페이스를 따르는 객체가 꼭 gender 프로퍼티를 가지지 않아도 된다. 그러나 아래와 같은 경우는 문제가 생긴다.

```typescript
interface Person {
  name: string;
  age: number;
}

function getName(person: Person): string {
  return person.name;
}

const person = { name: '이순신', age: 30, gender: 'M' };
getName(person);
getName({ name: '임꺽정', age: 40, gender: 'M' }); // 에러 발생
```

위에서 전달되는 객체는 인터페이스만 충족한다면 다른 프로퍼티를 갖고 있어도 괜찮다고 했다. 그렇기 때문에 person 객체는 gender라는 프로퍼티를 더 갖고 있지만 Person 인터페이스의 조건을 충족하므로 문제 되지 않는다.

그치만 객체 리터럴은 다른 변수에 할당하거나 파라미터로 전달될 때 특별한 처리를 받아서 프로퍼티 접근 체킹을 한다. 그래서 해당 객체 리터럴에 인터페이스에 없는 프로퍼티가 존재한다면 에러가 발생한다.

### 함수의 타입

함수의 타입(매개변수, 반환값) 또한 인터페이스로 나타낼 수 있다.

```typescript
interface Compare {
  (a: number, b: number): boolean;
}

let isSame: Compare;
isSame = function(a: number, b: number): boolean {
  return a === b;
};
```

### 클래스의 타입

그리고 C++, C#, Java 등에서 흔하게 볼 수 있는 클래스를 구현할 때에도 클래스의 타입으로 적용할 수 있다.

```typescript
interface Car {
  speed: number;
  name: string;
  color: string;

  getColor(): string;
}

class MyCar implements Car {
  speed: number;
  name: string;
  color: string;

  constructor(speed: number, name: string, color: string) {
    this.speed = speed;
    this.name = name;
    this.color = color;
  }

  getColor() {
    return this.color;
  }
}
```

### 인터페이스 확장

인터페이스끼리는 `extends` 키워드를 통해서 상속도 가능하다.

```typescript
interface Person {
  name: string;
  age?: number;
}

// 이렇게 인터페이스를 구현할 필요가 없다.
// interface FootballPlayer  {
//   name: string;
//   age?: number;
//   position: string;
// }

interface FootballPlayer extends Person {
  position: string;
}

const person: Person = {
  name: '이율곡',
  age: 30,
};

const footBallPlayer: FootballPlayer = {
  name: '손흥민',
  position: 'FW',
};
```

## 타입 앨리어스(Type Alias)

`type` 키워드는 타입에 별칭을 붙이는 용도로 쓸 수 있다. 인터페이스처럼 객체의 타입을 지정할 수도 있고 다른 타입의 별칭을 설정할 수도 있다.

```typescript
type Person = {
  name: sring;
  age?: number;
};

type FootballPlayer = Person & {
  position: string;
};

const person: Person = {
  name: '이율곡',
  age: 30,
};

type Players = FootballPlayer[];
const players: Players = [
  { name: '손흥민', position: 'FW' },
  { name: '조현우', age: 30, position: 'GK' },
  { name: '김영권', position: 'DF' },
];
```

`interface` 키워드를 쓰던 `type` 키워드를 쓰던 일관성있게 사용하도록 하자. 다만 라이브러리를 작성하거나 타입 지원을 위한 파일을 작성할 때는 `interface` 키워드를 쓰는 것이 권장된다.

## 제네릭(Generics)

제네릭은 하나가 아닌 다양한 타입에서 작동할 수 있도록 호환성을 맞추기 위한 문법이다.

```typescript
function getFirstElement(array: number[]): number {
  return array[0];
}

const result = getFirstElement([1, 2, 3, 4, 5]);
```

이런 식으로 코드를 작성한다고 하자. result 변수에 마우스 커서를 올리면 타입추론이 가능하다. 이런식으로 말이다.

![ts-example-2](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/typescript/ts-example-2.png)

그러나 우리는 숫자만을 다루지 않고 다른 타입도 다루고 싶다. 그래서 코드를 아래와 같이 작성한다면 result에 어떤 값이 들어갈지 알 수 없다.

```typescript
function getFirstElement(array: any[]): any {
  return array[0];
}

const result = getFirstElement([1, 2, 3, 4, 5]);
```

![ts-example-3](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/typescript/ts-example-3.png)

`any` 타입을 사용한다면 모든 타입의 데이터를 수용할 수 있지만 함수가 리턴할 때 타입이 무엇인지 정보를 잃어버린다. 그렇기 때문에 파라미터로 숫자 배열이 들어왔고 그 요소(숫자)를 리턴한다고 해도 any 타입이 리턴된다는 말이다. 이렇게 되면 타입추론이 모두 깨져버리게 된다.

그래서 any를 사용하지 않고 타입을 붙잡아서 리턴되는 값을 나타낼 수 있어야 한다. 여기서 제네릭을 사용한다.

```typescript
function getFirstElement<T>(array: T[]): T {
  return array[0];
}

const result = getFirstElement<number>([1, 2, 3, 4, 5]);
```

제네릭은 `<T>`처럼 꺽쇠 안에 타입의 이름을 넣어서 사용한다. 이렇게 한다면 어떤 타입이든 전달할 수 있으면서 타입을 붙잡아서 반환할 때 정보를 잃지 않아서 타입추론이 가능하다.

![ts-example-4](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/typescript/ts-example-4.png)

### 인터페이스에서의 제네릭

물론 인터페이스에서도 제네릭을 사용할 수 있다.

```typescript
interface Names<T> {
  list: T[];
}

const BrandNames: Names<string> = {
  list: ['Nike', 'Adidas', 'Fila', 'Supreme'];
}
```

인터페이스에 전달한 타입에 따라서 list의 타입 또한 달라지게 된다.

### Type Alias에서의 제네릭

```typescript
type Names<T> = {
  list: T[];
}

const BrandNames: Names<string> = {
  list: ['Nike', 'Adidas', 'Fila', 'Supreme'];
}
```

Type Alias는 인터페이스와 크게 다르지 않다.

### 클래스에서의 제네릭

```typescript
class Stack<T> {
  list: T[] = [];

  push(item: T) {
    this.list.push(item);
  }

  pop() {
    return this.list.pop();
  }
}

const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.push(3);
stack.pop();
```

간단하게 Typescript의 기본적인 쓰임새에 대해서 알아봤다. Typescript라는 언어를 깊게 파고든 것이 아니라 프론트엔드, 백엔드 개발을 주로 쓰이는 요소들만을 발가락 담구는 식으로 다뤘다. Typescript를 깊게 학습하고자 한다면 [Typescript Handbook](https://typescript-kr.github.io/)을 참조하길 바란다.
