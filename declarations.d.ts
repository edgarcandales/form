declare module '*.svg' {
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<
    SvgProps & {p?: number; position?: string; top?: number; right?: number}
  >;
  export default content;
}
