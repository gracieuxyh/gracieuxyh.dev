---
title: 프로세스 스케줄링
date: 2019-06-22 13:06:46
category: Operating System
---

## 일괄 처리 시스템

일괄 처리 시스템은 등록된 프로그램이 순차적으로 실행되는 시스템이다. 먼저 등록된 프로그램이 먼저 종료가 되므로(First In First Out) Queue와 같은 방식으로 동작한다.

![batch](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/os/batch.png)

Application1은 실행 시간이 1시간, Application2는 실행 시간이 5시간 걸린다.

Case 1에서는 Application2가 먼저 등록되고 Application1이 등록되므로 Application1의 실행이 완료되기 위해서는 총 6시간이 필요하다. 반면 Case 2는 Application1이 먼저 등록되어서 Application1의 실행이 완료되기 까지 1시간이 걸린다.

여기서 일괄 처리 시스템의 단점이 극명하게 드러난다. Case 1처럼 실행 시간이 긴 프로그램이 먼저 등록되면 다른 프로그램들은 실행하기 위해 많은 시간을 기다려야한다. 또한 노래를 들으면서 문서 작업을 한다거나 웹 브라우저를 켜놓고 이미지를 편집하는 등의 멀티 태스킹이 불가능하다. 비슷한 맥락으로 여러 사용자가 동시에 컴퓨터를 사용하는 것도 불가능하다.

![res-time](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/os/res-time.png)

또한 Application1이 키보드 입력을 받아서 어떤 동작을 한다고 가정하면 위와 같은 상황에서 키보드 입력을 받은 후 실제 동작까지 길고 긴 응답 시간을 가질 수 밖에 없다. 이는 여러 사용자가 이용하기에 아주 부적합한 환경이다.

일괄 처리 시스템은 프로그램의 실행 시간과 등록 순서가 관건이지만 어떤 프로그램의 실행 시간이 짧은지 알 수도 없거니와 등록 순서 또한 조작할 수 없다.

## 시분할 시스템

![time-sharing](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/os/time-sharing.png)

시분할 시스템은 `다중 사용자 지원`을 위해 하나의 컴퓨터에서 CPU 처리 시간을 사용자 단위로 분할해서 여러 사용자가 동시에 이용할 수 있도록 한 시스템이다.

## 멀티 태스킹

![multi-tasking](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/os/multi-tasking.png)

멀티 태스킹은 단일 CPU에서 여러 응용 프로그램을 `동시에 실행(병렬 처리)`할 수 있는 시스템이다. 엄밀히 말하자면 정말로 동시에 실행되는 것이 아니라 동시에 실행되는 **것처럼** 보이는 것이다.

시분할 시스템처럼 시간을 아주 잘게 쪼개서 여러 개의 응용 프로그램을 전환하며 실행하기 때문에 사용자 입장에서는 동시에 실행되는 것처럼 인지할 수 밖에 없다.

## 멀티 프로세싱

![multi-processing](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/os/multi-processing.png)

멀티 프로세싱은 다중 CPU 환경에서 여러 응용 프로그램을 병렬 처리하는 시스템이다. 현대의 컴퓨터들은 대부분 멀티 코어 이상을 지원하므로 멀티 프로세싱을 한다.

## 멀티 프로그래밍

응용 프로그램은 온전히 CPU를 사용하기보다 다른 작업을 중간에 필요로 하는 경우가 많다. 저장 매체를 이용해 파일을 읽고 쓸 때도 있고 프린팅을 할 때도 있고... 결국 이렇게 CPU가 아무런 동작을 하지 않고 쉬게 되는 시간이 생긴다.

![file-open](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/os/file-open.png)

위의 예제 코드에서 `fp = fopen("test.txt", "wt");`가 저장 매체에 접근해서 파일을 여는 코드이다. 이 코드를 실행하고 다음 코드로 넘어가기까지 CPU는 유휴 상태에 있다.

![multi-programming](https://s3.ap-northeast-2.amazonaws.com/static.gracieuxyh.dev/os/multi-programming.png)

결국 CPU를 100% 활용하지 못하는 결과이고 공학자들은 이를 두고볼 수 없었다. 그래서 CPU 유휴 시간을 활용하여 다른 응용 프로그램을 처리하도록 했다. 이것이 멀티 프로그래밍이다. 이 기술은 혁신적으로 CPU의 활용성을 높여서 응용 프로그램의 실행 속도를 개선했다.

시분할 시스템, 멀티 태스킹, 멀티 프로그래밍은 모두 CPU가 유휴 상태에 빠지는 것을 막고 최대한으로 활용하여 병렬 처리와 다중 사용자 지원을 돕는 것에 그 목적이 있다.
