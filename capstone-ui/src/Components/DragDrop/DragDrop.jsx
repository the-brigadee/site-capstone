import * as React from 'react'
import "./DragDrop.css"
import { useAuthNavContext } from '../../Contexts/authNav';

// drag drop file component
export default function DragDropFile() {
    // drag state
    const [dragActive, setDragActive] = React.useState(false);
    // ref
    const inputRef = React.useRef(null);

    const {setFile, file, setError, error} = useAuthNavContext()
    
    //function to process the image file into bytea 
    function readFile(file, callback){
      var reader = new FileReader();
      reader.onload = callback;
      reader.readAsDataURL(file);
  }

    // handle drag events
    const handleDrag = function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };
    
    // triggers when file is dropped
    const handleDrop = function(e) {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      setError((e) => ({...e, imageFile: null}))
      

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        // procress the file and set the useState
        if (e.dataTransfer?.files[0]?.type?.split("/")[0] !== "image") {
          setError((e) => ({...e, imageFile: "Invalid image file"}))
          setFile((f) => ({...f, file: null}))
          setFile((f) => ({...f, fileByteA: null}))
          return
        }

        if (e.dataTransfer?.files[0]?.size > 10485760) {
          setError((e) => ({...e, imageFile: "File too large! Less than 10MB files only!"}))
          setFile((f) => ({...f, file: null}))
          setFile((f) => ({...f, fileByteA: null}))
          return
        }
        setFile((f) => ({...f, file: e.dataTransfer.files[0]}))

        readFile(e.dataTransfer.files[0], function(evt) {
          setFile((f) => ({...f, fileByteA: evt.target.result}))
        })
    }
    };
    
    // triggers when file is selected with click
    const handleChange = function(e) {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        // process the file and set the useState
        setFile((f) => ({...f, file: e.target.files[0]}))
        readFile(e.target.files[0], function(evt) {
          setFile((f) => ({...f, fileByteA: evt.target.result}))
        })
      }
    };
    
  // triggers the input when the button is clicked
    const onButtonClick = () => {
      inputRef.current.click();
    };
    
    return (
      <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
        <input ref={inputRef} type="file" accept='image/*' id="input-file-upload" multiple={false} onChange={handleChange} />
        <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
          <div className='text-wrapper'>
            <p>Drag and drop your image file here or</p>
            {error?.imageFile ? <span className='error'>{error.imageFile}</span> : null}
            {file?.file?.name ? <span className='fileName'>{file?.file.name.length > 25 ? (file?.file.name.substring(0,13) + "..." +file?.file.name.substring(file?.file.name.length - 7)) : file?.file.name}</span> : null}
            <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
          </div> 
        </label>
        { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
      </form>
    );
  };