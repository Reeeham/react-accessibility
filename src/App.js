import logo from './logo.svg';
import './App.css';
import React, { Fragment } from 'react';


const AriaExample = () => { 

  //adding aria-label aria-required to true or false
  return(<input
    type="text"
    aria-label="inputLabel"
    aria-required="true"
    name="name"
  />);
}

function ListItem({ item }) {
  
  //using Fragment to remove useless div tags
  // Fragments should also have a `key` prop when mapping collections
  return (
    <Fragment key={item.term}>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </Fragment>
  );
}

function ShortSyntaxExample({ item }) {
  //using <>  short sytntax instead of fragments
  return (
    <>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </>
  );
}

function AccessibleFormExample() { 
  //using htmlFor in label to input id it will be transferred to for in plain html
  return(
    <form>
    <label htmlFor="namedInput">Name:</label>
    <input id="namedInput" type="text" name="name"/>
    </form>
  )
}

function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef}  onFocus={ props.focus } />
    </div>
  );
}

class FocusExample  extends React.Component {
  //using focus 
  constructor(props) {
    super(props);
    // Create a ref to store the textInput DOM element
    this.textInput = React.createRef();
  }
  focus() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
  }
  render() {
  // Use the `ref` callback to store a reference to the text input DOM
  // element in an instance field (for example, this.textInput).
    return (
      <CustomTextInput inputRef={this.inputElement} focus={this.focus()} />

    );
  }
}
class BlurExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.timeOutId = null;

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  // We close the popover on the next tick by using setTimeout.
  // This is necessary because we need to first check if
  // another child of the element has received focus as
  // the blur event fires prior to the new focus event.
  onBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false
      });
    });
  }

  // If a child receives focus, do not close the popover.
  onFocusHandler() {
    clearTimeout(this.timeOutId);
  }

  render() {
    // React assists us by bubbling the blur and
    // focus events to the parent.
    //This aria-* exposes the functionality to both pointer device and keyboard users.
    return (
      <div onBlur={this.onBlurHandler}
           onFocus={this.onFocusHandler}>
        <button onClick={this.onClickHandler}
                aria-haspopup="true"
                aria-expanded={this.state.isOpen}>
          Select an option
        </button>
        {this.state.isOpen && (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </div>
    );
  }
}

const FragmentSemanticHtmlExample = () => {
  return( 
    <dl>
      <ListItem item={{term: 'hello1',description :'desc1'}} />
      <ListItem item={{term: 'hello2', description : 'desc2'}} />
    </dl>
 );
  }



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BlurExample />
      </header>
    </div>
  );
}

export default App;
