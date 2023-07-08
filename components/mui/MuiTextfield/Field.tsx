import React, {PureComponent} from 'react';
import {
  View,
  ViewProps,
  TextInput,
  TextStyle,
  Animated,
  StyleProp,
  StyleSheet,
  Platform,
  I18nManager,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputChangeEventData,
  TextInputContentSizeChangeEventData,
} from 'react-native';
import Line, {LineType, LineProps} from './Line';
import Label, {LabelOffset, LabelProps} from './Label';
import Affix, {AffixProps} from './Affix';
import Helper, {HelperProps} from './Helper';
import Counter from './Counter';
import MaskInput from 'react-native-mask-input';

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  input: {
    top: 2,
    padding: 0,
    paddingTop: 0 /* XXX: iOS has paddingTop set for multiline input */,
    margin: 0,
    flex: 1,

    textAlign: I18nManager.isRTL ? 'right' : 'left',

    includeFontPadding: false,
    textAlignVertical: 'top',
  },

  helperContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  stack: {
    flex: 1,
    alignSelf: 'stretch',
  },

  flex: {
    flex: 1,
  },
});

export interface TextFieldState {
  value?: any;
  error?: any;
  focusAnimation?: Animated.Value;
  labelAnimation?: Animated.Value;

  receivedFocus?: boolean;

  height?: number;
}

export interface ContentInset {
  top?: number | undefined;
  label?: number | undefined;
  input?: number | undefined;
  left?: number | undefined;
  right?: number | undefined;
  bottom?: number | undefined;
}

export interface TextFieldProps extends TextInputProps {
  animationDuration: number;

  fontSize: number;
  labelFontSize: number;

  contentInset?: ContentInset;

  labelOffset?: LabelOffset;

  labelTextStyle?: TextStyle | undefined;
  titleTextStyle?: TextStyle | undefined;
  affixTextStyle?: TextStyle | undefined;

  tintColor: string;
  textColor: string;
  baseColor: string;
  spellCheck: boolean;
  label?: string;
  required?: boolean;
  title?: string;
  characterRestriction?: number;

  error?: string;
  errorColor?: string;

  lineWidth: number;
  activeLineWidth: number;
  disabledLineWidth: number;

  lineType: LineType;
  disabledLineType: LineType;

  disabled: boolean;

  formatText?: (text: string) => string;
  mask?: string[];
  unmasked?: string;

  renderLeftAccessory?(): JSX.Element | undefined;
  renderRightAccessory?(): JSX.Element | undefined;

  prefix?: string;
  suffix?: string;
  containerStyle?: StyleProp<TextStyle> | undefined;
  inputContainerStyle?: StyleProp<TextStyle> | undefined;
}

function startAnimation(
  animation: Animated.AnimatedValue | Animated.AnimatedValueXY,
  options: Animated.TimingAnimationConfig,
  callback?: Animated.EndCallback | undefined,
) {
  Animated.timing(animation, options).start(callback);
}

const TextFieldPropsNames = new Set<string>([
  'animationDuration',
  'fontSize',
  'labelFontSize',
  'contentInset',
  'labelOffset',
  'labelTextStyle',
  'titleTextStyle',
  'affixTextStyle',
  'tintColor',
  'textColor',
  'baseColor',
  'label',
  'title',
  'characterRestriction',
  'error',
  'errorColor',
  'lineWidth',
  'activeLineWidth',
  'disabledLineWidth',
  'lineType',
  'disabledLineType',
  'disabled',
  'formatText',
  'renderLeftAccessory',
  'renderRightAccessory',
  'prefix',
  'suffix',
  'containerStyle',
  'inputContainerStyle',
  'unmasked',
]);

function labelStateFromProps(props: TextInputProps, state: TextFieldState) {
  let {placeholder, defaultValue} = props;
  let {value, receivedFocus} = state;

  return !!(placeholder || value || (!receivedFocus && defaultValue));
}

function errorStateFromProps(props: TextFieldProps, _state?: TextFieldState) {
  let {error} = props;

  return !!error;
}

export default class TextField extends PureComponent {
  inputRef: React.RefObject<TextInput>;
  mounted: boolean;
  focused: boolean;
  static defaultProps: TextFieldProps = {
    underlineColorAndroid: 'transparent',
    disableFullscreenUI: true,
    autoCapitalize: 'sentences',
    editable: true,
    animationDuration: 225,

    fontSize: 16,
    labelFontSize: 12,
    tintColor: 'rgb(0, 145, 234)',
    textColor: 'rgba(0, 0, 0, .87)',
    baseColor: 'rgba(0, 0, 0, .38)',

    errorColor: 'rgb(213, 0, 0)',

    lineWidth: StyleSheet.hairlineWidth,
    activeLineWidth: 2,
    disabledLineWidth: 1,

    lineType: 'solid',
    disabledLineType: 'dotted',
    spellCheck: true,
    disabled: false,
    //autoCorrect: true,
  };

  static inputContainerStyle = styles.inputContainer;

  static contentInset: ContentInset = {
    top: 16,
    label: 4,
    input: 8,
    left: 0,
    right: 0,
    bottom: 8,
  };

  static labelOffset: LabelOffset = {
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0,
  };

  static getDerivedStateFromProps(
    {error, value}: TextFieldProps,
    state: TextFieldState,
  ) {
    let newState: TextFieldState = {};
    /* Keep last received error in state */
    if (error && error !== state.error) {
      newState.error = error;
    }

    if (value !== undefined && value !== state.value) {
      newState.value = value;
    }

    return newState;
  }

  contentInset = (): ContentInset => {
    return {
      ...TextField.contentInset,
      ...(this.props as TextFieldProps).contentInset,
    };
  };

  labelOffset = (): LabelOffset => {
    return {
      ...TextField.labelOffset,
      ...(this.props as TextFieldProps).labelOffset,
    };
  };

  constructor(props: TextFieldProps) {
    super(props);
    // this.inputRef = this.props.inputRef ?? React.createRef();
    this.inputRef = React.createRef<TextInput>();
    this.mounted = false;
    this.focused = false;

    let {value, error, fontSize} = this.props as TextFieldProps;

    let labelState = labelStateFromProps(this.props, {value}) ? 1 : 0;
    let focusState = errorStateFromProps(this.props as TextFieldProps) ? -1 : 0;

    this.state = {
      value,
      error,
      focusAnimation: new Animated.Value(focusState),
      labelAnimation: new Animated.Value(labelState),

      receivedFocus: false,

      height: fontSize * 1.5,
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidUpdate(prevProps: TextFieldProps, prevState: TextFieldState) {
    let errorState = errorStateFromProps(this.props as TextFieldProps);
    let prevErrorState = errorStateFromProps(prevProps);

    if (errorState !== prevErrorState) {
      this.startFocusAnimation();
    }

    let labelState = labelStateFromProps(this.props, this.state);
    let prevLabelState = labelStateFromProps(prevProps, prevState);

    if (labelState !== prevLabelState) {
      this.startLabelAnimation();
    }
  }

  startFocusAnimation() {
    let {focusAnimation} = this.state as TextFieldState;
    let {animationDuration: duration} = this.props as TextFieldProps;

    let options = {
      toValue: this.focusState(),
      duration,
      useNativeDriver: false,
    };

    if (focusAnimation) {
      startAnimation(focusAnimation, options, this.onFocusAnimationEnd);
    }
  }

  startLabelAnimation() {
    let {labelAnimation} = this.state as TextFieldState;
    let {animationDuration: duration} = this.props as TextFieldProps;

    let options = {
      toValue: this.labelState(),
      useNativeDriver: true,
      duration,
    };

    if (labelAnimation) {
      startAnimation(labelAnimation, options, undefined);
    }
  }

  setNativeProps(props: TextFieldProps) {
    let {current: input} = this.inputRef;

    input?.setNativeProps(props);
  }

  focusState() {
    if (errorStateFromProps(this.props as TextFieldProps)) {
      return -1;
    }

    return this.focused ? 1 : 0;
  }

  labelState() {
    if (labelStateFromProps(this.props, this.state)) {
      return 1;
    }

    return this.focused ? 1 : 0;
  }

  focus = () => {
    let {disabled, editable} = this.props as TextFieldProps;
    let {current: input} = this.inputRef;

    if (input && !disabled && editable) {
      input.focus();
    }
  };

  blur = () => {
    let {current: input} = this.inputRef;

    input?.blur();
  };

  clear = () => {
    let {current: input} = this.inputRef;

    input?.clear();

    /* onChangeText is not triggered by .clear() */
    this.onChangeText('', '');
  };

  value() {
    const {defaultValue} = this.props as TextFieldProps;

    const value = this.isDefaultVisible()
      ? defaultValue
      : (this.state as TextFieldState).value;

    if (value == null) {
      return '';
    }

    return typeof value === 'string' ? value : String(value);
  }

  setValue(value: string) {
    this.setState({value});
  }

  isFocused() {
    let {current: input} = this.inputRef;

    return input?.isFocused();
  }

  isRestricted(): boolean {
    let {characterRestriction: limit} = this.props as TextFieldProps;
    let {length: count} = this.value();

    return limit ? limit < count : false;
  }

  isErrored() {
    return errorStateFromProps(this.props as TextFieldProps);
  }

  isDefaultVisible() {
    let {value, receivedFocus} = this.state as TextFieldState;
    let {defaultValue} = this.props as TextFieldProps;

    return !receivedFocus && value == null && defaultValue != null;
  }

  isPlaceholderVisible() {
    let {placeholder} = this.props as TextFieldProps;

    return placeholder && !this.focused && !this.value();
  }

  isLabelActive() {
    return this.labelState() === 1;
  }

  onFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    let {onFocus, clearTextOnFocus} = this.props as TextFieldProps;
    let {receivedFocus} = this.state as TextFieldState;

    if (typeof onFocus === 'function') {
      onFocus(event);
    }

    if (clearTextOnFocus) {
      this.clear();
    }

    this.focused = true;

    this.startFocusAnimation();
    this.startLabelAnimation();

    if (!receivedFocus) {
      this.setState({receivedFocus: true, value: this.value()});
    }
  };
  onSubmitEditing = () => {
    let {onSubmitEditing} = this.props as TextFieldProps;
    if (typeof onSubmitEditing === 'function') {
      onSubmitEditing(undefined as any);
    }
  };

  onBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    let {onBlur} = this.props as TextFieldProps;

    if (typeof onBlur === 'function') {
      onBlur(event);
    }

    this.focused = false;

    this.startFocusAnimation();
    this.startLabelAnimation();
  };

  onChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    let {onChange} = this.props as TextFieldProps;

    if (typeof onChange === 'function') {
      onChange(event);
    }
  };

  onChangeText = (text: string, unmasked: string) => {
    let {onChangeText, formatText} = this.props as TextFieldProps;

    if (formatText && typeof formatText === 'function') {
      text = formatText(text);
    }

    this.setState({value: text});

    if (typeof onChangeText === 'function') {
      onChangeText(text);
    }
  };

  onContentSizeChange = (
    event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>,
  ) => {
    let {onContentSizeChange, fontSize} = this.props as TextFieldProps;
    let {height} = event.nativeEvent.contentSize;

    if (typeof onContentSizeChange === 'function') {
      onContentSizeChange(event);
    }

    let platformHeight = Platform.select<number>({ios: 4, android: 1});
    let ph = platformHeight === undefined ? 1 : platformHeight;
    this.setState({
      height: Math.max(fontSize * 1.5, Math.ceil(height) + ph),
    });
  };

  onFocusAnimationEnd = () => {
    let {error} = this.props as TextFieldProps;
    let {error: retainedError} = this.state as TextFieldState;

    if (this.mounted && !error && retainedError) {
      this.setState({error: null});
    }
  };

  inputHeight(): number {
    let {height: computedHeight} = this.state as TextFieldState;
    let {
      multiline,
      fontSize,
      // height = computedHeight,
    } = this.props as TextFieldProps;

    if (computedHeight) {
      return multiline ? computedHeight : fontSize * 1.5;
    } else {
      return fontSize * 1.5;
    }
  }

  inputContainerHeight() {
    let {labelFontSize, multiline} = this.props as TextFieldProps;
    let contentInset = this.contentInset();

    if (Platform.OS === 'web' && multiline) {
      return 'auto';
    }

    return (
      (contentInset.top ? contentInset.top : 0) +
      labelFontSize +
      (contentInset.label ? contentInset.label : 0) +
      this.inputHeight() +
      (contentInset.input ? contentInset.input : 0)
    );
  }

  inputProps(): any {
    let store: any = {};

    for (let key in this.props) {
      if (key === 'defaultValue') {
        continue;
      }

      if (!TextFieldPropsNames.has(key)) {
        store[key] = (this.props as any)[key];
      }
    }

    return store;
  }

  inputStyle(): StyleProp<TextStyle> {
    let {fontSize, baseColor, textColor, disabled, multiline} = this
      .props as TextFieldProps;

    let color = disabled || this.isDefaultVisible() ? baseColor : textColor;

    let style: StyleProp<TextStyle> = {
      fontSize,
      color,

      height: this.inputHeight(),
    };

    if (multiline) {
      let lineHeight = fontSize * 1.5;
      let offset = Platform.OS === 'ios' ? 2 : 0;

      if (lineHeight && typeof style.height === 'number') {
        style.height += lineHeight;
      }
      style.transform = [
        {
          translateY: lineHeight + offset,
        },
      ];
    }

    return style;
  }

  renderLabel(props: LabelProps) {
    let offset = this.labelOffset();

    let {label, fontSize, labelFontSize, labelTextStyle, required} = this
      .props as TextFieldProps;

    return (
      <Label
        {...props}
        fontSize={fontSize}
        activeFontSize={labelFontSize}
        offset={offset}
        label={label}
        style={labelTextStyle}
        required={required}
      />
    );
  }

  renderLine(props: LineProps) {
    return <Line {...props} />;
  }

  renderAccessory(prop: string) {
    let {[prop]: renderAccessory} = this.props as any;

    return typeof renderAccessory === 'function' ? renderAccessory() : null;
  }

  renderAffix(type: 'prefix' | 'suffix') {
    let {labelAnimation} = this.state as TextFieldState;
    let {
      [type]: affix,
      fontSize,
      baseColor: color,
      affixTextStyle: style,
    } = this.props as any;

    if (affix == null) {
      return null;
    }

    let props: AffixProps = {
      type,
      style,
      color,
      fontSize,
      labelAnimation,
    };

    return <Affix {...props}>{affix}</Affix>;
  }

  renderHelper() {
    let {focusAnimation, error} = this.state as TextFieldState;

    let {
      title,
      disabled,
      baseColor,
      errorColor,
      titleTextStyle: style,
      characterRestriction: limit,
    } = this.props as TextFieldProps;

    let {length: count} = this.value();
    let contentInset = this.contentInset();

    let containerStyle = {
      paddingLeft: contentInset.left,
      paddingRight: contentInset.right,
      minHeight: contentInset.bottom,
    };

    let styleProps = {
      style,
      baseColor,
      errorColor,
    };

    let counterProps: any = {
      ...styleProps,
      limit,
      count,
    };

    let helperProps: HelperProps = {
      ...styleProps,
      title,
      error,
      disabled,
      focusAnimation,
    };

    return (
      <View style={[styles.helperContainer, containerStyle]}>
        <Helper {...helperProps} />
        <Counter {...counterProps} />
      </View>
    );
  }
  renderInput() {
    let {
      disabled,
      editable,
      tintColor,
      style: inputStyleOverrides,
    } = this.props as TextFieldProps;

    let props = this.inputProps();
    let inputStyle = this.inputStyle();
    return (
      <MaskInput
        selectionColor={tintColor}
        {...props}
        style={[styles.input, inputStyle, inputStyleOverrides]}
        editable={!disabled && editable}
        onChange={this.onChange}
        onChangeText={this.onChangeText}
        onContentSizeChange={this.onContentSizeChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        value={this.value()}
        ref={this.inputRef}
        onSubmitEditing={this.onSubmitEditing}
        keyboardType={(this.props as any).keyboardType}
        textContentType={(this.props as any)?.textContentType ?? 'none'}
        maxLength={(this.props as any)?.maxLength}
      />
    );
  }

  render() {
    let {labelAnimation, focusAnimation} = this.state as TextFieldState;
    let {
      editable,
      disabled,
      lineType,
      disabledLineType,
      lineWidth,
      activeLineWidth,
      disabledLineWidth,
      tintColor,
      baseColor,
      errorColor,
      containerStyle,
      inputContainerStyle: inputContainerStyleOverrides,
    } = this.props as TextFieldProps;

    let restricted = this.isRestricted();
    let contentInset = this.contentInset();

    let inputContainerStyle = {
      paddingTop: contentInset.top,
      paddingRight: contentInset.right,
      paddingBottom: contentInset.input,
      paddingLeft: contentInset.left,
      height: this.inputContainerHeight(),
    };

    let containerProps: ViewProps = {
      style: containerStyle,
      onStartShouldSetResponder: () => true,
      onResponderRelease: this.focus,
      pointerEvents: !disabled ? 'auto' : 'none',
    };

    let inputContainerProps = {
      style: [
        TextField.inputContainerStyle,
        inputContainerStyle,
        inputContainerStyleOverrides,
      ],
    };

    let styleProps = {
      disabled,
      restricted,
      baseColor,
      tintColor,
      errorColor,

      contentInset,

      focusAnimation,
      labelAnimation,
    };

    let lineProps: LineProps = {
      ...styleProps,

      lineWidth,
      activeLineWidth,
      disabledLineWidth,

      lineType,
      disabledLineType,
    };

    return (
      <View {...containerProps}>
        <Animated.View {...inputContainerProps}>
          {this.renderLine(lineProps)}
          {this.renderAccessory('renderLeftAccessory')}
          <View style={styles.stack} pointerEvents={editable ? 'auto' : 'none'}>
            {this.renderLabel(styleProps as LabelProps)}
            <View style={styles.row}>
              {this.renderAffix('prefix')}
              {this.renderInput()}
              {this.renderAffix('suffix')}
            </View>
          </View>
          {this.renderAccessory('renderRightAccessory')}
        </Animated.View>
        {this.renderHelper()}
      </View>
    );
  }
}
