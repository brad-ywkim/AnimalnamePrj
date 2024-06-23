import { useState } from "react";
import "./formFrm.css";

const Input = (props) => {
  const type = props.type;
  const data = props.data; // input 태그와 연결할 state
  const setData = props.setData; // state 값 변경 함수
  const id = props.id; // props.content 대신 props.id로 수정
  const blurEvent = props.blurEvent;
  const changeEvent = props.changeEvent;
  const keyPressEvent = props.onKeyDown; // onKeyPress 이벤트 핸들러 추가

  const { disabled = false } = props;
  const placeholder = props.placeholder;

  const changeData = (e) => {
    setData(e.target.value);
    if (changeEvent) {
      changeEvent(e);
    }
  };

  return (
    <input
      className="input-form"
      id={id}
      type={type}
      value={data || ""} // null이나 undefined일 때 공백처리
      onChange={changeData}
      onBlur={blurEvent}
      disabled={disabled}
      placeholder={placeholder}
      onKeyDown={keyPressEvent} // onKeyPress 이벤트 연결
    />
  );
};

const Input2 = (props) => {
  const {
    type,
    data,
    setData,
    id,
    blurEvent,
    changeEvent,
    keyPressEvent,
    onKeyDown, // 추가된 부분
    className,
    disabled = false,
    placeholder,
  } = props;

  const changeData = (e) => {
    const value = e.target.value;
    if (value.length < 6) {
      setData(value);
    }
    if (changeEvent) {
      changeEvent(e);
    }
  };

  return (
    <input
      type={type}
      value={data}
      onChange={changeData}
      onBlur={blurEvent}
      onKeyPress={keyPressEvent}
      onKeyDown={onKeyDown} // 추가된 부분
      className={className}
      disabled={disabled}
      placeholder={placeholder}
      id={id}
    />
  );
};

export default Input2;

const Check = (props) => {
  const { id, checked, onChange } = props;

  return (
    <input
      className="checkbox-form"
      id={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
  );
};

const Button1 = (props) => {
  const text = props.text;
  const clickEvent = props.clickEvent;
  const id = props.id;
  const disabled = props.disabled;
  return (
    <button
      className="btn st1"
      id={id}
      type="button"
      onClick={clickEvent}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

const Button2 = (props) => {
  const text = props.text;
  const clickEvent = props.clickEvent;
  const id = props.id;
  const disabled = props.disabled;
  return (
    <button
      className="btn st2 "
      id={id}
      type="button"
      onClick={clickEvent}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

const Button3 = (props) => {
  const text = props.text;
  const clickEvent = props.clickEvent;
  const id = props.id;
  const disabled = props.disabled;
  return (
    <button
      className="btn st3"
      id={id}
      type="button"
      onClick={clickEvent}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

const Button4 = (props) => {
  const text = props.text;
  const clickEvent = props.clickEvent;
  const id = props.id;

  return (
    <button className="btn st4" id={id} type="button" onClick={clickEvent}>
      {text}
    </button>
  );
};

const Button5 = (props) => {
  const text = props.text;
  const clickEvent = props.clickEvent;
  const id = props.id;
  const disabled = props.disabled;
  const style = props.style;
  return (
    <button
      className="btn st5"
      id={id}
      type="button"
      onClick={clickEvent}
      disabled={disabled}
      style={style}
    >
      {text}
    </button>
  );
};

//  ---------Selcet----------
const Select = (props) => {
  const { changeEvent, options, addId, disabled, value } = props;

  return (
    <select
      className="select_form"
      onChange={changeEvent}
      id={addId}
      disabled={disabled}
      value={value}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export {
  Input,
  Input2,
  Button1,
  Button2,
  Button3,
  Select,
  Check,
  Button4,
  Button5,
}; //defalut는 없다. 다른 컴포넌트도 만들 것이기 때문이다.
