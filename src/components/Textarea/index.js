import classNames from 'classnames';
import React, { useState } from 'react';


export default function Textarea({ onChange, onSubmit, inlineView, cancelCallback }) {
  const [inputValue, setInputValue] = useState('')
  const areActionDisabled = inputValue.length === 0

  const handleOnChange = (e) => {
    const data = e.target.value
    setInputValue(data)

    if (typeof onChange === 'function') {
      onChange(data)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (typeof onSubmit === 'function' && !areActionDisabled) {
      onSubmit(inputValue)
      setInputValue('')
    }
  }



  return (
    <div className={classNames('editor-box card', { 'inline-view': inlineView })}>
      <form onSubmit={handleSubmit}>
        <textarea onChange={handleOnChange} value={inputValue}></textarea>
        <div className='action-buttons'>
          <input type='submit' value={inlineView ? 'Post' : 'Post Comment'} disabled={areActionDisabled} />
          {inlineView && <input type='button' value='Cancel' name='cancel' onClick={cancelCallback} />}
        </div>
      </form>
    </div>
  )
}

Textarea.defaultProps = {
  inlineView: false,
  cancelCallback: () => { }
}

