import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    // interface에서 필요한 props 속성을 정의
    bgColor:string,
    textColor:string,
    accentColor:string,
    contentColor:string,
  }
}